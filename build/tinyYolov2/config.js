"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const isNumber = (arg) => typeof arg === 'number';
function validateConfig(config) {
    if (!config) {
        throw new Error(`invalid config: ${config}`);
    }
    if (typeof config.withSeparableConvs !== 'boolean') {
        throw new Error(`config.withSeparableConvs has to be a boolean, have: ${config.withSeparableConvs}`);
    }
    if (!isNumber(config.iouThreshold) || config.iouThreshold < 0 || config.iouThreshold > 1.0) {
        throw new Error(`config.iouThreshold has to be a number between [0, 1], have: ${config.iouThreshold}`);
    }
    if (!Array.isArray(config.classes)
        || !config.classes.length
        || !config.classes.every((c) => typeof c === 'string')) {
        throw new Error(`config.classes has to be an array class names: string[], have: ${JSON.stringify(config.classes)}`);
    }
    if (!Array.isArray(config.anchors)
        || !config.anchors.length
        || !config.anchors.map((a) => a || {}).every((a) => isNumber(a.x) && isNumber(a.y))) {
        throw new Error(`config.anchors has to be an array of { x: number, y: number }, have: ${JSON.stringify(config.anchors)}`);
    }
    if (config.meanRgb && (!Array.isArray(config.meanRgb)
        || config.meanRgb.length !== 3
        || !config.meanRgb.every(isNumber))) {
        throw new Error(`config.meanRgb has to be an array of shape [number, number, number], have: ${JSON.stringify(config.meanRgb)}`);
    }
}
exports.validateConfig = validateConfig;
//# sourceMappingURL=config.js.map