import { isValidNumber } from '../utils';
import { Box } from './Box';
export class LabeledBox extends Box {
    constructor(box, label) {
        super(box);
        this._label = label;
    }
    static assertIsValidLabeledBox(box, callee) {
        Box.assertIsValidBox(box, callee);
        if (!isValidNumber(box.label)) {
            throw new Error(`${callee} - expected property label (${box.label}) to be a number`);
        }
    }
    get label() { return this._label; }
}
//# sourceMappingURL=LabeledBox.js.map