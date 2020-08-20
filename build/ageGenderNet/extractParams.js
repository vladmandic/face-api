"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParams = void 0;
const common_1 = require("../common");
function extractParams(weights) {
    const paramMappings = [];
    const { extractWeights, getRemainingWeights } = common_1.extractWeightsFactory(weights);
    const extractFCParams = common_1.extractFCParamsFactory(extractWeights, paramMappings);
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
exports.extractParams = extractParams;
//# sourceMappingURL=extractParams.js.map