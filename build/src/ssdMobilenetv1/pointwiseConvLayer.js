import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
export function pointwiseConvLayer(x, params, strides) {
    return tf.tidy(() => {
        let out = tf.conv2d(x, params.filters, strides, 'same');
        out = tf.add(out, params.batch_norm_offset);
        return tf.clipByValue(out, 0, 6);
    });
}
//# sourceMappingURL=pointwiseConvLayer.js.map