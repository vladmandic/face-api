"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceRecognitionNet = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const ops_1 = require("../ops");
const convLayer_1 = require("./convLayer");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
const residualLayer_1 = require("./residualLayer");
class FaceRecognitionNet extends NeuralNetwork_1.NeuralNetwork {
    constructor() {
        super('FaceRecognitionNet');
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('FaceRecognitionNet - load model before inference');
        }
        return tf.tidy(() => {
            const batchTensor = input.toBatchTensor(150, true).toFloat();
            const meanRgb = [122.782, 117.001, 104.298];
            const normalized = ops_1.normalize(batchTensor, meanRgb).div(tf.scalar(256));
            let out = convLayer_1.convDown(normalized, params.conv32_down);
            out = tf.maxPool(out, 3, 2, 'valid');
            out = residualLayer_1.residual(out, params.conv32_1);
            out = residualLayer_1.residual(out, params.conv32_2);
            out = residualLayer_1.residual(out, params.conv32_3);
            out = residualLayer_1.residualDown(out, params.conv64_down);
            out = residualLayer_1.residual(out, params.conv64_1);
            out = residualLayer_1.residual(out, params.conv64_2);
            out = residualLayer_1.residual(out, params.conv64_3);
            out = residualLayer_1.residualDown(out, params.conv128_down);
            out = residualLayer_1.residual(out, params.conv128_1);
            out = residualLayer_1.residual(out, params.conv128_2);
            out = residualLayer_1.residualDown(out, params.conv256_down);
            out = residualLayer_1.residual(out, params.conv256_1);
            out = residualLayer_1.residual(out, params.conv256_2);
            out = residualLayer_1.residualDown(out, params.conv256_down_out);
            const globalAvg = out.mean([1, 2]);
            const fullyConnected = tf.matMul(globalAvg, params.fc);
            return fullyConnected;
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    async computeFaceDescriptor(input) {
        const netInput = await dom_1.toNetInput(input);
        const faceDescriptorTensors = tf.tidy(() => tf.unstack(this.forwardInput(netInput)));
        const faceDescriptorsForBatch = await Promise.all(faceDescriptorTensors.map(t => t.data()));
        faceDescriptorTensors.forEach(t => t.dispose());
        return netInput.isBatchInput
            ? faceDescriptorsForBatch
            : faceDescriptorsForBatch[0];
    }
    getDefaultModelName() {
        return 'face_recognition_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    }
    extractParams(weights) {
        return extractParams_1.extractParams(weights);
    }
}
exports.FaceRecognitionNet = FaceRecognitionNet;
//# sourceMappingURL=FaceRecognitionNet.js.map