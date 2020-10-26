import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
export function normalize(x, meanRgb) {
    return tf.tidy(() => {
        const [r, g, b] = meanRgb;
        const avg_r = tf.fill([...x.shape.slice(0, 3), 1], r, 'float32');
        const avg_g = tf.fill([...x.shape.slice(0, 3), 1], g, 'float32');
        const avg_b = tf.fill([...x.shape.slice(0, 3), 1], b, 'float32');
        const avg_rgb = tf.concat([avg_r, avg_g, avg_b], 3);
        return tf.sub(x, avg_rgb);
    });
}
//# sourceMappingURL=normalize.js.map