"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParams = void 0;
const common_1 = require("../common");
function extractParams(weights, channelsIn, channelsOut) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = common_1.extractWeightsFactory(weights);
    const extractFCParams = common_1.extractFCParamsFactory(extractWeights, paramMappings);
    const fc = extractFCParams(channelsIn, channelsOut, 'fc');
    if (getRemainingWeights().length !== 0) {
        throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
    }
    return {
        paramMappings,
        params: { fc }
    };
}
exports.extractParams = extractParams;
//# sourceMappingURL=extractParams.js.map