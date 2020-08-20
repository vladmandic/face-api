"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSingleFaceAndComputeResult = exports.extractAllFacesAndComputeResults = void 0;
const tf = require("@tensorflow/tfjs-core");
const dom_1 = require("../dom");
const WithFaceLandmarks_1 = require("../factories/WithFaceLandmarks");
async function extractAllFacesAndComputeResults(parentResults, input, computeResults, extractedFaces, getRectForAlignment = ({ alignedRect }) => alignedRect) {
    const faceBoxes = parentResults.map(parentResult => WithFaceLandmarks_1.isWithFaceLandmarks(parentResult)
        ? getRectForAlignment(parentResult)
        : parentResult.detection);
    const faces = extractedFaces || (input instanceof tf.Tensor
        ? await dom_1.extractFaceTensors(input, faceBoxes)
        : await dom_1.extractFaces(input, faceBoxes));
    const results = await computeResults(faces);
    faces.forEach(f => f instanceof tf.Tensor && f.dispose());
    return results;
}
exports.extractAllFacesAndComputeResults = extractAllFacesAndComputeResults;
async function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
    return extractAllFacesAndComputeResults([parentResult], input, async (faces) => computeResult(faces[0]), extractedFaces, getRectForAlignment);
}
exports.extractSingleFaceAndComputeResult = extractSingleFaceAndComputeResult;
//# sourceMappingURL=extractFacesAndComputeResults.js.map