"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonMaxSuppression = void 0;
const iou_1 = require("./iou");
function nonMaxSuppression(boxes, scores, iouThreshold, isIOU = true) {
    let indicesSortedByScore = scores
        .map((score, boxIndex) => ({ score, boxIndex }))
        .sort((c1, c2) => c1.score - c2.score)
        .map(c => c.boxIndex);
    const pick = [];
    while (indicesSortedByScore.length > 0) {
        const curr = indicesSortedByScore.pop();
        pick.push(curr);
        const indices = indicesSortedByScore;
        const outputs = [];
        for (let i = 0; i < indices.length; i++) {
            const idx = indices[i];
            const currBox = boxes[curr];
            const idxBox = boxes[idx];
            outputs.push(iou_1.iou(currBox, idxBox, isIOU));
        }
        indicesSortedByScore = indicesSortedByScore.filter((_, j) => outputs[j] <= iouThreshold);
    }
    return pick;
}
exports.nonMaxSuppression = nonMaxSuppression;
//# sourceMappingURL=nonMaxSuppression.js.map