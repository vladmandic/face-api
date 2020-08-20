"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceDetection = void 0;
const ObjectDetection_1 = require("./ObjectDetection");
class FaceDetection extends ObjectDetection_1.ObjectDetection {
    constructor(score, relativeBox, imageDims) {
        super(score, score, '', relativeBox, imageDims);
    }
    forSize(width, height) {
        const { score, relativeBox, imageDims } = super.forSize(width, height);
        return new FaceDetection(score, relativeBox, imageDims);
    }
}
exports.FaceDetection = FaceDetection;
//# sourceMappingURL=FaceDetection.js.map