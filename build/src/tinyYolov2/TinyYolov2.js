import { FaceDetection } from '../classes';
import { BOX_ANCHORS, BOX_ANCHORS_SEPARABLE, DEFAULT_MODEL_NAME, DEFAULT_MODEL_NAME_SEPARABLE_CONV, IOU_THRESHOLD, MEAN_RGB_SEPARABLE, } from './const';
import { TinyYolov2Base } from './TinyYolov2Base';
export class TinyYolov2 extends TinyYolov2Base {
    constructor(withSeparableConvs = true) {
        const config = Object.assign({}, {
            withSeparableConvs,
            iouThreshold: IOU_THRESHOLD,
            classes: ['face']
        }, withSeparableConvs
            ? {
                anchors: BOX_ANCHORS_SEPARABLE,
                meanRgb: MEAN_RGB_SEPARABLE
            }
            : {
                anchors: BOX_ANCHORS,
                withClassScores: true
            });
        super(config);
    }
    get withSeparableConvs() {
        return this.config.withSeparableConvs;
    }
    get anchors() {
        return this.config.anchors;
    }
    async locateFaces(input, forwardParams) {
        const objectDetections = await this.detect(input, forwardParams);
        return objectDetections.map(det => new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
    }
    getDefaultModelName() {
        return this.withSeparableConvs ? DEFAULT_MODEL_NAME_SEPARABLE_CONV : DEFAULT_MODEL_NAME;
    }
    extractParamsFromWeigthMap(weightMap) {
        return super.extractParamsFromWeigthMap(weightMap);
    }
}
//# sourceMappingURL=TinyYolov2.js.map