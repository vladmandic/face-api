import * as tf from '@tensorflow/tfjs-core';
import { toNetInput } from '../dom';
import { FaceFeatureExtractor } from '../faceFeatureExtractor/FaceFeatureExtractor';
import { FaceProcessor } from '../faceProcessor/FaceProcessor';
import { FaceExpressions } from './FaceExpressions';
export class FaceExpressionNet extends FaceProcessor {
    constructor(faceFeatureExtractor = new FaceFeatureExtractor()) {
        super('FaceExpressionNet', faceFeatureExtractor);
    }
    forwardInput(input) {
        return tf.tidy(() => tf.softmax(this.runNet(input)));
    }
    async forward(input) {
        return this.forwardInput(await toNetInput(input));
    }
    async predictExpressions(input) {
        const netInput = await toNetInput(input);
        const out = await this.forwardInput(netInput);
        const probabilitesByBatch = await Promise.all(tf.unstack(out).map(async (t) => {
            const data = await t.data();
            t.dispose();
            return data;
        }));
        out.dispose();
        const predictionsByBatch = probabilitesByBatch
            .map(probabilites => new FaceExpressions(probabilites));
        return netInput.isBatchInput
            ? predictionsByBatch
            : predictionsByBatch[0];
    }
    getDefaultModelName() {
        return 'face_expression_model';
    }
    getClassifierChannelsIn() {
        return 256;
    }
    getClassifierChannelsOut() {
        return 7;
    }
}
//# sourceMappingURL=FaceExpressionNet.js.map