"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceExpressionNet = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const FaceFeatureExtractor_1 = require("../faceFeatureExtractor/FaceFeatureExtractor");
const FaceProcessor_1 = require("../faceProcessor/FaceProcessor");
const FaceExpressions_1 = require("./FaceExpressions");
class FaceExpressionNet extends FaceProcessor_1.FaceProcessor {
    constructor(faceFeatureExtractor = new FaceFeatureExtractor_1.FaceFeatureExtractor()) {
        super('FaceExpressionNet', faceFeatureExtractor);
    }
    forwardInput(input) {
        return tf.tidy(() => tf.softmax(this.runNet(input)));
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    async predictExpressions(input) {
        const netInput = await dom_1.toNetInput(input);
        const out = await this.forwardInput(netInput);
        const probabilitesByBatch = await Promise.all(tf.unstack(out).map(async (t) => {
            const data = await t.data();
            t.dispose();
            return data;
        }));
        out.dispose();
        const predictionsByBatch = probabilitesByBatch
            .map(probabilites => new FaceExpressions_1.FaceExpressions(probabilites));
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
exports.FaceExpressionNet = FaceExpressionNet;
//# sourceMappingURL=FaceExpressionNet.js.map