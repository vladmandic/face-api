"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceFeatureExtractor = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const ops_1 = require("../ops");
const denseBlock_1 = require("./denseBlock");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
class FaceFeatureExtractor extends NeuralNetwork_1.NeuralNetwork {
    constructor() {
        super('FaceFeatureExtractor');
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('FaceFeatureExtractor - load model before inference');
        }
        return tf.tidy(() => {
            const batchTensor = input.toBatchTensor(112, true);
            const meanRgb = [122.782, 117.001, 104.298];
            const normalized = ops_1.normalize(batchTensor, meanRgb).div(tf.scalar(255));
            let out = denseBlock_1.denseBlock4(normalized, params.dense0, true);
            out = denseBlock_1.denseBlock4(out, params.dense1);
            out = denseBlock_1.denseBlock4(out, params.dense2);
            out = denseBlock_1.denseBlock4(out, params.dense3);
            out = tf.avgPool(out, [7, 7], [2, 2], 'valid');
            return out;
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    getDefaultModelName() {
        return 'face_feature_extractor_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    }
    extractParams(weights) {
        return extractParams_1.extractParams(weights);
    }
}
exports.FaceFeatureExtractor = FaceFeatureExtractor;
//# sourceMappingURL=FaceFeatureExtractor.js.map