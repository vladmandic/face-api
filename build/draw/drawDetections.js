"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawDetections = void 0;
const classes_1 = require("../classes");
const FaceDetection_1 = require("../classes/FaceDetection");
const WithFaceDetection_1 = require("../factories/WithFaceDetection");
const utils_1 = require("../utils");
const DrawBox_1 = require("./DrawBox");
function drawDetections(canvasArg, detections) {
    const detectionsArray = Array.isArray(detections) ? detections : [detections];
    detectionsArray.forEach(det => {
        const score = det instanceof FaceDetection_1.FaceDetection
            ? det.score
            : (WithFaceDetection_1.isWithFaceDetection(det) ? det.detection.score : undefined);
        const box = det instanceof FaceDetection_1.FaceDetection
            ? det.box
            : (WithFaceDetection_1.isWithFaceDetection(det) ? det.detection.box : new classes_1.Box(det));
        const label = score ? `${utils_1.round(score)}` : undefined;
        new DrawBox_1.DrawBox(box, { label }).draw(canvasArg);
    });
}
exports.drawDetections = drawDetections;
//# sourceMappingURL=drawDetections.js.map