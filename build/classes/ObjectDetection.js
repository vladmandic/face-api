"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectDetection = void 0;
const Box_1 = require("./Box");
const Dimensions_1 = require("./Dimensions");
class ObjectDetection {
    constructor(score, classScore, className, relativeBox, imageDims) {
        this._imageDims = new Dimensions_1.Dimensions(imageDims.width, imageDims.height);
        this._score = score;
        this._classScore = classScore;
        this._className = className;
        this._box = new Box_1.Box(relativeBox).rescale(this._imageDims);
    }
    get score() { return this._score; }
    get classScore() { return this._classScore; }
    get className() { return this._className; }
    get box() { return this._box; }
    get imageDims() { return this._imageDims; }
    get imageWidth() { return this.imageDims.width; }
    get imageHeight() { return this.imageDims.height; }
    get relativeBox() { return new Box_1.Box(this._box).rescale(this.imageDims.reverse()); }
    forSize(width, height) {
        return new ObjectDetection(this.score, this.classScore, this.className, this.relativeBox, { width, height });
    }
}
exports.ObjectDetection = ObjectDetection;
//# sourceMappingURL=ObjectDetection.js.map