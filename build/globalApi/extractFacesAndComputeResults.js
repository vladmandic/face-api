import * as tf from '@tensorflow/tfjs-core';
import { extractFaces, extractFaceTensors } from '../dom';
import { isWithFaceLandmarks } from '../factories/WithFaceLandmarks';
export async function extractAllFacesAndComputeResults(parentResults, input, computeResults, extractedFaces, getRectForAlignment = ({ alignedRect }) => alignedRect) {
    const faceBoxes = parentResults.map(parentResult => isWithFaceLandmarks(parentResult)
        ? getRectForAlignment(parentResult)
        : parentResult.detection);
    const faces = extractedFaces || (input instanceof tf.Tensor
        ? await extractFaceTensors(input, faceBoxes)
        : await extractFaces(input, faceBoxes));
    const results = await computeResults(faces);
    faces.forEach(f => f instanceof tf.Tensor && f.dispose());
    return results;
}
export async function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
    return extractAllFacesAndComputeResults([parentResult], input, async (faces) => computeResult(faces[0]), extractedFaces, getRectForAlignment);
}
//# sourceMappingURL=extractFacesAndComputeResults.js.map