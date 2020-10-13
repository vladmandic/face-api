import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { BoxPredictionParams } from './types';
export declare function boxPredictionLayer(x: tf.Tensor4D, params: BoxPredictionParams): any;
