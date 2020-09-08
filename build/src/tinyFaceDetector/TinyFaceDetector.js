import { FaceDetection } from '../classes';
import { TinyYolov2Base } from '../tinyYolov2/TinyYolov2Base';
import { BOX_ANCHORS, IOU_THRESHOLD, MEAN_RGB } from './const';
export class TinyFaceDetector extends TinyYolov2Base {
    constructor() {
        const config = {
            withSeparableConvs: true,
            iouThreshold: IOU_THRESHOLD,
            classes: ['face'],
            anchors: BOX_ANCHORS,
            meanRgb: MEAN_RGB,
            isFirstLayerConv2d: true,
            filterSizes: [3, 16, 32, 64, 128, 256, 512]
        };
        super(config);
    }
    get anchors() {
        return this.config.anchors;
    }
    async locateFaces(input, forwardParams) {
        const objectDetections = await this.detect(input, forwardParams);
        return objectDetections.map(det => new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
    }
    getDefaultModelName() {
        return 'tiny_face_detector_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return super.extractParamsFromWeigthMap(weightMap);
    }
}
//# sourceMappingURL=TinyFaceDetector.js.map