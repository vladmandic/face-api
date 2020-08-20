"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFaces = void 0;
const FaceDetection_1 = require("../classes/FaceDetection");
const env_1 = require("../env");
const createCanvas_1 = require("./createCanvas");
const getContext2dOrThrow_1 = require("./getContext2dOrThrow");
const imageTensorToCanvas_1 = require("./imageTensorToCanvas");
const toNetInput_1 = require("./toNetInput");
/**
 * Extracts the image regions containing the detected faces.
 *
 * @param input The image that face detection has been performed on.
 * @param detections The face detection results or face bounding boxes for that image.
 * @returns The Canvases of the corresponding image region for each detected face.
 */
async function extractFaces(input, detections) {
    const { Canvas } = env_1.env.getEnv();
    let canvas = input;
    if (!(input instanceof Canvas)) {
        const netInput = await toNetInput_1.toNetInput(input);
        if (netInput.batchSize > 1) {
            throw new Error('extractFaces - batchSize > 1 not supported');
        }
        const tensorOrCanvas = netInput.getInput(0);
        canvas = tensorOrCanvas instanceof Canvas
            ? tensorOrCanvas
            : await imageTensorToCanvas_1.imageTensorToCanvas(tensorOrCanvas);
    }
    const ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvas);
    const boxes = detections.map(det => det instanceof FaceDetection_1.FaceDetection
        ? det.forSize(canvas.width, canvas.height).box.floor()
        : det)
        .map(box => box.clipAtImageBorders(canvas.width, canvas.height));
    return boxes.map(({ x, y, width, height }) => {
        const faceImg = createCanvas_1.createCanvas({ width, height });
        getContext2dOrThrow_1.getContext2dOrThrow(faceImg)
            .putImageData(ctx.getImageData(x, y, width, height), 0, 0);
        return faceImg;
    });
}
exports.extractFaces = extractFaces;
//# sourceMappingURL=extractFaces.js.map