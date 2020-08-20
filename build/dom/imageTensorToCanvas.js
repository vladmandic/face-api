"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTensorToCanvas = void 0;
const tf = require("@tensorflow/tfjs-core");
const env_1 = require("../env");
const utils_1 = require("../utils");
async function imageTensorToCanvas(imgTensor, canvas) {
    const targetCanvas = canvas || env_1.env.getEnv().createCanvasElement();
    const [height, width, numChannels] = imgTensor.shape.slice(utils_1.isTensor4D(imgTensor) ? 1 : 0);
    const imgTensor3D = tf.tidy(() => imgTensor.as3D(height, width, numChannels).toInt());
    await tf.browser.toPixels(imgTensor3D, targetCanvas);
    imgTensor3D.dispose();
    return targetCanvas;
}
exports.imageTensorToCanvas = imageTensorToCanvas;
//# sourceMappingURL=imageTensorToCanvas.js.map