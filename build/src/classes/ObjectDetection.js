import { Box } from './Box';
import { Dimensions } from './Dimensions';
export class ObjectDetection {
    constructor(score, classScore, className, relativeBox, imageDims) {
        this._imageDims = new Dimensions(imageDims.width, imageDims.height);
        this._score = score;
        this._classScore = classScore;
        this._className = className;
        this._box = new Box(relativeBox).rescale(this._imageDims);
    }
    get score() { return this._score; }
    get classScore() { return this._classScore; }
    get className() { return this._className; }
    get box() { return this._box; }
    get imageDims() { return this._imageDims; }
    get imageWidth() { return this.imageDims.width; }
    get imageHeight() { return this.imageDims.height; }
    get relativeBox() { return new Box(this._box).rescale(this.imageDims.reverse()); }
    forSize(width, height) {
        return new ObjectDetection(this.score, this.classScore, this.className, this.relativeBox, { width, height });
    }
}
//# sourceMappingURL=ObjectDetection.js.map