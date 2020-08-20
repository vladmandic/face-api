import { isValidProbablitiy } from '../utils';
import { LabeledBox } from './LabeledBox';
export class PredictedBox extends LabeledBox {
    constructor(box, label, score, classScore) {
        super(box, label);
        this._score = score;
        this._classScore = classScore;
    }
    static assertIsValidPredictedBox(box, callee) {
        LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!isValidProbablitiy(box.score)
            || !isValidProbablitiy(box.classScore)) {
            throw new Error(`${callee} - expected properties score (${box.score}) and (${box.classScore}) to be a number between [0, 1]`);
        }
    }
    get score() { return this._score; }
    get classScore() { return this._classScore; }
}
//# sourceMappingURL=PredictedBox.js.map