"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceLandmarks5 = void 0;
const utils_1 = require("../utils");
const FaceLandmarks_1 = require("./FaceLandmarks");
class FaceLandmarks5 extends FaceLandmarks_1.FaceLandmarks {
    getRefPointsForAlignment() {
        const pts = this.positions;
        return [
            pts[0],
            pts[1],
            utils_1.getCenterPoint([pts[3], pts[4]])
        ];
    }
}
exports.FaceLandmarks5 = FaceLandmarks5;
//# sourceMappingURL=FaceLandmarks5.js.map