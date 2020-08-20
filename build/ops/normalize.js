"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
const tf = require("@tensorflow/tfjs-core");
function normalize(x, meanRgb) {
    return tf.tidy(() => {
        const [r, g, b] = meanRgb;
        const avg_r = tf.fill([...x.shape.slice(0, 3), 1], r);
        const avg_g = tf.fill([...x.shape.slice(0, 3), 1], g);
        const avg_b = tf.fill([...x.shape.slice(0, 3), 1], b);
        const avg_rgb = tf.concat([avg_r, avg_g, avg_b], 3);
        return tf.sub(x, avg_rgb);
    });
}
exports.normalize = normalize;
//# sourceMappingURL=normalize.js.map