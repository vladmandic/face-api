import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom/index';
import { SsdMobilenetv1Options } from '../ssdMobilenetv1/SsdMobilenetv1Options';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
import { TinyYolov2Options } from '../tinyYolov2/index';
export type FaceDetectionOptions = TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options;
export type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>;
