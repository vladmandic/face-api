import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { conv, convDown, convNoRelu } from './convLayer';
export function residual(x, params) {
    let out = conv(x, params.conv1);
    out = convNoRelu(out, params.conv2);
    out = tf.add(out, x);
    out = tf.relu(out);
    return out;
}
export function residualDown(x, params) {
    let out = convDown(x, params.conv1);
    out = convNoRelu(out, params.conv2);
    let pooled = tf.avgPool(x, 2, 2, 'valid');
    const zeros = tf.zeros(pooled.shape);
    const isPad = pooled.shape[3] !== out.shape[3];
    const isAdjustShape = pooled.shape[1] !== out.shape[1] || pooled.shape[2] !== out.shape[2];
    if (isAdjustShape) {
        const padShapeX = [...out.shape];
        padShapeX[1] = 1;
        const zerosW = tf.zeros(padShapeX);
        out = tf.concat([out, zerosW], 1);
        const padShapeY = [...out.shape];
        padShapeY[2] = 1;
        const zerosH = tf.zeros(padShapeY);
        out = tf.concat([out, zerosH], 2);
    }
    pooled = isPad ? tf.concat([pooled, zeros], 3) : pooled;
    out = tf.add(pooled, out);
    out = tf.relu(out);
    return out;
}
//# sourceMappingURL=residualLayer.js.map