import { extractFCParamsFactory, extractWeightsFactory } from '../common';
export function extractParams(weights) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = extractWeightsFactory(weights);
    const extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
    const age = extractFCParams(512, 1, 'fc/age');
    const gender = extractFCParams(512, 2, 'fc/gender');
    if (getRemainingWeights().length !== 0) {
        throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
    }
    return {
        paramMappings,
        params: { fc: { age, gender } }
    };
}
//# sourceMappingURL=extractParams.js.map