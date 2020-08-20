"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimensions = void 0;
const utils_1 = require("../utils");
class Dimensions {
    constructor(width, height) {
        if (!utils_1.isValidNumber(width) || !utils_1.isValidNumber(height)) {
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
exports.Dimensions = Dimensions;
//# sourceMappingURL=Dimensions.js.map