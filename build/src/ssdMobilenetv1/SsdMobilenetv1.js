import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { Rect } from '../classes';
import { FaceDetection } from '../classes/FaceDetection';
import { toNetInput } from '../dom';
import { NeuralNetwork } from '../NeuralNetwork';
import { extractParams } from './extractParams';
import { extractParamsFromWeigthMap } from './extractParamsFromWeigthMap';
import { mobileNetV1 } from './mobileNetV1';
import { nonMaxSuppression } from './nonMaxSuppression';
import { outputLayer } from './outputLayer';
import { predictionLayer } from './predictionLayer';
import { SsdMobilenetv1Options } from './SsdMobilenetv1Options';
export class SsdMobilenetv1 extends NeuralNetwork {
    constructor() {
        super('SsdMobilenetv1');
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('SsdMobilenetv1 - load model before inference');
        }
        return tf.tidy(() => {
            // const batchTensor = input.toBatchTensor(512, false).toFloat()
            const batchTensor = tf.cast(input.toBatchTensor(512, false), 'float32');
            const x = tf.sub(tf.mul(batchTensor, tf.scalar(0.007843137718737125)), tf.scalar(1));
            const features = mobileNetV1(x, params.mobilenetv1);
            const { boxPredictions, classPredictions } = predictionLayer(features.out, features.conv11, params.prediction_layer);
            return outputLayer(boxPredictions, classPredictions, params.output_layer);
        });
    }
    async forward(input) {
        return this.forwardInput(await toNetInput(input));
    }
    async locateFaces(input, options = {}) {
        const { maxResults, minConfidence } = new SsdMobilenetv1Options(options);
        const netInput = await toNetInput(input);
        const { boxes: _boxes, scores: _scores } = this.forwardInput(netInput);
        // TODO batches
        const boxes = _boxes[0];
        const scores = _scores[0];
        for (let i = 1; i < _boxes.length; i++) {
            _boxes[i].dispose();
            _scores[i].dispose();
        }
        // TODO find a better way to filter by minConfidence
        const scoresData = Array.from(await scores.data());
        const iouThreshold = 0.5;
        const indices = nonMaxSuppression(boxes, scoresData, maxResults, iouThreshold, minConfidence);
        const reshapedDims = netInput.getReshapedInputDimensions(0);
        const inputSize = netInput.inputSize;
        const padX = inputSize / reshapedDims.width;
        const padY = inputSize / reshapedDims.height;
        const boxesData = boxes.arraySync();
        const results = indices
            .map(idx => {
            const [top, bottom] = [
                Math.max(0, boxesData[idx][0]),
                Math.min(1.0, boxesData[idx][2])
            ].map(val => val * padY);
            const [left, right] = [
                Math.max(0, boxesData[idx][1]),
                Math.min(1.0, boxesData[idx][3])
            ].map(val => val * padX);
            return new FaceDetection(scoresData[idx], new Rect(left, top, right - left, bottom - top), {
                height: netInput.getInputHeight(0),
                width: netInput.getInputWidth(0)
            });
        });
        boxes.dispose();
        scores.dispose();
        return results;
    }
    getDefaultModelName() {
        return 'ssd_mobilenetv1_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap(weightMap);
    }
    extractParams(weights) {
        return extractParams(weights);
    }
}
//# sourceMappingURL=SsdMobilenetv1.js.map