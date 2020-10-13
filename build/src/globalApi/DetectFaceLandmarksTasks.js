import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { extractFaces, extractFaceTensors } from '../dom';
import { extendWithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { ComposableTask } from './ComposableTask';
import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from './ComputeFaceDescriptorsTasks';
import { nets } from './nets';
import { PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderWithFaceAlignmentTask, } from './PredictAgeAndGenderTask';
import { PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsWithFaceAlignmentTask, } from './PredictFaceExpressionsTask';
export class DetectFaceLandmarksTaskBase extends ComposableTask {
    constructor(parentTask, input, useTinyLandmarkNet) {
        super();
        this.parentTask = parentTask;
        this.input = input;
        this.useTinyLandmarkNet = useTinyLandmarkNet;
    }
    get landmarkNet() {
        return this.useTinyLandmarkNet
            ? nets.faceLandmark68TinyNet
            : nets.faceLandmark68Net;
    }
}
export class DetectAllFaceLandmarksTask extends DetectFaceLandmarksTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const detections = parentResults.map(res => res.detection);
        const faces = this.input instanceof tf.Tensor
            ? await extractFaceTensors(this.input, detections)
            : await extractFaces(this.input, detections);
        const faceLandmarksByFace = await Promise.all(faces.map(face => this.landmarkNet.detectLandmarks(face)));
        faces.forEach(f => f instanceof tf.Tensor && f.dispose());
        return parentResults.map((parentResult, i) => extendWithFaceLandmarks(parentResult, faceLandmarksByFace[i]));
    }
    withFaceExpressions() {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptors() {
        return new ComputeAllFaceDescriptorsTask(this, this.input);
    }
}
export class DetectSingleFaceLandmarksTask extends DetectFaceLandmarksTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const { detection } = parentResult;
        const faces = this.input instanceof tf.Tensor
            ? await extractFaceTensors(this.input, [detection])
            : await extractFaces(this.input, [detection]);
        const landmarks = await this.landmarkNet.detectLandmarks(faces[0]);
        faces.forEach(f => f instanceof tf.Tensor && f.dispose());
        return extendWithFaceLandmarks(parentResult, landmarks);
    }
    withFaceExpressions() {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptor() {
        return new ComputeSingleFaceDescriptorTask(this, this.input);
    }
}
//# sourceMappingURL=DetectFaceLandmarksTasks.js.map