import { Point } from '../classes';
import { FaceExpressions } from '../faceExpressionNet';
import { isWithFaceDetection } from '../factories/WithFaceDetection';
import { isWithFaceExpressions } from '../factories/WithFaceExpressions';
import { round } from '../utils';
import { DrawTextField } from './DrawTextField';
export function drawFaceExpressions(canvasArg, faceExpressions, minConfidence = 0.1, textFieldAnchor) {
    const faceExpressionsArray = Array.isArray(faceExpressions) ? faceExpressions : [faceExpressions];
    faceExpressionsArray.forEach(e => {
        const expr = e instanceof FaceExpressions
            ? e
            : (isWithFaceExpressions(e) ? e.expressions : undefined);
        if (!expr) {
            throw new Error('drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof');
        }
        const sorted = expr.asSortedArray();
        const resultsToDisplay = sorted.filter(expr => expr.probability > minConfidence);
        const anchor = isWithFaceDetection(e)
            ? e.detection.box.bottomLeft
            : (textFieldAnchor || new Point(0, 0));
        const drawTextField = new DrawTextField(resultsToDisplay.map(expr => `${expr.expression} (${round(expr.probability)})`), anchor);
        drawTextField.draw(canvasArg);
    });
}
//# sourceMappingURL=drawFaceExpressions.js.map