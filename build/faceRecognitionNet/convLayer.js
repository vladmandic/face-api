"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convDown = exports.convNoRelu = exports.conv = void 0;
const tf = require("@tensorflow/tfjs-core");
const scaleLayer_1 = require("./scaleLayer");
function convLayer(x, params, strides, withRelu, padding = 'same') {
    const { filters, bias } = params.conv;
    let out = tf.conv2d(x, filters, strides, padding);
    out = tf.add(out, bias);
    out = scaleLayer_1.scale(out, params.scale);
    return withRelu ? tf.relu(out) : out;
}
function conv(x, params) {
    return convLayer(x, params, [1, 1], true);
}
exports.conv = conv;
function convNoRelu(x, params) {
    return convLayer(x, params, [1, 1], false);
}
exports.convNoRelu = convNoRelu;
function convDown(x, params) {
    return convLayer(x, params, [2, 2], true, 'valid');
}
exports.convDown = convDown;
//# sourceMappingURL=convLayer.js.map