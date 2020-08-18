import { extractWeightEntryFactory, loadSeparableConvParamsFactory } from '../common';
import { loadConvParamsFactory } from '../common/loadConvParamsFactory';
export function loadParamsFactory(weightMap, paramMappings) {
    const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    const extractConvParams = loadConvParamsFactory(extractWeightEntry);
    const extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
    function extractDenseBlock3Params(prefix, isFirstLayer = false) {
        const conv0 = isFirstLayer
            ? extractConvParams(`${prefix}/conv0`)
            : extractSeparableConvParams(`${prefix}/conv0`);
        const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
        const conv2 = extractSeparableConvParams(`${prefix}/conv2`);
        return { conv0, conv1, conv2 };
    }
    function extractDenseBlock4Params(prefix, isFirstLayer = false) {
        const conv0 = isFirstLayer
            ? extractConvParams(`${prefix}/conv0`)
            : extractSeparableConvParams(`${prefix}/conv0`);
        const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
        const conv2 = extractSeparableConvParams(`${prefix}/conv2`);
        const conv3 = extractSeparableConvParams(`${prefix}/conv3`);
        return { conv0, conv1, conv2, conv3 };
    }
    return {
        extractDenseBlock3Params,
        extractDenseBlock4Params
    };
}
//# sourceMappingURL=loadParamsFactory.js.map