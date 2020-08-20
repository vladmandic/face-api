"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const Box_1 = require("./Box");
class Rect extends Box_1.Box {
    constructor(x, y, width, height, allowNegativeDimensions = false) {
        super({ x, y, width, height }, allowNegativeDimensions);
    }
}
exports.Rect = Rect;
//# sourceMappingURL=Rect.js.map