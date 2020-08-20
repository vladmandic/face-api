import { disposeUnusedWeightTensors } from '../common';
import { loadParamsFactory } from './loadParamsFactory';
export function extractParamsFromWeigthMapTiny(weightMap) {
    const paramMappings = [];
    const { extractDenseBlock3Params } = loadParamsFactory(weightMap, paramMappings);
    const params = {
        dense0: extractDenseBlock3Params('dense0', true),
        dense1: extractDenseBlock3Params('dense1'),
        dense2: extractDenseBlock3Params('dense2')
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params, paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMapTiny.js.map