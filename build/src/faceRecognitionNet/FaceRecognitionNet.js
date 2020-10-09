import * as tf from '@tensorflow/tfjs';
import { toNetInput } from '../dom';
import { NeuralNetwork } from '../NeuralNetwork';
import { normalize } from '../ops';
import { convDown } from './convLayer';
import { extractParams } from './extractParams';
import { extractParamsFromWeigthMap } from './extractParamsFromWeigthMap';
import { residual, residualDown } from './residualLayer';
export class FaceRecognitionNet extends NeuralNetwork {
    constructor() {
        super('FaceRecognitionNet');
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('FaceRecognitionNet - load model before inference');
        }
        return tf.tidy(() => {
            // const batchTensor = input.toBatchTensor(150, true).toFloat()
            const batchTensor = tf.cast(input.toBatchTensor(150, true), 'float32');
            const meanRgb = [122.782, 117.001, 104.298];
            const normalized = normalize(batchTensor, meanRgb).div(tf.scalar(256));
            let out = convDown(normalized, params.conv32_down);
            out = tf.maxPool(out, 3, 2, 'valid');
            out = residual(out, params.conv32_1);
            out = residual(out, params.conv32_2);
            out = residual(out, params.conv32_3);
            out = residualDown(out, params.conv64_down);
            out = residual(out, params.conv64_1);
            out = residual(out, params.conv64_2);
            out = residual(out, params.conv64_3);
            out = residualDown(out, params.conv128_down);
            out = residual(out, params.conv128_1);
            out = residual(out, params.conv128_2);
            out = residualDown(out, params.conv256_down);
            out = residual(out, params.conv256_1);
            out = residual(out, params.conv256_2);
            out = residualDown(out, params.conv256_down_out);
            const globalAvg = out.mean([1, 2]);
            const fullyConnected = tf.matMul(globalAvg, params.fc);
            return fullyConnected;
        });
    }
    async forward(input) {
        return this.forwardInput(await toNetInput(input));
    }
    async computeFaceDescriptor(input) {
        const netInput = await toNetInput(input);
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
        return extractParamsFromWeigthMap(weightMap);
    }
    extractParams(weights) {
        return extractParams(weights);
    }
}
//# sourceMappingURL=FaceRecognitionNet.js.map