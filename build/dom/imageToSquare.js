"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToSquare = void 0;
const env_1 = require("../env");
const createCanvas_1 = require("./createCanvas");
const getContext2dOrThrow_1 = require("./getContext2dOrThrow");
const getMediaDimensions_1 = require("./getMediaDimensions");
function imageToSquare(input, inputSize, centerImage = false) {
    const { Image, Canvas } = env_1.env.getEnv();
    if (!(input instanceof Image || input instanceof Canvas)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    const dims = getMediaDimensions_1.getMediaDimensions(input);
    const scale = inputSize / Math.max(dims.height, dims.width);
    const width = scale * dims.width;
    const height = scale * dims.height;
    const targetCanvas = createCanvas_1.createCanvas({ width: inputSize, height: inputSize });
    const inputCanvas = input instanceof Canvas ? input : createCanvas_1.createCanvasFromMedia(input);
    const offset = Math.abs(width - height) / 2;
    const dx = centerImage && width < height ? offset : 0;
    const dy = centerImage && height < width ? offset : 0;
    getContext2dOrThrow_1.getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
    return targetCanvas;
}
exports.imageToSquare = imageToSquare;
//# sourceMappingURL=imageToSquare.js.map