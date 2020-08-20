"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectSingleFaceTask = exports.DetectAllFacesTask = exports.DetectFacesTaskBase = void 0;
const WithFaceDetection_1 = require("../factories/WithFaceDetection");
const TinyFaceDetectorOptions_1 = require("../tinyFaceDetector/TinyFaceDetectorOptions");
const ComposableTask_1 = require("./ComposableTask");
const DetectFaceLandmarksTasks_1 = require("./DetectFaceLandmarksTasks");
const nets_1 = require("./nets");
const PredictAgeAndGenderTask_1 = require("./PredictAgeAndGenderTask");
const PredictFaceExpressionsTask_1 = require("./PredictFaceExpressionsTask");
class DetectFacesTaskBase extends ComposableTask_1.ComposableTask {
    constructor(input, options = new TinyFaceDetectorOptions_1.TinyFaceDetectorOptions()) {
        super();
        this.input = input;
        this.options = options;
    }
}
exports.DetectFacesTaskBase = DetectFacesTaskBase;
class DetectAllFacesTask extends DetectFacesTaskBase {
    async run() {
        const { input, options } = this;
        const faceDetectionFunction = options instanceof TinyFaceDetectorOptions_1.TinyFaceDetectorOptions
            ? (input) => nets_1.nets.tinyFaceDetector.locateFaces(input, options)
            : null;
        if (!faceDetectionFunction) {
            throw new Error('detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options');
        }
        return faceDetectionFunction(input);
    }
    runAndExtendWithFaceDetections() {
        return new Promise(async (res) => {
            const detections = await this.run();
            return res(detections.map(detection => WithFaceDetection_1.extendWithFaceDetection({}, detection)));
        });
    }
    withFaceLandmarks(useTinyLandmarkNet = false) {
        return new DetectFaceLandmarksTasks_1.DetectAllFaceLandmarksTask(this.runAndExtendWithFaceDetections(), this.input, useTinyLandmarkNet);
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsTask(this.runAndExtendWithFaceDetections(), this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictAllAgeAndGenderTask(this.runAndExtendWithFaceDetections(), this.input);
    }
}
exports.DetectAllFacesTask = DetectAllFacesTask;
class DetectSingleFaceTask extends DetectFacesTaskBase {
    async run() {
        const faceDetections = await new DetectAllFacesTask(this.input, this.options);
        let faceDetectionWithHighestScore = faceDetections[0];
        faceDetections.forEach(faceDetection => {
            if (faceDetection.score > faceDetectionWithHighestScore.score) {
                faceDetectionWithHighestScore = faceDetection;
            }
        });
        return faceDetectionWithHighestScore;
    }
    runAndExtendWithFaceDetection() {
        return new Promise(async (res) => {
            const detection = await this.run();
            return res(detection ? WithFaceDetection_1.extendWithFaceDetection({}, detection) : undefined);
        });
    }
    withFaceLandmarks(useTinyLandmarkNet = false) {
        return new DetectFaceLandmarksTasks_1.DetectSingleFaceLandmarksTask(this.runAndExtendWithFaceDetection(), this.input, useTinyLandmarkNet);
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsTask(this.runAndExtendWithFaceDetection(), this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictSingleAgeAndGenderTask(this.runAndExtendWithFaceDetection(), this.input);
    }
}
exports.DetectSingleFaceTask = DetectSingleFaceTask;
//# sourceMappingURL=DetectFacesTasks.js.map