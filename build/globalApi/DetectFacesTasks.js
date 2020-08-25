import { extendWithFaceDetection } from '../factories/WithFaceDetection';
import { SsdMobilenetv1Options } from '../ssdMobilenetv1/SsdMobilenetv1Options';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
import { TinyYolov2Options } from '../tinyYolov2';
import { ComposableTask } from './ComposableTask';
import { DetectAllFaceLandmarksTask, DetectSingleFaceLandmarksTask } from './DetectFaceLandmarksTasks';
import { nets } from './nets';
import { PredictAllAgeAndGenderTask, PredictSingleAgeAndGenderTask } from './PredictAgeAndGenderTask';
import { PredictAllFaceExpressionsTask, PredictSingleFaceExpressionsTask } from './PredictFaceExpressionsTask';
export class DetectFacesTaskBase extends ComposableTask {
    constructor(input, options = new SsdMobilenetv1Options()) {
        super();
        this.input = input;
        this.options = options;
    }
}
export class DetectAllFacesTask extends DetectFacesTaskBase {
    async run() {
        const { input, options } = this;
        const faceDetectionFunction = options instanceof TinyFaceDetectorOptions
            ? (input) => nets.tinyFaceDetector.locateFaces(input, options)
            : (options instanceof SsdMobilenetv1Options
                ? (input) => nets.ssdMobilenetv1.locateFaces(input, options)
                : (options instanceof TinyYolov2Options
                    ? (input) => nets.tinyYolov2.locateFaces(input, options)
                    : null));
        if (!faceDetectionFunction) {
            throw new Error('detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options');
        }
        return faceDetectionFunction(input);
    }
    runAndExtendWithFaceDetections() {
        return new Promise(async (res) => {
            const detections = await this.run();
            return res(detections.map(detection => extendWithFaceDetection({}, detection)));
        });
    }
    withFaceLandmarks(useTinyLandmarkNet = false) {
        return new DetectAllFaceLandmarksTask(this.runAndExtendWithFaceDetections(), this.input, useTinyLandmarkNet);
    }
    withFaceExpressions() {
        return new PredictAllFaceExpressionsTask(this.runAndExtendWithFaceDetections(), this.input);
    }
    withAgeAndGender() {
        return new PredictAllAgeAndGenderTask(this.runAndExtendWithFaceDetections(), this.input);
    }
}
export class DetectSingleFaceTask extends DetectFacesTaskBase {
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
            return res(detection ? extendWithFaceDetection({}, detection) : undefined);
        });
    }
    withFaceLandmarks(useTinyLandmarkNet = false) {
        return new DetectSingleFaceLandmarksTask(this.runAndExtendWithFaceDetection(), this.input, useTinyLandmarkNet);
    }
    withFaceExpressions() {
        return new PredictSingleFaceExpressionsTask(this.runAndExtendWithFaceDetection(), this.input);
    }
    withAgeAndGender() {
        return new PredictSingleAgeAndGenderTask(this.runAndExtendWithFaceDetection(), this.input);
    }
}
//# sourceMappingURL=DetectFacesTasks.js.map