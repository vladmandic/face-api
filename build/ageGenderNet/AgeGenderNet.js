"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeGenderNet = void 0;
const tf = require("@tensorflow/tfjs-core");
const fullyConnectedLayer_1 = require("../common/fullyConnectedLayer");
const util_1 = require("../faceProcessor/util");
const TinyXception_1 = require("../xception/TinyXception");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
const types_1 = require("./types");
const NeuralNetwork_1 = require("../NeuralNetwork");
const dom_1 = require("../dom");
class AgeGenderNet extends NeuralNetwork_1.NeuralNetwork {
    constructor(faceFeatureExtractor = new TinyXception_1.TinyXception(2)) {
        super('AgeGenderNet');
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
            const pooled = tf.avgPool(bottleneckFeatures, [7, 7], [2, 2], 'valid').as2D(bottleneckFeatures.shape[0], -1);
            const age = fullyConnectedLayer_1.fullyConnectedLayer(pooled, params.fc.age).as1D();
            const gender = fullyConnectedLayer_1.fullyConnectedLayer(pooled, params.fc.gender);
            return { age, gender };
        });
    }
    forwardInput(input) {
        return tf.tidy(() => {
            const { age, gender } = this.runNet(input);
            return { age, gender: tf.softmax(gender) };
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    async predictAgeAndGender(input) {
        const netInput = await dom_1.toNetInput(input);
        const out = await this.forwardInput(netInput);
        const ages = tf.unstack(out.age);
        const genders = tf.unstack(out.gender);
        const ageAndGenderTensors = ages.map((ageTensor, i) => ({
            ageTensor,
            genderTensor: genders[i]
        }));
        const predictionsByBatch = await Promise.all(ageAndGenderTensors.map(async ({ ageTensor, genderTensor }) => {
            const age = (await ageTensor.data())[0];
            const probMale = (await genderTensor.data())[0];
            const isMale = probMale > 0.5;
            const gender = isMale ? types_1.Gender.MALE : types_1.Gender.FEMALE;
            const genderProbability = isMale ? probMale : (1 - probMale);
            ageTensor.dispose();
            genderTensor.dispose();
            return { age, gender, genderProbability };
        }));
        out.age.dispose();
        out.gender.dispose();
        return netInput.isBatchInput
            ? predictionsByBatch
            : predictionsByBatch[0];
    }
    getDefaultModelName() {
        return 'age_gender_model';
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
        return extractParams_1.extractParams(weights);
    }
    extractParamsFromWeigthMap(weightMap) {
        const { featureExtractorMap, classifierMap } = util_1.seperateWeightMaps(weightMap);
        this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(classifierMap);
    }
    extractParams(weights) {
        const classifierWeightSize = (512 * 1 + 1) + (512 * 2 + 2);
        const featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
        const classifierWeights = weights.slice(weights.length - classifierWeightSize);
        this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
        return this.extractClassifierParams(classifierWeights);
    }
}
exports.AgeGenderNet = AgeGenderNet;
//# sourceMappingURL=AgeGenderNet.js.map