import * as tf from '../../dist/tfjs.esm.js';
import { ConvLayerParams } from './types';
export declare function conv(x: tf.Tensor4D, params: ConvLayerParams): any;
export declare function convNoRelu(x: tf.Tensor4D, params: ConvLayerParams): any;
export declare function convDown(x: tf.Tensor4D, params: ConvLayerParams): any;
