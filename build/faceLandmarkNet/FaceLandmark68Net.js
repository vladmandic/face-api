"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceLandmark68Net = void 0;
const FaceFeatureExtractor_1 = require("../faceFeatureExtractor/FaceFeatureExtractor");
const FaceLandmark68NetBase_1 = require("./FaceLandmark68NetBase");
class FaceLandmark68Net extends FaceLandmark68NetBase_1.FaceLandmark68NetBase {
    constructor(faceFeatureExtractor = new FaceFeatureExtractor_1.FaceFeatureExtractor()) {
        super('FaceLandmark68Net', faceFeatureExtractor);
    }
    getDefaultModelName() {
        return 'face_landmark_68_model';
    }
    getClassifierChannelsIn() {
        return 256;
    }
}
exports.FaceLandmark68Net = FaceLandmark68Net;
//# sourceMappingURL=FaceLandmark68Net.js.map