export const FACE_EXPRESSION_LABELS = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
export class FaceExpressions {
    constructor(probabilities) {
        if (probabilities.length !== 7) {
            throw new Error(`FaceExpressions.constructor - expected probabilities.length to be 7, have: ${probabilities.length}`);
        }
        FACE_EXPRESSION_LABELS.forEach((expression, idx) => {
            this[expression] = probabilities[idx];
        });
    }
    asSortedArray() {
        return FACE_EXPRESSION_LABELS
            .map(expression => ({ expression, probability: this[expression] }))
            .sort((e0, e1) => e1.probability - e0.probability);
    }
}
//# sourceMappingURL=FaceExpressions.js.map