"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scale = void 0;
const tf = require("@tensorflow/tfjs-core");
function scale(x, params) {
    return tf.add(tf.mul(x, params.weights), params.biases);
}
exports.scale = scale;
//# sourceMappingURL=scaleLayer.js.map