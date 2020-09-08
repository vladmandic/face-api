import { disposeUnusedWeightTensors, extractWeightEntryFactory } from '../common';
export function extractParamsFromWeigthMap(weightMap) {
    const paramMappings = [];
    const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractFcParams(prefix) {
        const weights = extractWeightEntry(`${prefix}/weights`, 2);
        const bias = extractWeightEntry(`${prefix}/bias`, 1);
        return { weights, bias };
    }
    const params = {
        fc: extractFcParams('fc')
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params, paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map