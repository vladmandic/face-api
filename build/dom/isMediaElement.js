"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMediaElement = void 0;
const env_1 = require("../env");
function isMediaElement(input) {
    const { Image, Canvas, Video } = env_1.env.getEnv();
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
exports.isMediaElement = isMediaElement;
//# sourceMappingURL=isMediaElement.js.map