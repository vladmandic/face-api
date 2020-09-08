import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom';
import { SsdMobilenetv1Options } from '../ssdMobilenetv1/SsdMobilenetv1Options';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
import { TinyYolov2Options } from '../tinyYolov2';
export declare type FaceDetectionOptions = TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options;
export declare type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>;
//# sourceMappingURL=types.d.ts.map