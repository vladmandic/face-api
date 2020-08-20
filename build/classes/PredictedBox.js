"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictedBox = void 0;
const utils_1 = require("../utils");
const LabeledBox_1 = require("./LabeledBox");
class PredictedBox extends LabeledBox_1.LabeledBox {
    constructor(box, label, score, classScore) {
        super(box, label);
        this._score = score;
        this._classScore = classScore;
    }
    static assertIsValidPredictedBox(box, callee) {
        LabeledBox_1.LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!utils_1.isValidProbablitiy(box.score)
            || !utils_1.isValidProbablitiy(box.classScore)) {
            throw new Error(`${callee} - expected properties score (${box.score}) and (${box.classScore}) to be a number between [0, 1]`);
        }
    }
    get score() { return this._score; }
    get classScore() { return this._classScore; }
}
exports.PredictedBox = PredictedBox;
//# sourceMappingURL=PredictedBox.js.map