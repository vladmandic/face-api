"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceExpressions = exports.FACE_EXPRESSION_LABELS = void 0;
exports.FACE_EXPRESSION_LABELS = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
class FaceExpressions {
    constructor(probabilities) {
        if (probabilities.length !== 7) {
            throw new Error(`FaceExpressions.constructor - expected probabilities.length to be 7, have: ${probabilities.length}`);
        }
        exports.FACE_EXPRESSION_LABELS.forEach((expression, idx) => {
            this[expression] = probabilities[idx];
        });
    }
    asSortedArray() {
        return exports.FACE_EXPRESSION_LABELS
            .map(expression => ({ expression, probability: this[expression] }))
            .sort((e0, e1) => e1.probability - e0.probability);
    }
}
exports.FaceExpressions = FaceExpressions;
//# sourceMappingURL=FaceExpressions.js.map