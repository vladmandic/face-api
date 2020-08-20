"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFCParamsFactory = void 0;
const tf = require("@tensorflow/tfjs-core");
function extractFCParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, mappedPrefix) {
        const fc_weights = tf.tensor2d(extractWeights(channelsIn * channelsOut), [channelsIn, channelsOut]);
        const fc_bias = tf.tensor1d(extractWeights(channelsOut));
        paramMappings.push({ paramPath: `${mappedPrefix}/weights` }, { paramPath: `${mappedPrefix}/bias` });
        return {
            weights: fc_weights,
            bias: fc_bias
        };
    };
}
exports.extractFCParamsFactory = extractFCParamsFactory;
//# sourceMappingURL=extractFCParamsFactory.js.map