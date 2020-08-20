"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNetWeights = void 0;
const fetchOrThrow_1 = require("./fetchOrThrow");
async function fetchNetWeights(uri) {
    return new Float32Array(await (await fetchOrThrow_1.fetchOrThrow(uri)).arrayBuffer());
}
exports.fetchNetWeights = fetchNetWeights;
//# sourceMappingURL=fetchNetWeights.js.map