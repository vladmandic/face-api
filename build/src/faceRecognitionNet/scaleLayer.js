import * as tf from '@tensorflow/tfjs';
export function scale(x, params) {
    return tf.add(tf.mul(x, params.weights), params.biases);
}
//# sourceMappingURL=scaleLayer.js.map