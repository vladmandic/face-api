import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { PointwiseConvParams } from './types';
export declare function pointwiseConvLayer(x: tf.Tensor4D, params: PointwiseConvParams, strides: [number, number]): any;
