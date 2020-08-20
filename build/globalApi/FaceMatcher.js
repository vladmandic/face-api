"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceMatcher = void 0;
const FaceMatch_1 = require("../classes/FaceMatch");
const LabeledFaceDescriptors_1 = require("../classes/LabeledFaceDescriptors");
const euclideanDistance_1 = require("../euclideanDistance");
class FaceMatcher {
    constructor(inputs, distanceThreshold = 0.6) {
        this._distanceThreshold = distanceThreshold;
        const inputArray = Array.isArray(inputs) ? inputs : [inputs];
        if (!inputArray.length) {
            throw new Error(`FaceRecognizer.constructor - expected atleast one input`);
        }
        let count = 1;
        const createUniqueLabel = () => `person ${count++}`;
        this._labeledDescriptors = inputArray.map((desc) => {
            if (desc instanceof LabeledFaceDescriptors_1.LabeledFaceDescriptors) {
                return desc;
            }
            if (desc instanceof Float32Array) {
                return new LabeledFaceDescriptors_1.LabeledFaceDescriptors(createUniqueLabel(), [desc]);
            }
            if (desc.descriptor && desc.descriptor instanceof Float32Array) {
                return new LabeledFaceDescriptors_1.LabeledFaceDescriptors(createUniqueLabel(), [desc.descriptor]);
            }
            throw new Error(`FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>`);
        });
    }
    get labeledDescriptors() { return this._labeledDescriptors; }
    get distanceThreshold() { return this._distanceThreshold; }
    computeMeanDistance(queryDescriptor, descriptors) {
        return descriptors
            .map(d => euclideanDistance_1.euclideanDistance(d, queryDescriptor))
            .reduce((d1, d2) => d1 + d2, 0)
            / (descriptors.length || 1);
    }
    matchDescriptor(queryDescriptor) {
        return this.labeledDescriptors
            .map(({ descriptors, label }) => new FaceMatch_1.FaceMatch(label, this.computeMeanDistance(queryDescriptor, descriptors)))
            .reduce((best, curr) => best.distance < curr.distance ? best : curr);
    }
    findBestMatch(queryDescriptor) {
        const bestMatch = this.matchDescriptor(queryDescriptor);
        return bestMatch.distance < this.distanceThreshold
            ? bestMatch
            : new FaceMatch_1.FaceMatch('unknown', bestMatch.distance);
    }
    toJSON() {
        return {
            distanceThreshold: this.distanceThreshold,
            labeledDescriptors: this.labeledDescriptors.map((ld) => ld.toJSON())
        };
    }
    static fromJSON(json) {
        const labeledDescriptors = json.labeledDescriptors
            .map((ld) => LabeledFaceDescriptors_1.LabeledFaceDescriptors.fromJSON(ld));
        return new FaceMatcher(labeledDescriptors, json.distanceThreshold);
    }
}
exports.FaceMatcher = FaceMatcher;
//# sourceMappingURL=FaceMatcher.js.map