"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLandmarks = exports.locateFaces = exports.loadFaceDetectionModel = exports.loadAgeGenderModel = exports.loadFaceExpressionModel = exports.loadFaceRecognitionModel = exports.loadFaceLandmarkTinyModel = exports.loadFaceLandmarkModel = exports.loadTinyYolov2Model = exports.loadTinyFaceDetectorModel = exports.predictAgeAndGender = exports.recognizeFaceExpressions = exports.computeFaceDescriptor = exports.detectFaceLandmarksTiny = exports.detectFaceLandmarks = exports.tinyFaceDetector = exports.nets = void 0;
const AgeGenderNet_1 = require("../ageGenderNet/AgeGenderNet");
const FaceExpressionNet_1 = require("../faceExpressionNet/FaceExpressionNet");
const FaceLandmark68Net_1 = require("../faceLandmarkNet/FaceLandmark68Net");
const FaceLandmark68TinyNet_1 = require("../faceLandmarkNet/FaceLandmark68TinyNet");
const FaceRecognitionNet_1 = require("../faceRecognitionNet/FaceRecognitionNet");
const TinyFaceDetector_1 = require("../tinyFaceDetector/TinyFaceDetector");
const tinyYolov2_1 = require("../tinyYolov2");
exports.nets = {
    tinyFaceDetector: new TinyFaceDetector_1.TinyFaceDetector(),
    tinyYolov2: new tinyYolov2_1.TinyYolov2(),
    faceLandmark68Net: new FaceLandmark68Net_1.FaceLandmark68Net(),
    faceLandmark68TinyNet: new FaceLandmark68TinyNet_1.FaceLandmark68TinyNet(),
    faceRecognitionNet: new FaceRecognitionNet_1.FaceRecognitionNet(),
    faceExpressionNet: new FaceExpressionNet_1.FaceExpressionNet(),
    ageGenderNet: new AgeGenderNet_1.AgeGenderNet()
};
/**
 * Attempts to detect all faces in an image using the Tiny Face Detector.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyFaceDetectorOptions constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
exports.tinyFaceDetector = (input, options) => exports.nets.tinyFaceDetector.locateFaces(input, options);
/**
 * Detects the 68 point face landmark positions of the face shown in an image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
exports.detectFaceLandmarks = (input) => exports.nets.faceLandmark68Net.detectLandmarks(input);
/**
 * Detects the 68 point face landmark positions of the face shown in an image
 * using a tinier version of the 68 point face landmark model, which is slightly
 * faster at inference, but also slightly less accurate.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
exports.detectFaceLandmarksTiny = (input) => exports.nets.faceLandmark68TinyNet.detectLandmarks(input);
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
exports.computeFaceDescriptor = (input) => exports.nets.faceRecognitionNet.computeFaceDescriptor(input);
/**
 * Recognizes the facial expressions from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Facial expressions with corresponding probabilities or array thereof in case of batch input.
 */
exports.recognizeFaceExpressions = (input) => exports.nets.faceExpressionNet.predictExpressions(input);
/**
 * Predicts age and gender from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Predictions with age, gender and gender probability or array thereof in case of batch input.
 */
exports.predictAgeAndGender = (input) => exports.nets.ageGenderNet.predictAgeAndGender(input);
exports.loadTinyFaceDetectorModel = (url) => exports.nets.tinyFaceDetector.load(url);
exports.loadTinyYolov2Model = (url) => exports.nets.tinyYolov2.load(url);
exports.loadFaceLandmarkModel = (url) => exports.nets.faceLandmark68Net.load(url);
exports.loadFaceLandmarkTinyModel = (url) => exports.nets.faceLandmark68TinyNet.load(url);
exports.loadFaceRecognitionModel = (url) => exports.nets.faceRecognitionNet.load(url);
exports.loadFaceExpressionModel = (url) => exports.nets.faceExpressionNet.load(url);
exports.loadAgeGenderModel = (url) => exports.nets.ageGenderNet.load(url);
// backward compatibility
exports.loadFaceDetectionModel = exports.loadTinyFaceDetectorModel;
exports.locateFaces = TinyFaceDetector_1.TinyFaceDetector;
exports.detectLandmarks = exports.detectFaceLandmarks;
//# sourceMappingURL=nets.js.map