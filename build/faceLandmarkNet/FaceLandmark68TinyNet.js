"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceLandmark68TinyNet = void 0;
const TinyFaceFeatureExtractor_1 = require("../faceFeatureExtractor/TinyFaceFeatureExtractor");
const FaceLandmark68NetBase_1 = require("./FaceLandmark68NetBase");
class FaceLandmark68TinyNet extends FaceLandmark68NetBase_1.FaceLandmark68NetBase {
    constructor(faceFeatureExtractor = new TinyFaceFeatureExtractor_1.TinyFaceFeatureExtractor()) {
        super('FaceLandmark68TinyNet', faceFeatureExtractor);
    }
    getDefaultModelName() {
        return 'face_landmark_68_tiny_model';
    }
    getClassifierChannelsIn() {
        return 128;
    }
}
exports.FaceLandmark68TinyNet = FaceLandmark68TinyNet;
//# sourceMappingURL=FaceLandmark68TinyNet.js.map