import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';

export type FaceDetectionOptions = TinyFaceDetectorOptions

export type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>