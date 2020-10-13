import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';

import { ScaleLayerParams } from './types';

export function scale(x: tf.Tensor4D, params: ScaleLayerParams): tf.Tensor4D {
  return tf.add(tf.mul(x, params.weights), params.biases)
}
