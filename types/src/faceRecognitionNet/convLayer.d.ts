import * as tf from '../../dist/tfjs.esm';
import { ConvLayerParams } from './types';
export declare function conv(x: tf.Tensor4D, params: ConvLayerParams): tf.Tensor4D;
export declare function convNoRelu(x: tf.Tensor4D, params: ConvLayerParams): tf.Tensor4D;
export declare function convDown(x: tf.Tensor4D, params: ConvLayerParams): tf.Tensor4D;
