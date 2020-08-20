"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidProbablitiy = exports.isValidNumber = exports.range = exports.getCenterPoint = exports.computeReshapedDimensions = exports.isDimensions = exports.round = exports.isEven = exports.isFloat = exports.isTensor4D = exports.isTensor3D = exports.isTensor2D = exports.isTensor1D = exports.isTensor = void 0;
const tf = require("@tensorflow/tfjs-core");
const classes_1 = require("../classes");
const Dimensions_1 = require("../classes/Dimensions");
function isTensor(tensor, dim) {
    return tensor instanceof tf.Tensor && tensor.shape.length === dim;
}
exports.isTensor = isTensor;
function isTensor1D(tensor) {
    return isTensor(tensor, 1);
}
exports.isTensor1D = isTensor1D;
function isTensor2D(tensor) {
    return isTensor(tensor, 2);
}
exports.isTensor2D = isTensor2D;
function isTensor3D(tensor) {
    return isTensor(tensor, 3);
}
exports.isTensor3D = isTensor3D;
function isTensor4D(tensor) {
    return isTensor(tensor, 4);
}
exports.isTensor4D = isTensor4D;
function isFloat(num) {
    return num % 1 !== 0;
}
exports.isFloat = isFloat;
function isEven(num) {
    return num % 2 === 0;
}
exports.isEven = isEven;
function round(num, prec = 2) {
    const f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
}
exports.round = round;
function isDimensions(obj) {
    return obj && obj.width && obj.height;
}
exports.isDimensions = isDimensions;
function computeReshapedDimensions({ width, height }, inputSize) {
    const scale = inputSize / Math.max(height, width);
    return new Dimensions_1.Dimensions(Math.round(width * scale), Math.round(height * scale));
}
exports.computeReshapedDimensions = computeReshapedDimensions;
function getCenterPoint(pts) {
    return pts.reduce((sum, pt) => sum.add(pt), new classes_1.Point(0, 0))
        .div(new classes_1.Point(pts.length, pts.length));
}
exports.getCenterPoint = getCenterPoint;
function range(num, start, step) {
    return Array(num).fill(0).map((_, i) => start + (i * step));
}
exports.range = range;
function isValidNumber(num) {
    return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
}
exports.isValidNumber = isValidNumber;
function isValidProbablitiy(num) {
    return isValidNumber(num) && 0 <= num && num <= 1.0;
}
exports.isValidProbablitiy = isValidProbablitiy;
//# sourceMappingURL=index.js.map