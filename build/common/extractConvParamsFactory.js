"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractConvParamsFactory = void 0;
const tf = require("@tensorflow/tfjs-core");
function extractConvParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, filterSize, mappedPrefix) {
        const filters = tf.tensor4d(extractWeights(channelsIn * channelsOut * filterSize * filterSize), [filterSize, filterSize, channelsIn, channelsOut]);
        const bias = tf.tensor1d(extractWeights(channelsOut));
        paramMappings.push({ paramPath: `${mappedPrefix}/filters` }, { paramPath: `${mappedPrefix}/bias` });
        return { filters, bias };
    };
}
exports.extractConvParamsFactory = extractConvParamsFactory;
//# sourceMappingURL=extractConvParamsFactory.js.map