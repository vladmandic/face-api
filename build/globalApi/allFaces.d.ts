import { TNetInput } from '../dom';
import { WithFaceDescriptor, WithFaceDetection, WithFaceLandmarks } from '../factories';
import { ITinyYolov2Options } from '../tinyYolov2';
export declare function allFacesTinyYolov2(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;
export declare const allFaces: typeof allFacesTinyYolov2;
