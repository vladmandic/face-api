import { TinyYolov2Options } from '../tinyYolov2';
import { detectAllFaces } from './detectFaces';
// export allFaces API for backward compatibility
export async function allFacesTinyYolov2(input, forwardParams = {}) {
    console.warn('allFacesTinyYolov2 is deprecated and will be removed soon, use the high level api instead');
    return await detectAllFaces(input, new TinyYolov2Options(forwardParams))
        .withFaceLandmarks()
        .withFaceDescriptors();
}
export const allFaces = allFacesTinyYolov2;
//# sourceMappingURL=allFaces.js.map