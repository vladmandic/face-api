"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawContour = void 0;
function drawContour(ctx, points, isClosed = false) {
    ctx.beginPath();
    points.slice(1).forEach(({ x, y }, prevIdx) => {
        const from = points[prevIdx];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
    });
    if (isClosed) {
        const from = points[points.length - 1];
        const to = points[0];
        if (!from || !to) {
            return;
        }
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
    }
    ctx.stroke();
}
exports.drawContour = drawContour;
//# sourceMappingURL=drawContour.js.map