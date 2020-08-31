import { iou } from './iou';
export function nonMaxSuppression(boxes, scores, iouThreshold, isIOU = true) {
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
            outputs.push(iou(currBox, idxBox, isIOU));
        }
        indicesSortedByScore = indicesSortedByScore.filter((_, j) => outputs[j] <= iouThreshold);
    }
    return pick;
}
//# sourceMappingURL=nonMaxSuppression.js.map