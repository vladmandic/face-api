"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthwiseSeparableConv = void 0;
const tf = require("@tensorflow/tfjs-core");
const leaky_1 = require("./leaky");
function depthwiseSeparableConv(x, params) {
    return tf.tidy(() => {
        let out = tf.pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        out = tf.separableConv2d(out, params.depthwise_filter, params.pointwise_filter, [1, 1], 'valid');
        out = tf.add(out, params.bias);
        return leaky_1.leaky(out);
    });
}
exports.depthwiseSeparableConv = depthwiseSeparableConv;
//# sourceMappingURL=depthwiseSeparableConv.js.map