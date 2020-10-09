import * as tf from '@tensorflow/tfjs';
import { depthwiseSeparableConv } from '../common/depthwiseSeparableConv';
export function denseBlock3(x, denseBlockParams, isFirstLayer = false) {
    return tf.tidy(() => {
        const out1 = tf.relu(isFirstLayer
            ? tf.add(tf.conv2d(x, denseBlockParams.conv0.filters, [2, 2], 'same'), denseBlockParams.conv0.bias)
            : depthwiseSeparableConv(x, denseBlockParams.conv0, [2, 2]));
        const out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
        const in3 = tf.relu(tf.add(out1, out2));
        const out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
        return tf.relu(tf.add(out1, tf.add(out2, out3)));
    });
}
export function denseBlock4(x, denseBlockParams, isFirstLayer = false, isScaleDown = true) {
    return tf.tidy(() => {
        const out1 = tf.relu(isFirstLayer
            ? tf.add(tf.conv2d(x, denseBlockParams.conv0.filters, isScaleDown ? [2, 2] : [1, 1], 'same'), denseBlockParams.conv0.bias)
            : depthwiseSeparableConv(x, denseBlockParams.conv0, isScaleDown ? [2, 2] : [1, 1]));
        const out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
        const in3 = tf.relu(tf.add(out1, out2));
        const out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
        const in4 = tf.relu(tf.add(out1, tf.add(out2, out3)));
        const out4 = depthwiseSeparableConv(in4, denseBlockParams.conv3, [1, 1]);
        return tf.relu(tf.add(out1, tf.add(out2, tf.add(out3, out4))));
    });
}
//# sourceMappingURL=denseBlock.js.map