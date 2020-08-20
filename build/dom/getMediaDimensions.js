"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaDimensions = void 0;
const Dimensions_1 = require("../classes/Dimensions");
const env_1 = require("../env");
function getMediaDimensions(input) {
    const { Image, Video } = env_1.env.getEnv();
    if (input instanceof Image) {
        return new Dimensions_1.Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof Video) {
        return new Dimensions_1.Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions_1.Dimensions(input.width, input.height);
}
exports.getMediaDimensions = getMediaDimensions;
//# sourceMappingURL=getMediaDimensions.js.map