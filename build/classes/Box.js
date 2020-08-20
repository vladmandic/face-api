"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const utils_1 = require("../utils");
const Point_1 = require("./Point");
class Box {
    constructor(_box, allowNegativeDimensions = true) {
        const box = (_box || {});
        const isBbox = [box.left, box.top, box.right, box.bottom].every(utils_1.isValidNumber);
        const isRect = [box.x, box.y, box.width, box.height].every(utils_1.isValidNumber);
        if (!isRect && !isBbox) {
            throw new Error(`Box.constructor - expected box to be IBoundingBox | IRect, instead have ${JSON.stringify(box)}`);
        }
        const [x, y, width, height] = isRect
            ? [box.x, box.y, box.width, box.height]
            : [box.left, box.top, box.right - box.left, box.bottom - box.top];
        Box.assertIsValidBox({ x, y, width, height }, 'Box.constructor', allowNegativeDimensions);
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    static isRect(rect) {
        return !!rect && [rect.x, rect.y, rect.width, rect.height].every(utils_1.isValidNumber);
    }
    static assertIsValidBox(box, callee, allowNegativeDimensions = false) {
        if (!Box.isRect(box)) {
            throw new Error(`${callee} - invalid box: ${JSON.stringify(box)}, expected object with properties x, y, width, height`);
        }
        if (!allowNegativeDimensions && (box.width < 0 || box.height < 0)) {
            throw new Error(`${callee} - width (${box.width}) and height (${box.height}) must be positive numbers`);
        }
    }
    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this.x; }
    get top() { return this.y; }
    get right() { return this.x + this.width; }
    get bottom() { return this.y + this.height; }
    get area() { return this.width * this.height; }
    get topLeft() { return new Point_1.Point(this.left, this.top); }
    get topRight() { return new Point_1.Point(this.right, this.top); }
    get bottomLeft() { return new Point_1.Point(this.left, this.bottom); }
    get bottomRight() { return new Point_1.Point(this.right, this.bottom); }
    round() {
        const [x, y, width, height] = [this.x, this.y, this.width, this.height]
            .map(val => Math.round(val));
        return new Box({ x, y, width, height });
    }
    floor() {
        const [x, y, width, height] = [this.x, this.y, this.width, this.height]
            .map(val => Math.floor(val));
        return new Box({ x, y, width, height });
    }
    toSquare() {
        let { x, y, width, height } = this;
        const diff = Math.abs(width - height);
        if (width < height) {
            x -= (diff / 2);
            width += diff;
        }
        if (height < width) {
            y -= (diff / 2);
            height += diff;
        }
        return new Box({ x, y, width, height });
    }
    rescale(s) {
        const scaleX = utils_1.isDimensions(s) ? s.width : s;
        const scaleY = utils_1.isDimensions(s) ? s.height : s;
        return new Box({
            x: this.x * scaleX,
            y: this.y * scaleY,
            width: this.width * scaleX,
            height: this.height * scaleY
        });
    }
    pad(padX, padY) {
        let [x, y, width, height] = [
            this.x - (padX / 2),
            this.y - (padY / 2),
            this.width + padX,
            this.height + padY
        ];
        return new Box({ x, y, width, height });
    }
    clipAtImageBorders(imgWidth, imgHeight) {
        const { x, y, right, bottom } = this;
        const clippedX = Math.max(x, 0);
        const clippedY = Math.max(y, 0);
        const newWidth = right - clippedX;
        const newHeight = bottom - clippedY;
        const clippedWidth = Math.min(newWidth, imgWidth - clippedX);
        const clippedHeight = Math.min(newHeight, imgHeight - clippedY);
        return (new Box({ x: clippedX, y: clippedY, width: clippedWidth, height: clippedHeight })).floor();
    }
    shift(sx, sy) {
        const { width, height } = this;
        const x = this.x + sx;
        const y = this.y + sy;
        return new Box({ x, y, width, height });
    }
    padAtBorders(imageHeight, imageWidth) {
        const w = this.width + 1;
        const h = this.height + 1;
        let dx = 1;
        let dy = 1;
        let edx = w;
        let edy = h;
        let x = this.left;
        let y = this.top;
        let ex = this.right;
        let ey = this.bottom;
        if (ex > imageWidth) {
            edx = -ex + imageWidth + w;
            ex = imageWidth;
        }
        if (ey > imageHeight) {
            edy = -ey + imageHeight + h;
            ey = imageHeight;
        }
        if (x < 1) {
            edy = 2 - x;
            x = 1;
        }
        if (y < 1) {
            edy = 2 - y;
            y = 1;
        }
        return { dy, edy, dx, edx, y, ey, x, ex, w, h };
    }
    calibrate(region) {
        return new Box({
            left: this.left + (region.left * this.width),
            top: this.top + (region.top * this.height),
            right: this.right + (region.right * this.width),
            bottom: this.bottom + (region.bottom * this.height)
        }).toSquare().round();
    }
}
exports.Box = Box;
//# sourceMappingURL=Box.js.map