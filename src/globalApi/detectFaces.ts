import { TNetInput } from '../dom';
import { DetectAllFacesTask, DetectSingleFaceTask } from './DetectFacesTasks';
import { FaceDetectionOptions } from './types';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';


export function detectSingleFace(
  input: TNetInput,
  options: FaceDetectionOptions = new TinyFaceDetectorOptions()
): DetectSingleFaceTask {
  return new DetectSingleFaceTask(input, options)
}

export function detectAllFaces(
  input: TNetInput,
  options: FaceDetectionOptions = new TinyFaceDetectorOptions()
): DetectAllFacesTask {
  return new DetectAllFacesTask(input, options)
}