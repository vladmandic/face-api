"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawFaceLandmarks = exports.DrawFaceLandmarks = exports.DrawFaceLandmarksOptions = void 0;
const FaceLandmarks_1 = require("../classes/FaceLandmarks");
const FaceLandmarks68_1 = require("../classes/FaceLandmarks68");
const getContext2dOrThrow_1 = require("../dom/getContext2dOrThrow");
const WithFaceLandmarks_1 = require("../factories/WithFaceLandmarks");
const drawContour_1 = require("./drawContour");
class DrawFaceLandmarksOptions {
    constructor(options = {}) {
        const { drawLines = true, drawPoints = true, lineWidth, lineColor, pointSize, pointColor } = options;
        this.drawLines = drawLines;
        this.drawPoints = drawPoints;
        this.lineWidth = lineWidth || 1;
        this.pointSize = pointSize || 2;
        this.lineColor = lineColor || 'rgba(0, 255, 255, 1)';
        this.pointColor = pointColor || 'rgba(255, 0, 255, 1)';
    }
}
exports.DrawFaceLandmarksOptions = DrawFaceLandmarksOptions;
class DrawFaceLandmarks {
    constructor(faceLandmarks, options = {}) {
        this.faceLandmarks = faceLandmarks;
        this.options = new DrawFaceLandmarksOptions(options);
    }
    draw(canvasArg) {
        const ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvasArg);
        const { drawLines, drawPoints, lineWidth, lineColor, pointSize, pointColor } = this.options;
        if (drawLines && this.faceLandmarks instanceof FaceLandmarks68_1.FaceLandmarks68) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            drawContour_1.drawContour(ctx, this.faceLandmarks.getJawOutline());
            drawContour_1.drawContour(ctx, this.faceLandmarks.getLeftEyeBrow());
            drawContour_1.drawContour(ctx, this.faceLandmarks.getRightEyeBrow());
            drawContour_1.drawContour(ctx, this.faceLandmarks.getNose());
            drawContour_1.drawContour(ctx, this.faceLandmarks.getLeftEye(), true);
            drawContour_1.drawContour(ctx, this.faceLandmarks.getRightEye(), true);
            drawContour_1.drawContour(ctx, this.faceLandmarks.getMouth(), true);
        }
        if (drawPoints) {
            ctx.strokeStyle = pointColor;
            ctx.fillStyle = pointColor;
            const drawPoint = (pt) => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
                ctx.fill();
            };
            this.faceLandmarks.positions.forEach(drawPoint);
        }
    }
}
exports.DrawFaceLandmarks = DrawFaceLandmarks;
function drawFaceLandmarks(canvasArg, faceLandmarks) {
    const faceLandmarksArray = Array.isArray(faceLandmarks) ? faceLandmarks : [faceLandmarks];
    faceLandmarksArray.forEach(f => {
        const landmarks = f instanceof FaceLandmarks_1.FaceLandmarks
            ? f
            : (WithFaceLandmarks_1.isWithFaceLandmarks(f) ? f.landmarks : undefined);
        if (!landmarks) {
            throw new Error('drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof');
        }
        new DrawFaceLandmarks(landmarks).draw(canvasArg);
    });
}
exports.drawFaceLandmarks = drawFaceLandmarks;
//# sourceMappingURL=DrawFaceLandmarks.js.map