"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaceRecognitionNet = void 0;
const tslib_1 = require("tslib");
const FaceRecognitionNet_1 = require("./FaceRecognitionNet");
tslib_1.__exportStar(require("./FaceRecognitionNet"), exports);
function createFaceRecognitionNet(weights) {
    const net = new FaceRecognitionNet_1.FaceRecognitionNet();
    net.extractWeights(weights);
    return net;
}
exports.createFaceRecognitionNet = createFaceRecognitionNet;
//# sourceMappingURL=index.js.map