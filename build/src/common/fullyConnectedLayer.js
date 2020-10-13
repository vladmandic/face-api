import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
export function fullyConnectedLayer(x, params) {
    return tf.tidy(() => tf.add(tf.matMul(x, params.weights), params.bias));
}
//# sourceMappingURL=fullyConnectedLayer.js.map