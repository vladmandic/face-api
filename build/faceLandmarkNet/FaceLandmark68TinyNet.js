import { TinyFaceFeatureExtractor } from '../faceFeatureExtractor/TinyFaceFeatureExtractor';
import { FaceLandmark68NetBase } from './FaceLandmark68NetBase';
export class FaceLandmark68TinyNet extends FaceLandmark68NetBase {
    constructor(faceFeatureExtractor = new TinyFaceFeatureExtractor()) {
        super('FaceLandmark68TinyNet', faceFeatureExtractor);
    }
    getDefaultModelName() {
        return 'face_landmark_68_tiny_model';
    }
    getClassifierChannelsIn() {
        return 128;
    }
}
//# sourceMappingURL=FaceLandmark68TinyNet.js.map