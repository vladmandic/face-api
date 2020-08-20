"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyYolov2Base = void 0;
const tf = require("@tensorflow/tfjs-core");
const BoundingBox_1 = require("../classes/BoundingBox");
const ObjectDetection_1 = require("../classes/ObjectDetection");
const common_1 = require("../common");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const ops_1 = require("../ops");
const nonMaxSuppression_1 = require("../ops/nonMaxSuppression");
const normalize_1 = require("../ops/normalize");
const config_1 = require("./config");
const convWithBatchNorm_1 = require("./convWithBatchNorm");
const depthwiseSeparableConv_1 = require("./depthwiseSeparableConv");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
const leaky_1 = require("./leaky");
const TinyYolov2Options_1 = require("./TinyYolov2Options");
class TinyYolov2Base extends NeuralNetwork_1.NeuralNetwork {
    constructor(config) {
        super('TinyYolov2');
        config_1.validateConfig(config);
        this._config = config;
    }
    get config() {
        return this._config;
    }
    get withClassScores() {
        return this.config.withClassScores || this.config.classes.length > 1;
    }
    get boxEncodingSize() {
        return 5 + (this.withClassScores ? this.config.classes.length : 0);
    }
    runTinyYolov2(x, params) {
        let out = convWithBatchNorm_1.convWithBatchNorm(x, params.conv0);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv1);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv2);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv3);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv4);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv5);
        out = tf.maxPool(out, [2, 2], [1, 1], 'same');
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv6);
        out = convWithBatchNorm_1.convWithBatchNorm(out, params.conv7);
        return common_1.convLayer(out, params.conv8, 'valid', false);
    }
    runMobilenet(x, params) {
        let out = this.config.isFirstLayerConv2d
            ? leaky_1.leaky(common_1.convLayer(x, params.conv0, 'valid', false))
            : depthwiseSeparableConv_1.depthwiseSeparableConv(x, params.conv0);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv1);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv2);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv3);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv4);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv5);
        out = tf.maxPool(out, [2, 2], [1, 1], 'same');
        out = params.conv6 ? depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv6) : out;
        out = params.conv7 ? depthwiseSeparableConv_1.depthwiseSeparableConv(out, params.conv7) : out;
        return common_1.convLayer(out, params.conv8, 'valid', false);
    }
    forwardInput(input, inputSize) {
        const { params } = this;
        if (!params) {
            throw new Error('TinyYolov2 - load model before inference');
        }
        return tf.tidy(() => {
            let batchTensor = input.toBatchTensor(inputSize, false).toFloat();
            batchTensor = this.config.meanRgb
                ? normalize_1.normalize(batchTensor, this.config.meanRgb)
                : batchTensor;
            batchTensor = batchTensor.div(tf.scalar(256));
            return this.config.withSeparableConvs
                ? this.runMobilenet(batchTensor, params)
                : this.runTinyYolov2(batchTensor, params);
        });
    }
    async forward(input, inputSize) {
        return await this.forwardInput(await dom_1.toNetInput(input), inputSize);
    }
    async detect(input, forwardParams = {}) {
        const { inputSize, scoreThreshold } = new TinyYolov2Options_1.TinyYolov2Options(forwardParams);
        const netInput = await dom_1.toNetInput(input);
        const out = await this.forwardInput(netInput, inputSize);
        const out0 = tf.tidy(() => tf.unstack(out)[0].expandDims());
        const inputDimensions = {
            width: netInput.getInputWidth(0),
            height: netInput.getInputHeight(0)
        };
        const results = await this.extractBoxes(out0, netInput.getReshapedInputDimensions(0), scoreThreshold);
        out.dispose();
        out0.dispose();
        const boxes = results.map(res => res.box);
        const scores = results.map(res => res.score);
        const classScores = results.map(res => res.classScore);
        const classNames = results.map(res => this.config.classes[res.label]);
        const indices = nonMaxSuppression_1.nonMaxSuppression(boxes.map(box => box.rescale(inputSize)), scores, this.config.iouThreshold, true);
        const detections = indices.map(idx => new ObjectDetection_1.ObjectDetection(scores[idx], classScores[idx], classNames[idx], boxes[idx], inputDimensions));
        return detections;
    }
    getDefaultModelName() {
        return '';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap, this.config);
    }
    extractParams(weights) {
        const filterSizes = this.config.filterSizes || TinyYolov2Base.DEFAULT_FILTER_SIZES;
        const numFilters = filterSizes ? filterSizes.length : undefined;
        if (numFilters !== 7 && numFilters !== 8 && numFilters !== 9) {
            throw new Error(`TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found ${numFilters} filterSizes in config`);
        }
        return extractParams_1.extractParams(weights, this.config, this.boxEncodingSize, filterSizes);
    }
    async extractBoxes(outputTensor, inputBlobDimensions, scoreThreshold) {
        const { width, height } = inputBlobDimensions;
        const inputSize = Math.max(width, height);
        const correctionFactorX = inputSize / width;
        const correctionFactorY = inputSize / height;
        const numCells = outputTensor.shape[1];
        const numBoxes = this.config.anchors.length;
        const [boxesTensor, scoresTensor, classScoresTensor] = tf.tidy(() => {
            const reshaped = outputTensor.reshape([numCells, numCells, numBoxes, this.boxEncodingSize]);
            const boxes = reshaped.slice([0, 0, 0, 0], [numCells, numCells, numBoxes, 4]);
            const scores = reshaped.slice([0, 0, 0, 4], [numCells, numCells, numBoxes, 1]);
            const classScores = this.withClassScores
                ? tf.softmax(reshaped.slice([0, 0, 0, 5], [numCells, numCells, numBoxes, this.config.classes.length]), 3)
                : tf.scalar(0);
            return [boxes, scores, classScores];
        });
        const results = [];
        const scoresData = await scoresTensor.array();
        const boxesData = await boxesTensor.array();
        for (let row = 0; row < numCells; row++) {
            for (let col = 0; col < numCells; col++) {
                for (let anchor = 0; anchor < numBoxes; anchor++) {
                    const score = ops_1.sigmoid(scoresData[row][col][anchor][0]);
                    if (!scoreThreshold || score > scoreThreshold) {
                        const ctX = ((col + ops_1.sigmoid(boxesData[row][col][anchor][0])) / numCells) * correctionFactorX;
                        const ctY = ((row + ops_1.sigmoid(boxesData[row][col][anchor][1])) / numCells) * correctionFactorY;
                        const width = ((Math.exp(boxesData[row][col][anchor][2]) * this.config.anchors[anchor].x) / numCells) * correctionFactorX;
                        const height = ((Math.exp(boxesData[row][col][anchor][3]) * this.config.anchors[anchor].y) / numCells) * correctionFactorY;
                        const x = (ctX - (width / 2));
                        const y = (ctY - (height / 2));
                        const pos = { row, col, anchor };
                        const { classScore, label } = this.withClassScores
                            ? await this.extractPredictedClass(classScoresTensor, pos)
                            : { classScore: 1, label: 0 };
                        results.push({
                            box: new BoundingBox_1.BoundingBox(x, y, x + width, y + height),
                            score: score,
                            classScore: score * classScore,
                            label,
                            ...pos
                        });
                    }
                }
            }
        }
        boxesTensor.dispose();
        scoresTensor.dispose();
        classScoresTensor.dispose();
        return results;
    }
    async extractPredictedClass(classesTensor, pos) {
        const { row, col, anchor } = pos;
        const classesData = await classesTensor.array();
        return Array(this.config.classes.length).fill(0)
            .map((_, i) => classesData[row][col][anchor][i])
            .map((classScore, label) => ({
            classScore,
            label
        }))
            .reduce((max, curr) => max.classScore > curr.classScore ? max : curr);
    }
}
exports.TinyYolov2Base = TinyYolov2Base;
TinyYolov2Base.DEFAULT_FILTER_SIZES = [
    3, 16, 32, 64, 128, 256, 512, 1024, 1024
];
//# sourceMappingURL=TinyYolov2Base.js.map