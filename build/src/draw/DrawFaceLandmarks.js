import { FaceLandmarks } from '../classes/FaceLandmarks';
import { FaceLandmarks68 } from '../classes/FaceLandmarks68';
import { getContext2dOrThrow } from '../dom/getContext2dOrThrow';
import { isWithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { drawContour } from './drawContour';
export class DrawFaceLandmarksOptions {
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
export class DrawFaceLandmarks {
    constructor(faceLandmarks, options = {}) {
        this.faceLandmarks = faceLandmarks;
        this.options = new DrawFaceLandmarksOptions(options);
    }
    draw(canvasArg) {
        const ctx = getContext2dOrThrow(canvasArg);
        const { drawLines, drawPoints, lineWidth, lineColor, pointSize, pointColor } = this.options;
        if (drawLines && this.faceLandmarks instanceof FaceLandmarks68) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            drawContour(ctx, this.faceLandmarks.getJawOutline());
            drawContour(ctx, this.faceLandmarks.getLeftEyeBrow());
            drawContour(ctx, this.faceLandmarks.getRightEyeBrow());
            drawContour(ctx, this.faceLandmarks.getNose());
            drawContour(ctx, this.faceLandmarks.getLeftEye(), true);
            drawContour(ctx, this.faceLandmarks.getRightEye(), true);
            drawContour(ctx, this.faceLandmarks.getMouth(), true);
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
export function drawFaceLandmarks(canvasArg, faceLandmarks) {
    const faceLandmarksArray = Array.isArray(faceLandmarks) ? faceLandmarks : [faceLandmarks];
    faceLandmarksArray.forEach(f => {
        const landmarks = f instanceof FaceLandmarks
            ? f
            : (isWithFaceLandmarks(f) ? f.landmarks : undefined);
        if (!landmarks) {
            throw new Error('drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof');
        }
        new DrawFaceLandmarks(landmarks).draw(canvasArg);
    });
}
//# sourceMappingURL=DrawFaceLandmarks.js.map