"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCanvasFromMedia = exports.createCanvas = void 0;
const env_1 = require("../env");
const getContext2dOrThrow_1 = require("./getContext2dOrThrow");
const getMediaDimensions_1 = require("./getMediaDimensions");
const isMediaLoaded_1 = require("./isMediaLoaded");
function createCanvas({ width, height }) {
    const { createCanvasElement } = env_1.env.getEnv();
    const canvas = createCanvasElement();
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
exports.createCanvas = createCanvas;
function createCanvasFromMedia(media, dims) {
    const { ImageData } = env_1.env.getEnv();
    if (!(media instanceof ImageData) && !isMediaLoaded_1.isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    const { width, height } = dims || getMediaDimensions_1.getMediaDimensions(media);
    const canvas = createCanvas({ width, height });
    if (media instanceof ImageData) {
        getContext2dOrThrow_1.getContext2dOrThrow(canvas).putImageData(media, 0, 0);
    }
    else {
        getContext2dOrThrow_1.getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    }
    return canvas;
}
exports.createCanvasFromMedia = createCanvasFromMedia;
//# sourceMappingURL=createCanvas.js.map