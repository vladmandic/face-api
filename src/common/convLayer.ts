import * as tf from '../../dist/tfjs.esm';

import { ConvParams } from './types';

export function convLayer(
  x: tf.Tensor4D,
  params: ConvParams,
  padding: 'valid' | 'same' = 'same',
  withRelu = false,
): tf.Tensor4D {
  return tf.tidy(() => {
    const out = tf.add(
      tf.conv2d(x, params.filters, [1, 1], padding),
      params.bias,
    ) as tf.Tensor4D;

    return withRelu ? tf.relu(out) : out;
  });
}
