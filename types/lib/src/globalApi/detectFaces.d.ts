import { TNetInput } from '../dom/index';
import { DetectAllFacesTask, DetectSingleFaceTask } from './DetectFacesTasks';
import { FaceDetectionOptions } from './types';
export declare function detectSingleFace(input: TNetInput, options?: FaceDetectionOptions): DetectSingleFaceTask;
export declare function detectAllFaces(input: TNetInput, options?: FaceDetectionOptions): DetectAllFacesTask;
