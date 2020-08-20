"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceLandmarkNet = void 0;
const tslib_1 = require("tslib");
const FaceLandmark68Net_1 = require("./FaceLandmark68Net");
tslib_1.__exportStar(require("./FaceLandmark68Net"), exports);
tslib_1.__exportStar(require("./FaceLandmark68TinyNet"), exports);
class FaceLandmarkNet extends FaceLandmark68Net_1.FaceLandmark68Net {
}
exports.FaceLandmarkNet = FaceLandmarkNet;
//# sourceMappingURL=index.js.map