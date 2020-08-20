"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWeightMap = void 0;
const tf = require("@tensorflow/tfjs-core");
const getModelUris_1 = require("../common/getModelUris");
const fetchJson_1 = require("./fetchJson");
async function loadWeightMap(uri, defaultModelName) {
    const { manifestUri, modelBaseUri } = getModelUris_1.getModelUris(uri, defaultModelName);
    const manifest = await fetchJson_1.fetchJson(manifestUri);
    return tf.io.loadWeights(manifest, modelBaseUri);
}
exports.loadWeightMap = loadWeightMap;
//# sourceMappingURL=loadWeightMap.js.map