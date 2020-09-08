import { AgeGenderNet } from '../ageGenderNet/AgeGenderNet';
import { FaceExpressionNet } from '../faceExpressionNet/FaceExpressionNet';
import { FaceLandmark68Net } from '../faceLandmarkNet/FaceLandmark68Net';
import { FaceLandmark68TinyNet } from '../faceLandmarkNet/FaceLandmark68TinyNet';
import { FaceRecognitionNet } from '../faceRecognitionNet/FaceRecognitionNet';
import { SsdMobilenetv1 } from '../ssdMobilenetv1/SsdMobilenetv1';
import { TinyFaceDetector } from '../tinyFaceDetector/TinyFaceDetector';
import { TinyYolov2 } from '../tinyYolov2';
export const nets = {
    ssdMobilenetv1: new SsdMobilenetv1(),
    tinyFaceDetector: new TinyFaceDetector(),
    tinyYolov2: new TinyYolov2(),
    faceLandmark68Net: new FaceLandmark68Net(),
    faceLandmark68TinyNet: new FaceLandmark68TinyNet(),
    faceRecognitionNet: new FaceRecognitionNet(),
    faceExpressionNet: new FaceExpressionNet(),
    ageGenderNet: new AgeGenderNet()
};
/**
 * Attempts to detect all faces in an image using SSD Mobilenetv1 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see SsdMobilenetv1Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export const ssdMobilenetv1 = (input, options) => nets.ssdMobilenetv1.locateFaces(input, options);
/**
 * Attempts to detect all faces in an image using the Tiny Face Detector.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyFaceDetectorOptions constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export const tinyFaceDetector = (input, options) => nets.tinyFaceDetector.locateFaces(input, options);
/**
 * Attempts to detect all faces in an image using the Tiny Yolov2 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyYolov2Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export const tinyYolov2 = (input, options) => nets.tinyYolov2.locateFaces(input, options);
/**
 * Detects the 68 point face landmark positions of the face shown in an image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
export const detectFaceLandmarks = (input) => nets.faceLandmark68Net.detectLandmarks(input);
/**
 * Detects the 68 point face landmark positions of the face shown in an image
 * using a tinier version of the 68 point face landmark model, which is slightly
 * faster at inference, but also slightly less accurate.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
export const detectFaceLandmarksTiny = (input) => nets.faceLandmark68TinyNet.detectLandmarks(input);
/**
 * Computes a 128 entry vector (face descriptor / face embeddings) from the face shown in an image,
 * which uniquely represents the features of that persons face. The computed face descriptor can
 * be used to measure the similarity between faces, by computing the euclidean distance of two
 * face descriptors.
 *
 * @param inputs The face image extracted from the aligned bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Face descriptor with 128 entries or array thereof in case of batch input.
 */
export const computeFaceDescriptor = (input) => nets.faceRecognitionNet.computeFaceDescriptor(input);
/**
 * Recognizes the facial expressions from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Facial expressions with corresponding probabilities or array thereof in case of batch input.
 */
export const recognizeFaceExpressions = (input) => nets.faceExpressionNet.predictExpressions(input);
/**
 * Predicts age and gender from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Predictions with age, gender and gender probability or array thereof in case of batch input.
 */
export const predictAgeAndGender = (input) => nets.ageGenderNet.predictAgeAndGender(input);
export const loadSsdMobilenetv1Model = (url) => nets.ssdMobilenetv1.load(url);
export const loadTinyFaceDetectorModel = (url) => nets.tinyFaceDetector.load(url);
export const loadTinyYolov2Model = (url) => nets.tinyYolov2.load(url);
export const loadFaceLandmarkModel = (url) => nets.faceLandmark68Net.load(url);
export const loadFaceLandmarkTinyModel = (url) => nets.faceLandmark68TinyNet.load(url);
export const loadFaceRecognitionModel = (url) => nets.faceRecognitionNet.load(url);
export const loadFaceExpressionModel = (url) => nets.faceExpressionNet.load(url);
export const loadAgeGenderModel = (url) => nets.ageGenderNet.load(url);
// backward compatibility
export const loadFaceDetectionModel = loadSsdMobilenetv1Model;
export const locateFaces = ssdMobilenetv1;
export const detectLandmarks = detectFaceLandmarks;
//# sourceMappingURL=nets.js.map