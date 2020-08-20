"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWithFaceLandmarks = exports.isWithFaceLandmarks = void 0;
const FaceDetection_1 = require("../classes/FaceDetection");
const FaceLandmarks_1 = require("../classes/FaceLandmarks");
const WithFaceDetection_1 = require("./WithFaceDetection");
function isWithFaceLandmarks(obj) {
    return WithFaceDetection_1.isWithFaceDetection(obj)
        && obj['landmarks'] instanceof FaceLandmarks_1.FaceLandmarks
        && obj['unshiftedLandmarks'] instanceof FaceLandmarks_1.FaceLandmarks
        && obj['alignedRect'] instanceof FaceDetection_1.FaceDetection;
}
exports.isWithFaceLandmarks = isWithFaceLandmarks;
function extendWithFaceLandmarks(sourceObj, unshiftedLandmarks) {
    const { box: shift } = sourceObj.detection;
    const landmarks = unshiftedLandmarks.shiftBy(shift.x, shift.y);
    const rect = landmarks.align();
    const { imageDims } = sourceObj.detection;
    const alignedRect = new FaceDetection_1.FaceDetection(sourceObj.detection.score, rect.rescale(imageDims.reverse()), imageDims);
    const extension = {
        landmarks,
        unshiftedLandmarks,
        alignedRect
    };
    return Object.assign({}, sourceObj, extension);
}
exports.extendWithFaceLandmarks = extendWithFaceLandmarks;
//# sourceMappingURL=WithFaceLandmarks.js.map