"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParams = void 0;
const common_1 = require("../common");
const extractorsFactory_1 = require("./extractorsFactory");
function extractParams(weights) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = common_1.extractWeightsFactory(weights);
    const { extractDenseBlock4Params } = extractorsFactory_1.extractorsFactory(extractWeights, paramMappings);
    const dense0 = extractDenseBlock4Params(3, 32, 'dense0', true);
    const dense1 = extractDenseBlock4Params(32, 64, 'dense1');
    const dense2 = extractDenseBlock4Params(64, 128, 'dense2');
    const dense3 = extractDenseBlock4Params(128, 256, 'dense3');
    if (getRemainingWeights().length !== 0) {
        throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
    }
    return {
        paramMappings,
        params: { dense0, dense1, dense2, dense3 }
    };
}
exports.extractParams = extractParams;
//# sourceMappingURL=extractParams.js.map