import { TNetInput } from '../dom/index';
import { WithFaceDescriptor, WithFaceDetection, WithFaceLandmarks } from '../factories/index';
import { SsdMobilenetv1Options } from '../ssdMobilenetv1/index';
import { ITinyYolov2Options, TinyYolov2Options } from '../tinyYolov2/index';
import { detectAllFaces } from './detectFaces';

export async function allFacesSsdMobilenetv1(input: TNetInput, minConfidence?: number): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]> {
  return detectAllFaces(input, new SsdMobilenetv1Options(minConfidence ? { minConfidence } : {}))
    .withFaceLandmarks()
    .withFaceDescriptors();
}

export async function allFacesTinyYolov2(input: TNetInput, forwardParams: ITinyYolov2Options = {}): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]> {
  return detectAllFaces(input, new TinyYolov2Options(forwardParams))
    .withFaceLandmarks()
    .withFaceDescriptors();
}

export const allFaces = allFacesSsdMobilenetv1;
