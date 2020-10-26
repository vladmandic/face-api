import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { Point } from '../classes';
import { FaceLandmarks68 } from '../classes/FaceLandmarks68';
import { toNetInput } from '../dom';
import { FaceProcessor } from '../faceProcessor/FaceProcessor';
import { isEven } from '../utils';
export class FaceLandmark68NetBase extends FaceProcessor {
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
            const createInterleavedTensor = (fillX, fillY) => tf.stack([tf.fill([68], fillX, 'float32'), tf.fill([68], fillY, 'float32')], 1).as2D(1, 136).as1D();
            const getPadding = (batchIdx, cond) => {
                const { width, height } = inputDimensions[batchIdx];
                return cond(width, height) ? Math.abs(width - height) / 2 : 0;
            };
            const getPaddingX = (batchIdx) => getPadding(batchIdx, (w, h) => w < h);
            const getPaddingY = (batchIdx) => getPadding(batchIdx, (w, h) => h < w);
            const landmarkTensors = output
                .mul(tf.fill([batchSize, 136], inputSize, 'float32'))
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
        return this.forwardInput(await toNetInput(input));
    }
    async detectLandmarks(input) {
        const netInput = await toNetInput(input);
        const landmarkTensors = tf.tidy(() => tf.unstack(this.forwardInput(netInput)));
        const landmarksForBatch = await Promise.all(landmarkTensors.map(async (landmarkTensor, batchIdx) => {
            const landmarksArray = Array.from(await landmarkTensor.data());
            const xCoords = landmarksArray.filter((_, i) => isEven(i));
            const yCoords = landmarksArray.filter((_, i) => !isEven(i));
            return new FaceLandmarks68(Array(68).fill(0).map((_, i) => new Point(xCoords[i], yCoords[i])), {
                height: netInput.getInputHeight(batchIdx),
                width: netInput.getInputWidth(batchIdx),
            });
        }));
        landmarkTensors.forEach(t => t.dispose());
        return netInput.isBatchInput ? landmarksForBatch : landmarksForBatch[0];
    }
    getClassifierChannelsOut() {
        return 136;
    }
}
//# sourceMappingURL=FaceLandmark68NetBase.js.map