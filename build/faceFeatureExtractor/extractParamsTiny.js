"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParamsTiny = void 0;
const common_1 = require("../common");
const extractorsFactory_1 = require("./extractorsFactory");
function extractParamsTiny(weights) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = common_1.extractWeightsFactory(weights);
    const { extractDenseBlock3Params } = extractorsFactory_1.extractorsFactory(extractWeights, paramMappings);
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
exports.extractParamsTiny = extractParamsTiny;
//# sourceMappingURL=extractParamsTiny.js.map