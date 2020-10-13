import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { ConvLayerParams } from './types';
export declare function conv(x: tf.Tensor4D, params: ConvLayerParams): any;
export declare function convNoRelu(x: tf.Tensor4D, params: ConvLayerParams): any;
export declare function convDown(x: tf.Tensor4D, params: ConvLayerParams): any;
