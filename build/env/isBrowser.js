"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = void 0;
function isBrowser() {
    return typeof window === 'object'
        && typeof document !== 'undefined'
        && typeof HTMLImageElement !== 'undefined'
        && typeof HTMLCanvasElement !== 'undefined'
        && typeof HTMLVideoElement !== 'undefined'
        && typeof ImageData !== 'undefined'
        && typeof CanvasRenderingContext2D !== 'undefined';
}
exports.isBrowser = isBrowser;
//# sourceMappingURL=isBrowser.js.map