import { FaceMatch } from '../classes/FaceMatch';
import { LabeledFaceDescriptors } from '../classes/LabeledFaceDescriptors';
import { euclideanDistance } from '../euclideanDistance';
export class FaceMatcher {
    constructor(inputs, distanceThreshold = 0.6) {
        this._distanceThreshold = distanceThreshold;
        const inputArray = Array.isArray(inputs) ? inputs : [inputs];
        if (!inputArray.length) {
            throw new Error(`FaceRecognizer.constructor - expected atleast one input`);
        }
        let count = 1;
        const createUniqueLabel = () => `person ${count++}`;
        this._labeledDescriptors = inputArray.map((desc) => {
            if (desc instanceof LabeledFaceDescriptors) {
                return desc;
            }
            if (desc instanceof Float32Array) {
                return new LabeledFaceDescriptors(createUniqueLabel(), [desc]);
            }
            if (desc.descriptor && desc.descriptor instanceof Float32Array) {
                return new LabeledFaceDescriptors(createUniqueLabel(), [desc.descriptor]);
            }
            throw new Error(`FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>`);
        });
    }
    get labeledDescriptors() { return this._labeledDescriptors; }
    get distanceThreshold() { return this._distanceThreshold; }
    computeMeanDistance(queryDescriptor, descriptors) {
        return descriptors
            .map(d => euclideanDistance(d, queryDescriptor))
            .reduce((d1, d2) => d1 + d2, 0)
            / (descriptors.length || 1);
    }
    matchDescriptor(queryDescriptor) {
        return this.labeledDescriptors
            .map(({ descriptors, label }) => new FaceMatch(label, this.computeMeanDistance(queryDescriptor, descriptors)))
            .reduce((best, curr) => best.distance < curr.distance ? best : curr);
    }
    findBestMatch(queryDescriptor) {
        const bestMatch = this.matchDescriptor(queryDescriptor);
        return bestMatch.distance < this.distanceThreshold
            ? bestMatch
            : new FaceMatch('unknown', bestMatch.distance);
    }
    toJSON() {
        return {
            distanceThreshold: this.distanceThreshold,
            labeledDescriptors: this.labeledDescriptors.map((ld) => ld.toJSON())
        };
    }
    static fromJSON(json) {
        const labeledDescriptors = json.labeledDescriptors
            .map((ld) => LabeledFaceDescriptors.fromJSON(ld));
        return new FaceMatcher(labeledDescriptors, json.distanceThreshold);
    }
}
//# sourceMappingURL=FaceMatcher.js.map