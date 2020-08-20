"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabeledFaceDescriptors = void 0;
class LabeledFaceDescriptors {
    constructor(label, descriptors) {
        if (!(typeof label === 'string')) {
            throw new Error('LabeledFaceDescriptors - constructor expected label to be a string');
        }
        if (!Array.isArray(descriptors) || descriptors.some(desc => !(desc instanceof Float32Array))) {
            throw new Error('LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array');
        }
        this._label = label;
        this._descriptors = descriptors;
    }
    get label() { return this._label; }
    get descriptors() { return this._descriptors; }
    toJSON() {
        return {
            label: this.label,
            descriptors: this.descriptors.map((d) => Array.from(d))
        };
    }
    static fromJSON(json) {
        const descriptors = json.descriptors.map((d) => {
            return new Float32Array(d);
        });
        return new LabeledFaceDescriptors(json.label, descriptors);
    }
}
exports.LabeledFaceDescriptors = LabeledFaceDescriptors;
//# sourceMappingURL=LabeledFaceDescriptors.js.map