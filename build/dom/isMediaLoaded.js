"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMediaLoaded = void 0;
const env_1 = require("../env");
function isMediaLoaded(media) {
    const { Image, Video } = env_1.env.getEnv();
    return (media instanceof Image && media.complete)
        || (media instanceof Video && media.readyState >= 3);
}
exports.isMediaLoaded = isMediaLoaded;
//# sourceMappingURL=isMediaLoaded.js.map