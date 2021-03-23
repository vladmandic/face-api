import * as tf from '../../dist/tfjs.esm';

import { PointwiseConvParams } from './types';

export function pointwiseConvLayer(x: tf.Tensor4D, params: PointwiseConvParams, strides: [number, number]) {
  return tf.tidy(() => {
    let out = tf.conv2d(x, params.filters, strides, 'same');
    /*
    if (x.shape[1] === 512 && x.shape[3] === 3) {
      console.log('Input:', x.shape, x.size, 'sum:', x.reshape([786432]).sum().dataSync()[0]); // input does not change (checked values)
      console.log('Filter:', params.filters.shape, params.filters.size, 'sum:', params.filters.reshape([864]).sum().dataSync()[0]); // params do not change (checked values)
      console.log('Strides', strides);
      console.log('Conv2d 1st 5 values:', out.shape, out.size, out.dataSync().slice(0, 5)); // output has different values!
      console.log('Conv2D sum of all values:', tf.reshape(out, [2097152]).sum().dataSync()[0]); // silly sum just to see how much results diverged
    }
    */
    out = tf.add(out, params.batch_norm_offset);
    return tf.clipByValue(out, 0, 6);
  });
}
