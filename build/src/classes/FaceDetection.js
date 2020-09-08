import { ObjectDetection } from './ObjectDetection';
export class FaceDetection extends ObjectDetection {
    constructor(score, relativeBox, imageDims) {
        super(score, score, '', relativeBox, imageDims);
    }
    forSize(width, height) {
        const { score, relativeBox, imageDims } = super.forSize(width, height);
        return new FaceDetection(score, relativeBox, imageDims);
    }
}
//# sourceMappingURL=FaceDetection.js.map