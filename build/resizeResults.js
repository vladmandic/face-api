"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeResults = void 0;
const classes_1 = require("./classes");
const FaceDetection_1 = require("./classes/FaceDetection");
const FaceLandmarks_1 = require("./classes/FaceLandmarks");
const WithFaceDetection_1 = require("./factories/WithFaceDetection");
const WithFaceLandmarks_1 = require("./factories/WithFaceLandmarks");
function resizeResults(results, dimensions) {
    const { width, height } = new classes_1.Dimensions(dimensions.width, dimensions.height);
    if (width <= 0 || height <= 0) {
        throw new Error(`resizeResults - invalid dimensions: ${JSON.stringify({ width, height })}`);
    }
    if (Array.isArray(results)) {
        return results.map(obj => resizeResults(obj, { width, height }));
    }
    if (WithFaceLandmarks_1.isWithFaceLandmarks(results)) {
        const resizedDetection = results.detection.forSize(width, height);
        const resizedLandmarks = results.unshiftedLandmarks.forSize(resizedDetection.box.width, resizedDetection.box.height);
        return WithFaceLandmarks_1.extendWithFaceLandmarks(WithFaceDetection_1.extendWithFaceDetection(results, resizedDetection), resizedLandmarks);
    }
    if (WithFaceDetection_1.isWithFaceDetection(results)) {
        return WithFaceDetection_1.extendWithFaceDetection(results, results.detection.forSize(width, height));
    }
    if (results instanceof FaceLandmarks_1.FaceLandmarks || results instanceof FaceDetection_1.FaceDetection) {
        return results.forSize(width, height);
    }
    return results;
}
exports.resizeResults = resizeResults;
//# sourceMappingURL=resizeResults.js.map