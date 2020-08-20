"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyYolov2 = void 0;
const classes_1 = require("../classes");
const const_1 = require("./const");
const TinyYolov2Base_1 = require("./TinyYolov2Base");
class TinyYolov2 extends TinyYolov2Base_1.TinyYolov2Base {
    constructor(withSeparableConvs = true) {
        const config = Object.assign({}, {
            withSeparableConvs,
            iouThreshold: const_1.IOU_THRESHOLD,
            classes: ['face']
        }, withSeparableConvs
            ? {
                anchors: const_1.BOX_ANCHORS_SEPARABLE,
                meanRgb: const_1.MEAN_RGB_SEPARABLE
            }
            : {
                anchors: const_1.BOX_ANCHORS,
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
        return objectDetections.map(det => new classes_1.FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
    }
    getDefaultModelName() {
        return this.withSeparableConvs ? const_1.DEFAULT_MODEL_NAME_SEPARABLE_CONV : const_1.DEFAULT_MODEL_NAME;
    }
    extractParamsFromWeigthMap(weightMap) {
        return super.extractParamsFromWeigthMap(weightMap);
    }
}
exports.TinyYolov2 = TinyYolov2;
//# sourceMappingURL=TinyYolov2.js.map