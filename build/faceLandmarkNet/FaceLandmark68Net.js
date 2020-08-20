import { FaceFeatureExtractor } from '../faceFeatureExtractor/FaceFeatureExtractor';
import { FaceLandmark68NetBase } from './FaceLandmark68NetBase';
export class FaceLandmark68Net extends FaceLandmark68NetBase {
    constructor(faceFeatureExtractor = new FaceFeatureExtractor()) {
        super('FaceLandmark68Net', faceFeatureExtractor);
    }
    getDefaultModelName() {
        return 'face_landmark_68_model';
    }
    getClassifierChannelsIn() {
        return 256;
    }
}
//# sourceMappingURL=FaceLandmark68Net.js.map