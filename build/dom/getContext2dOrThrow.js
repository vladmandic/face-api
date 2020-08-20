"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext2dOrThrow = void 0;
const env_1 = require("../env");
const resolveInput_1 = require("./resolveInput");
function getContext2dOrThrow(canvasArg) {
    const { Canvas, CanvasRenderingContext2D } = env_1.env.getEnv();
    if (canvasArg instanceof CanvasRenderingContext2D) {
        return canvasArg;
    }
    const canvas = resolveInput_1.resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('resolveContext2d - expected canvas to be of instance of Canvas');
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('resolveContext2d - canvas 2d context is null');
    }
    return ctx;
}
exports.getContext2dOrThrow = getContext2dOrThrow;
//# sourceMappingURL=getContext2dOrThrow.js.map