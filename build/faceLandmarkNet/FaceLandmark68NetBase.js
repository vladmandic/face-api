"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceLandmark68NetBase = void 0;
const tf = require("@tensorflow/tfjs-core");
const classes_1 = require("../classes");
const FaceLandmarks68_1 = require("../classes/FaceLandmarks68");
const dom_1 = require("../dom");
const FaceProcessor_1 = require("../faceProcessor/FaceProcessor");
const utils_1 = require("../utils");
class FaceLandmark68NetBase extends FaceProcessor_1.FaceProcessor {
    postProcess(output, inputSize, originalDimensions) {
        const inputDimensions = originalDimensions.map(({ width, height }) => {
            const scale = inputSize / Math.max(height, width);
            return {
                width: width * scale,
                height: height * scale
            };
        });
        const batchSize = inputDimensions.length;
        return tf.tidy(() => {
            const createInterleavedTensor = (fillX, fillY) => tf.stack([
                tf.fill([68], fillX),
                tf.fill([68], fillY)
            ], 1).as2D(1, 136).as1D();
            const getPadding = (batchIdx, cond) => {
                const { width, height } = inputDimensions[batchIdx];
                return cond(width, height) ? Math.abs(width - height) / 2 : 0;
            };
            const getPaddingX = (batchIdx) => getPadding(batchIdx, (w, h) => w < h);
            const getPaddingY = (batchIdx) => getPadding(batchIdx, (w, h) => h < w);
            const landmarkTensors = output
                .mul(tf.fill([batchSize, 136], inputSize))
                .sub(tf.stack(Array.from(Array(batchSize), (_, batchIdx) => createInterleavedTensor(getPaddingX(batchIdx), getPaddingY(batchIdx)))))
                .div(tf.stack(Array.from(Array(batchSize), (_, batchIdx) => createInterleavedTensor(inputDimensions[batchIdx].width, inputDimensions[batchIdx].height))));
            return landmarkTensors;
        });
    }
    forwardInput(input) {
        return tf.tidy(() => {
            const out = this.runNet(input);
            return this.postProcess(out, input.inputSize, input.inputDimensions.map(([height, width]) => ({ height, width })));
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    async detectLandmarks(input) {
        const netInput = await dom_1.toNetInput(input);
        const landmarkTensors = tf.tidy(() => tf.unstack(this.forwardInput(netInput)));
        const landmarksForBatch = await Promise.all(landmarkTensors.map(async (landmarkTensor, batchIdx) => {
            const landmarksArray = Array.from(await landmarkTensor.data());
            const xCoords = landmarksArray.filter((_, i) => utils_1.isEven(i));
            const yCoords = landmarksArray.filter((_, i) => !utils_1.isEven(i));
            return new FaceLandmarks68_1.FaceLandmarks68(Array(68).fill(0).map((_, i) => new classes_1.Point(xCoords[i], yCoords[i])), {
                height: netInput.getInputHeight(batchIdx),
                width: netInput.getInputWidth(batchIdx),
            });
        }));
        landmarkTensors.forEach(t => t.dispose());
        return netInput.isBatchInput
            ? landmarksForBatch
            : landmarksForBatch[0];
    }
    getClassifierChannelsOut() {
        return 136;
    }
}
exports.FaceLandmark68NetBase = FaceLandmark68NetBase;
//# sourceMappingURL=FaceLandmark68NetBase.js.map