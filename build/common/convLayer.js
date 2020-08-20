import * as tf from '@tensorflow/tfjs-core';
export function convLayer(x, params, padding = 'same', withRelu = false) {
    return tf.tidy(() => {
        const out = tf.add(tf.conv2d(x, params.filters, [1, 1], padding), params.bias);
        return withRelu ? tf.relu(out) : out;
    });
}
//# sourceMappingURL=convLayer.js.map