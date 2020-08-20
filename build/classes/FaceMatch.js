"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceMatch = void 0;
const utils_1 = require("../utils");
class FaceMatch {
    constructor(label, distance) {
        this._label = label;
        this._distance = distance;
    }
    get label() { return this._label; }
    get distance() { return this._distance; }
    toString(withDistance = true) {
        return `${this.label}${withDistance ? ` (${utils_1.round(this.distance)})` : ''}`;
    }
}
exports.FaceMatch = FaceMatch;
//# sourceMappingURL=FaceMatch.js.map