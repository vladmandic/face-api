"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minBbox = void 0;
const classes_1 = require("../classes");
function minBbox(pts) {
    const xs = pts.map(pt => pt.x);
    const ys = pts.map(pt => pt.y);
    const minX = xs.reduce((min, x) => x < min ? x : min, Infinity);
    const minY = ys.reduce((min, y) => y < min ? y : min, Infinity);
    const maxX = xs.reduce((max, x) => max < x ? x : max, 0);
    const maxY = ys.reduce((max, y) => max < y ? y : max, 0);
    return new classes_1.BoundingBox(minX, minY, maxX, maxY);
}
exports.minBbox = minBbox;
//# sourceMappingURL=minBbox.js.map