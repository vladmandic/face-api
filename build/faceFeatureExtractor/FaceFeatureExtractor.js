import * as tf from '@tensorflow/tfjs-core';
import { toNetInput } from '../dom';
import { NeuralNetwork } from '../NeuralNetwork';
import { normalize } from '../ops';
import { denseBlock4 } from './denseBlock';
import { extractParams } from './extractParams';
import { extractParamsFromWeigthMap } from './extractParamsFromWeigthMap';
export class FaceFeatureExtractor extends NeuralNetwork {
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
            const normalized = normalize(batchTensor, meanRgb).div(tf.scalar(255));
            let out = denseBlock4(normalized, params.dense0, true);
            out = denseBlock4(out, params.dense1);
            out = denseBlock4(out, params.dense2);
            out = denseBlock4(out, params.dense3);
            out = tf.avgPool(out, [7, 7], [2, 2], 'valid');
            return out;
        });
    }
    async forward(input) {
        return this.forwardInput(await toNetInput(input));
    }
    getDefaultModelName() {
        return 'face_feature_extractor_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap(weightMap);
    }
    extractParams(weights) {
        return extractParams(weights);
    }
}
//# sourceMappingURL=FaceFeatureExtractor.js.map