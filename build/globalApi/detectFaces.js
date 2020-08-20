"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAllFaces = exports.detectSingleFace = void 0;
const DetectFacesTasks_1 = require("./DetectFacesTasks");
const TinyFaceDetectorOptions_1 = require("../tinyFaceDetector/TinyFaceDetectorOptions");
function detectSingleFace(input, options = new TinyFaceDetectorOptions_1.TinyFaceDetectorOptions()) {
    return new DetectFacesTasks_1.DetectSingleFaceTask(input, options);
}
exports.detectSingleFace = detectSingleFace;
function detectAllFaces(input, options = new TinyFaceDetectorOptions_1.TinyFaceDetectorOptions()) {
    return new DetectFacesTasks_1.DetectAllFacesTask(input, options);
}
exports.detectAllFaces = detectAllFaces;
//# sourceMappingURL=detectFaces.js.map