"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSeparableConvParamsFactory = exports.extractSeparableConvParamsFactory = void 0;
const tf = require("@tensorflow/tfjs-core");
const types_1 = require("./types");
function extractSeparableConvParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, mappedPrefix) {
        const depthwise_filter = tf.tensor4d(extractWeights(3 * 3 * channelsIn), [3, 3, channelsIn, 1]);
        const pointwise_filter = tf.tensor4d(extractWeights(channelsIn * channelsOut), [1, 1, channelsIn, channelsOut]);
        const bias = tf.tensor1d(extractWeights(channelsOut));
        paramMappings.push({ paramPath: `${mappedPrefix}/depthwise_filter` }, { paramPath: `${mappedPrefix}/pointwise_filter` }, { paramPath: `${mappedPrefix}/bias` });
        return new types_1.SeparableConvParams(depthwise_filter, pointwise_filter, bias);
    };
}
exports.extractSeparableConvParamsFactory = extractSeparableConvParamsFactory;
function loadSeparableConvParamsFactory(extractWeightEntry) {
    return function (prefix) {
        const depthwise_filter = extractWeightEntry(`${prefix}/depthwise_filter`, 4);
        const pointwise_filter = extractWeightEntry(`${prefix}/pointwise_filter`, 4);
        const bias = extractWeightEntry(`${prefix}/bias`, 1);
        return new types_1.SeparableConvParams(depthwise_filter, pointwise_filter, bias);
    };
}
exports.loadSeparableConvParamsFactory = loadSeparableConvParamsFactory;
//# sourceMappingURL=extractSeparableConvParamsFactory.js.map