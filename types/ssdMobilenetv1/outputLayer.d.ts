import * as tf from '../../dist/tfjs.esm.js';
import { OutputLayerParams } from './types';
export declare function outputLayer(boxPredictions: tf.Tensor4D, classPredictions: tf.Tensor4D, params: OutputLayerParams): any;
