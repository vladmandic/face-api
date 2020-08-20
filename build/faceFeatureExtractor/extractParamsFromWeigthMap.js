"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParamsFromWeigthMap = void 0;
const common_1 = require("../common");
const loadParamsFactory_1 = require("./loadParamsFactory");
function extractParamsFromWeigthMap(weightMap) {
    const paramMappings = [];
    const { extractDenseBlock4Params } = loadParamsFactory_1.loadParamsFactory(weightMap, paramMappings);
    const params = {
        dense0: extractDenseBlock4Params('dense0', true),
        dense1: extractDenseBlock4Params('dense1'),
        dense2: extractDenseBlock4Params('dense2'),
        dense3: extractDenseBlock4Params('dense3')
    };
    common_1.disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params, paramMappings };
}
exports.extractParamsFromWeigthMap = extractParamsFromWeigthMap;
//# sourceMappingURL=extractParamsFromWeigthMap.js.map