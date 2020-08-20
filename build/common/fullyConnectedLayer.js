"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullyConnectedLayer = void 0;
const tf = require("@tensorflow/tfjs-core");
function fullyConnectedLayer(x, params) {
    return tf.tidy(() => tf.add(tf.matMul(x, params.weights), params.bias));
}
exports.fullyConnectedLayer = fullyConnectedLayer;
//# sourceMappingURL=fullyConnectedLayer.js.map