import { DetectAllFacesTask, DetectSingleFaceTask } from './DetectFacesTasks';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
export function detectSingleFace(input, options = new TinyFaceDetectorOptions()) {
    return new DetectSingleFaceTask(input, options);
}
export function detectAllFaces(input, options = new TinyFaceDetectorOptions()) {
    return new DetectAllFacesTask(input, options);
}
//# sourceMappingURL=detectFaces.js.map