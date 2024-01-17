import * as tf from '../../dist/tfjs.esm';
import { BoxPredictionParams } from './types';
export declare function boxPredictionLayer(x: tf.Tensor4D, params: BoxPredictionParams): {
    boxPredictionEncoding: tf.Tensor<tf.Rank>;
    classPrediction: tf.Tensor<tf.Rank>;
};
