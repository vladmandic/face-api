"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawFaceExpressions = void 0;
const classes_1 = require("../classes");
const faceExpressionNet_1 = require("../faceExpressionNet");
const WithFaceDetection_1 = require("../factories/WithFaceDetection");
const WithFaceExpressions_1 = require("../factories/WithFaceExpressions");
const utils_1 = require("../utils");
const DrawTextField_1 = require("./DrawTextField");
function drawFaceExpressions(canvasArg, faceExpressions, minConfidence = 0.1, textFieldAnchor) {
    const faceExpressionsArray = Array.isArray(faceExpressions) ? faceExpressions : [faceExpressions];
    faceExpressionsArray.forEach(e => {
        const expr = e instanceof faceExpressionNet_1.FaceExpressions
            ? e
            : (WithFaceExpressions_1.isWithFaceExpressions(e) ? e.expressions : undefined);
        if (!expr) {
            throw new Error('drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof');
        }
        const sorted = expr.asSortedArray();
        const resultsToDisplay = sorted.filter(expr => expr.probability > minConfidence);
        const anchor = WithFaceDetection_1.isWithFaceDetection(e)
            ? e.detection.box.bottomLeft
            : (textFieldAnchor || new classes_1.Point(0, 0));
        const drawTextField = new DrawTextField_1.DrawTextField(resultsToDisplay.map(expr => `${expr.expression} (${utils_1.round(expr.probability)})`), anchor);
        drawTextField.draw(canvasArg);
    });
}
exports.drawFaceExpressions = drawFaceExpressions;
//# sourceMappingURL=drawFaceExpressions.js.map