"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convLayer = void 0;
const tf = require("@tensorflow/tfjs-core");
function convLayer(x, params, padding = 'same', withRelu = false) {
    return tf.tidy(() => {
        const out = tf.add(tf.conv2d(x, params.filters, [1, 1], padding), params.bias);
        return withRelu ? tf.relu(out) : out;
    });
}
exports.convLayer = convLayer;
//# sourceMappingURL=convLayer.js.map