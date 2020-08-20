"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectSingleFaceLandmarksTask = exports.DetectAllFaceLandmarksTask = exports.DetectFaceLandmarksTaskBase = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const WithFaceLandmarks_1 = require("../factories/WithFaceLandmarks");
const ComposableTask_1 = require("./ComposableTask");
const ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
const nets_1 = require("./nets");
const PredictAgeAndGenderTask_1 = require("./PredictAgeAndGenderTask");
const PredictFaceExpressionsTask_1 = require("./PredictFaceExpressionsTask");
class DetectFaceLandmarksTaskBase extends ComposableTask_1.ComposableTask {
    constructor(parentTask, input, useTinyLandmarkNet) {
        super();
        this.parentTask = parentTask;
        this.input = input;
        this.useTinyLandmarkNet = useTinyLandmarkNet;
    }
    get landmarkNet() {
        return this.useTinyLandmarkNet
            ? nets_1.nets.faceLandmark68TinyNet
            : nets_1.nets.faceLandmark68Net;
    }
}
exports.DetectFaceLandmarksTaskBase = DetectFaceLandmarksTaskBase;
class DetectAllFaceLandmarksTask extends DetectFaceLandmarksTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const detections = parentResults.map(res => res.detection);
        const faces = this.input instanceof tf.Tensor
            ? await dom_1.extractFaceTensors(this.input, detections)
            : await dom_1.extractFaces(this.input, detections);
        const faceLandmarksByFace = await Promise.all(faces.map(face => this.landmarkNet.detectLandmarks(face)));
        faces.forEach(f => f instanceof tf.Tensor && f.dispose());
        return parentResults.map((parentResult, i) => WithFaceLandmarks_1.extendWithFaceLandmarks(parentResult, faceLandmarksByFace[i]));
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptors() {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    }
}
exports.DetectAllFaceLandmarksTask = DetectAllFaceLandmarksTask;
class DetectSingleFaceLandmarksTask extends DetectFaceLandmarksTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const { detection } = parentResult;
        const faces = this.input instanceof tf.Tensor
            ? await dom_1.extractFaceTensors(this.input, [detection])
            : await dom_1.extractFaces(this.input, [detection]);
        const landmarks = await this.landmarkNet.detectLandmarks(faces[0]);
        faces.forEach(f => f instanceof tf.Tensor && f.dispose());
        return WithFaceLandmarks_1.extendWithFaceLandmarks(parentResult, landmarks);
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptor() {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    }
}
exports.DetectSingleFaceLandmarksTask = DetectSingleFaceLandmarksTask;
//# sourceMappingURL=DetectFaceLandmarksTasks.js.map