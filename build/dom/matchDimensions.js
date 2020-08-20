"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchDimensions = void 0;
const getMediaDimensions_1 = require("./getMediaDimensions");
function matchDimensions(input, reference, useMediaDimensions = false) {
    const { width, height } = useMediaDimensions
        ? getMediaDimensions_1.getMediaDimensions(reference)
        : reference;
    input.width = width;
    input.height = height;
    return { width, height };
}
exports.matchDimensions = matchDimensions;
//# sourceMappingURL=matchDimensions.js.map