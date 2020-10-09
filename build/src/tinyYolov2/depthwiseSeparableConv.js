import * as tf from '@tensorflow/tfjs';
import { leaky } from './leaky';
export function depthwiseSeparableConv(x, params) {
    return tf.tidy(() => {
        let out = tf.pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        out = tf.separableConv2d(out, params.depthwise_filter, params.pointwise_filter, [1, 1], 'valid');
        out = tf.add(out, params.bias);
        return leaky(out);
    });
}
//# sourceMappingURL=depthwiseSeparableConv.js.map