"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceProcessor = void 0;
const tf = require("@tensorflow/tfjs-core");
const fullyConnectedLayer_1 = require("../common/fullyConnectedLayer");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
const util_1 = require("./util");
class FaceProcessor extends NeuralNetwork_1.NeuralNetwork {
    constructor(_name, faceFeatureExtractor) {
        super(_name);
        this._faceFeatureExtractor = faceFeatureExtractor;
    }
    get faceFeatureExtractor() {
        return this._faceFeatureExtractor;
    }
    runNet(input) {
        const { params } = this;
        if (!params) {
            throw new Error(`${this._name} - load model before inference`);
        }
        return tf.tidy(() => {
            const bottleneckFeatures = input instanceof dom_1.NetInput
                ? this.faceFeatureExtractor.forwardInput(input)
                : input;
            return fullyConnectedLayer_1.fullyConnectedLayer(bottleneckFeatures.as2D(bottleneckFeatures.shape[0], -1), params.fc);
        });
    }
    dispose(throwOnRedispose = true) {
        this.faceFeatureExtractor.dispose(throwOnRedispose);
        super.dispose(throwOnRedispose);
    }
    loadClassifierParams(weights) {
        const { params, paramMappings } = this.extractClassifierParams(weights);
        this._params = params;
        this._paramMappings = paramMappings;
    }
    extractClassifierParams(weights) {
        return extractParams_1.extractParams(weights, this.getClassifierChannelsIn(), this.getClassifierChannelsOut());
    }
    extractParamsFromWeigthMap(weightMap) {
        const { featureExtractorMap, classifierMap } = util_1.seperateWeightMaps(weightMap);
        this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(classifierMap);
    }
    extractParams(weights) {
        const cIn = this.getClassifierChannelsIn();
        const cOut = this.getClassifierChannelsOut();
        const classifierWeightSize = (cOut * cIn) + cOut;
        const featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
        const classifierWeights = weights.slice(weights.length - classifierWeightSize);
        this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
        return this.extractClassifierParams(classifierWeights);
    }
}
exports.FaceProcessor = FaceProcessor;
//# sourceMappingURL=FaceProcessor.js.map