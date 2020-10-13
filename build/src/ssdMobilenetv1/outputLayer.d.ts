import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { OutputLayerParams } from './types';
export declare function outputLayer(boxPredictions: tf.Tensor4D, classPredictions: tf.Tensor4D, params: OutputLayerParams): any;
