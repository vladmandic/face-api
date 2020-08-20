import { FaceExpressions } from '../faceExpressionNet/FaceExpressions';
export function isWithFaceExpressions(obj) {
    return obj['expressions'] instanceof FaceExpressions;
}
export function extendWithFaceExpressions(sourceObj, expressions) {
    const extension = { expressions };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithFaceExpressions.js.map