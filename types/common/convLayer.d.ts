import * as tf from '../../dist/tfjs.esm';
import { ConvParams } from './types';
export declare function convLayer(x: tf.Tensor4D, params: ConvParams, padding?: 'valid' | 'same', withRelu?: boolean): tf.Tensor4D;
