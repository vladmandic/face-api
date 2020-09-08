import * as tf from '@tensorflow/tfjs-core';
import { Point } from '../classes';
import { Dimensions } from '../classes/Dimensions';
export function isTensor(tensor, dim) {
    return tensor instanceof tf.Tensor && tensor.shape.length === dim;
}
export function isTensor1D(tensor) {
    return isTensor(tensor, 1);
}
export function isTensor2D(tensor) {
    return isTensor(tensor, 2);
}
export function isTensor3D(tensor) {
    return isTensor(tensor, 3);
}
export function isTensor4D(tensor) {
    return isTensor(tensor, 4);
}
export function isFloat(num) {
    return num % 1 !== 0;
}
export function isEven(num) {
    return num % 2 === 0;
}
export function round(num, prec = 2) {
    const f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
}
export function isDimensions(obj) {
    return obj && obj.width && obj.height;
}
export function computeReshapedDimensions({ width, height }, inputSize) {
    const scale = inputSize / Math.max(height, width);
    return new Dimensions(Math.round(width * scale), Math.round(height * scale));
}
export function getCenterPoint(pts) {
    return pts.reduce((sum, pt) => sum.add(pt), new Point(0, 0))
        .div(new Point(pts.length, pts.length));
}
export function range(num, start, step) {
    return Array(num).fill(0).map((_, i) => start + (i * step));
}
export function isValidNumber(num) {
    return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
}
export function isValidProbablitiy(num) {
    return isValidNumber(num) && 0 <= num && num <= 1.0;
}
//# sourceMappingURL=index.js.map