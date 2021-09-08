import { TNetInput } from '../dom/index';
import { WithFaceDescriptor, WithFaceDetection, WithFaceLandmarks } from '../factories/index';
import { ITinyYolov2Options } from '../tinyYolov2/index';
export declare function allFacesSsdMobilenetv1(input: TNetInput, minConfidence?: number): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;
export declare function allFacesTinyYolov2(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;
export declare const allFaces: typeof allFacesSsdMobilenetv1;
