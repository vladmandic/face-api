import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
export declare type FaceDetectionOptions = TinyFaceDetectorOptions;
export declare type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>;
