import * as tf from '../../dist/tfjs.esm';
import { OutputLayerParams } from './types';
export declare function outputLayer(boxPredictions: tf.Tensor4D, classPredictions: tf.Tensor4D, params: OutputLayerParams): {
    boxes: tf.Tensor2D[];
    scores: tf.Tensor1D[];
};
