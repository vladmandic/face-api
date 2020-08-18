import { isValidNumber } from '../utils';
export class Dimensions {
    constructor(width, height) {
        if (!isValidNumber(width) || !isValidNumber(height)) {
            throw new Error(`Dimensions.constructor - expected width and height to be valid numbers, instead have ${JSON.stringify({ width, height })}`);
        }
        this._width = width;
        this._height = height;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    reverse() {
        return new Dimensions(1 / this.width, 1 / this.height);
    }
}
//# sourceMappingURL=Dimensions.js.map