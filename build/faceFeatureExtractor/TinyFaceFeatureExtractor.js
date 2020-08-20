"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyFaceFeatureExtractor = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const ops_1 = require("../ops");
const denseBlock_1 = require("./denseBlock");
const extractParamsFromWeigthMapTiny_1 = require("./extractParamsFromWeigthMapTiny");
const extractParamsTiny_1 = require("./extractParamsTiny");
class TinyFaceFeatureExtractor extends NeuralNetwork_1.NeuralNetwork {
    constructor() {
        super('TinyFaceFeatureExtractor');
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('TinyFaceFeatureExtractor - load model before inference');
        }
        return tf.tidy(() => {
            const batchTensor = input.toBatchTensor(112, true);
            const meanRgb = [122.782, 117.001, 104.298];
            const normalized = ops_1.normalize(batchTensor, meanRgb).div(tf.scalar(255));
            let out = denseBlock_1.denseBlock3(normalized, params.dense0, true);
            out = denseBlock_1.denseBlock3(out, params.dense1);
            out = denseBlock_1.denseBlock3(out, params.dense2);
            out = tf.avgPool(out, [14, 14], [2, 2], 'valid');
            return out;
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    getDefaultModelName() {
        return 'face_feature_extractor_tiny_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMapTiny_1.extractParamsFromWeigthMapTiny(weightMap);
    }
    extractParams(weights) {
        return extractParamsTiny_1.extractParamsTiny(weights);
    }
}
exports.TinyFaceFeatureExtractor = TinyFaceFeatureExtractor;
//# sourceMappingURL=TinyFaceFeatureExtractor.js.map