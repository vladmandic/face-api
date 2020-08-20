"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyFaceDetector = void 0;
const classes_1 = require("../classes");
const TinyYolov2Base_1 = require("../tinyYolov2/TinyYolov2Base");
const const_1 = require("./const");
class TinyFaceDetector extends TinyYolov2Base_1.TinyYolov2Base {
    constructor() {
        const config = {
            withSeparableConvs: true,
            iouThreshold: const_1.IOU_THRESHOLD,
            classes: ['face'],
            anchors: const_1.BOX_ANCHORS,
            meanRgb: const_1.MEAN_RGB,
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
        return objectDetections.map(det => new classes_1.FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
    }
    getDefaultModelName() {
        return 'tiny_face_detector_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return super.extractParamsFromWeigthMap(weightMap);
    }
}
exports.TinyFaceDetector = TinyFaceDetector;
//# sourceMappingURL=TinyFaceDetector.js.map