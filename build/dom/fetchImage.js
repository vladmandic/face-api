"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchImage = void 0;
const bufferToImage_1 = require("./bufferToImage");
const fetchOrThrow_1 = require("./fetchOrThrow");
async function fetchImage(uri) {
    const res = await fetchOrThrow_1.fetchOrThrow(uri);
    const blob = await (res).blob();
    if (!blob.type.startsWith('image/')) {
        throw new Error(`fetchImage - expected blob type to be of type image/*, instead have: ${blob.type}, for url: ${res.url}`);
    }
    return bufferToImage_1.bufferToImage(blob);
}
exports.fetchImage = fetchImage;
//# sourceMappingURL=fetchImage.js.map