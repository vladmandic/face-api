import * as tf from '../../dist/tfjs.esm';
import { PredictionLayerParams } from './types';
export declare function predictionLayer(x: tf.Tensor4D, conv11: tf.Tensor4D, params: PredictionLayerParams): {
    boxPredictions: tf.Tensor4D;
    classPredictions: tf.Tensor4D;
};
