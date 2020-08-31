import { extractWeightsFactory } from '../common';
import { extractorsFactory } from './extractorsFactory';
export function extractParamsTiny(weights) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = extractWeightsFactory(weights);
    const { extractDenseBlock3Params } = extractorsFactory(extractWeights, paramMappings);
    const dense0 = extractDenseBlock3Params(3, 32, 'dense0', true);
    const dense1 = extractDenseBlock3Params(32, 64, 'dense1');
    const dense2 = extractDenseBlock3Params(64, 128, 'dense2');
    if (getRemainingWeights().length !== 0) {
        throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
    }
    return {
        paramMappings,
        params: { dense0, dense1, dense2 }
    };
}
//# sourceMappingURL=extractParamsTiny.js.map