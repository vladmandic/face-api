"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParamsFromWeigthMap = void 0;
const common_1 = require("../common");
function extractParamsFromWeigthMap(weightMap) {
    const paramMappings = [];
    const extractWeightEntry = common_1.extractWeightEntryFactory(weightMap, paramMappings);
    function extractFcParams(prefix) {
        const weights = extractWeightEntry(`${prefix}/weights`, 2);
        const bias = extractWeightEntry(`${prefix}/bias`, 1);
        return { weights, bias };
    }
    const params = {
        fc: {
            age: extractFcParams('fc/age'),
            gender: extractFcParams('fc/gender')
        }
    };
    common_1.disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params, paramMappings };
}
exports.extractParamsFromWeigthMap = extractParamsFromWeigthMap;
//# sourceMappingURL=extractParamsFromWeigthMap.js.map