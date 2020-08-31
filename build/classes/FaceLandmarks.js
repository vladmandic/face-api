import { minBbox } from '../ops';
import { getCenterPoint } from '../utils';
import { Box } from './Box';
import { Dimensions } from './Dimensions';
import { FaceDetection } from './FaceDetection';
import { Point } from './Point';
import { Rect } from './Rect';
// face alignment constants
const relX = 0.5;
const relY = 0.43;
const relScale = 0.45;
export class FaceLandmarks {
    constructor(relativeFaceLandmarkPositions, imgDims, shift = new Point(0, 0)) {
        const { width, height } = imgDims;
        this._imgDims = new Dimensions(width, height);
        this._shift = shift;
        this._positions = relativeFaceLandmarkPositions.map(pt => pt.mul(new Point(width, height)).add(shift));
    }
    get shift() { return new Point(this._shift.x, this._shift.y); }
    get imageWidth() { return this._imgDims.width; }
    get imageHeight() { return this._imgDims.height; }
    get positions() { return this._positions; }
    get relativePositions() {
        return this._positions.map(pt => pt.sub(this._shift).div(new Point(this.imageWidth, this.imageHeight)));
    }
    forSize(width, height) {
        return new this.constructor(this.relativePositions, { width, height });
    }
    shiftBy(x, y) {
        return new this.constructor(this.relativePositions, this._imgDims, new Point(x, y));
    }
    shiftByPoint(pt) {
        return this.shiftBy(pt.x, pt.y);
    }
    /**
     * Aligns the face landmarks after face detection from the relative positions of the faces
     * bounding box, or it's current shift. This function should be used to align the face images
     * after face detection has been performed, before they are passed to the face recognition net.
     * This will make the computed face descriptor more accurate.
     *
     * @param detection (optional) The bounding box of the face or the face detection result. If
     * no argument was passed the position of the face landmarks are assumed to be relative to
     * it's current shift.
     * @returns The bounding box of the aligned face.
     */
    align(detection, options = {}) {
        if (detection) {
            const box = detection instanceof FaceDetection
                ? detection.box.floor()
                : new Box(detection);
            return this.shiftBy(box.x, box.y).align(null, options);
        }
        const { useDlibAlignment, minBoxPadding } = Object.assign({}, { useDlibAlignment: false, minBoxPadding: 0.2 }, options);
        if (useDlibAlignment) {
            return this.alignDlib();
        }
        return this.alignMinBbox(minBoxPadding);
    }
    alignDlib() {
        const centers = this.getRefPointsForAlignment();
        const [leftEyeCenter, rightEyeCenter, mouthCenter] = centers;
        const distToMouth = (pt) => mouthCenter.sub(pt).magnitude();
        const eyeToMouthDist = (distToMouth(leftEyeCenter) + distToMouth(rightEyeCenter)) / 2;
        const size = Math.floor(eyeToMouthDist / relScale);
        const refPoint = getCenterPoint(centers);
        // TODO: pad in case rectangle is out of image bounds
        const x = Math.floor(Math.max(0, refPoint.x - (relX * size)));
        const y = Math.floor(Math.max(0, refPoint.y - (relY * size)));
        return new Rect(x, y, Math.min(size, this.imageWidth + x), Math.min(size, this.imageHeight + y));
    }
    alignMinBbox(padding) {
        const box = minBbox(this.positions);
        return box.pad(box.width * padding, box.height * padding);
    }
    getRefPointsForAlignment() {
        throw new Error('getRefPointsForAlignment not implemented by base class');
    }
}
//# sourceMappingURL=FaceLandmarks.js.map