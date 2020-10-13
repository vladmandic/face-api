import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { SeparableConvParams } from '../common/types';
export declare function depthwiseSeparableConv(x: tf.Tensor4D, params: SeparableConvParams): tf.Tensor4D;
