"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingBox = void 0;
const Box_1 = require("./Box");
class BoundingBox extends Box_1.Box {
    constructor(left, top, right, bottom, allowNegativeDimensions = false) {
        super({ left, top, right, bottom }, allowNegativeDimensions);
    }
}
exports.BoundingBox = BoundingBox;
//# sourceMappingURL=BoundingBox.js.map