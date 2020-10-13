import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { ConvWithBatchNorm } from './types';
export declare function convWithBatchNorm(x: tf.Tensor4D, params: ConvWithBatchNorm): tf.Tensor4D;
