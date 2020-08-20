"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabeledBox = void 0;
const utils_1 = require("../utils");
const Box_1 = require("./Box");
class LabeledBox extends Box_1.Box {
    constructor(box, label) {
        super(box);
        this._label = label;
    }
    static assertIsValidLabeledBox(box, callee) {
        Box_1.Box.assertIsValidBox(box, callee);
        if (!utils_1.isValidNumber(box.label)) {
            throw new Error(`${callee} - expected property label (${box.label}) to be a number`);
        }
    }
    get label() { return this._label; }
}
exports.LabeledBox = LabeledBox;
//# sourceMappingURL=LabeledBox.js.map