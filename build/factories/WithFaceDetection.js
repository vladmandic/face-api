"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWithFaceDetection = exports.isWithFaceDetection = void 0;
const FaceDetection_1 = require("../classes/FaceDetection");
function isWithFaceDetection(obj) {
    return obj['detection'] instanceof FaceDetection_1.FaceDetection;
}
exports.isWithFaceDetection = isWithFaceDetection;
function extendWithFaceDetection(sourceObj, detection) {
    const extension = { detection };
    return Object.assign({}, sourceObj, extension);
}
exports.extendWithFaceDetection = extendWithFaceDetection;
//# sourceMappingURL=WithFaceDetection.js.map