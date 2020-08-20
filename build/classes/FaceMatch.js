import { round } from '../utils';
export class FaceMatch {
    constructor(label, distance) {
        this._label = label;
        this._distance = distance;
    }
    get label() { return this._label; }
    get distance() { return this._distance; }
    toString(withDistance = true) {
        return `${this.label}${withDistance ? ` (${round(this.distance)})` : ''}`;
    }
}
//# sourceMappingURL=FaceMatch.js.map