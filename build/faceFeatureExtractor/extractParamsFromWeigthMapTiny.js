"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParamsFromWeigthMapTiny = void 0;
const common_1 = require("../common");
const loadParamsFactory_1 = require("./loadParamsFactory");
function extractParamsFromWeigthMapTiny(weightMap) {
    const paramMappings = [];
    const { extractDenseBlock3Params } = loadParamsFactory_1.loadParamsFactory(weightMap, paramMappings);
    const params = {
        dense0: extractDenseBlock3Params('dense0', true),
        dense1: extractDenseBlock3Params('dense1'),
        dense2: extractDenseBlock3Params('dense2')
    };
    common_1.disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params, paramMappings };
}
exports.extractParamsFromWeigthMapTiny = extractParamsFromWeigthMapTiny;
//# sourceMappingURL=extractParamsFromWeigthMapTiny.js.map