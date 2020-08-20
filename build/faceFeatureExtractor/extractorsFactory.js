"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractorsFactory = void 0;
const common_1 = require("../common");
function extractorsFactory(extractWeights, paramMappings) {
    const extractConvParams = common_1.extractConvParamsFactory(extractWeights, paramMappings);
    const extractSeparableConvParams = common_1.extractSeparableConvParamsFactory(extractWeights, paramMappings);
    function extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer = false) {
        const conv0 = isFirstLayer
            ? extractConvParams(channelsIn, channelsOut, 3, `${mappedPrefix}/conv0`)
            : extractSeparableConvParams(channelsIn, channelsOut, `${mappedPrefix}/conv0`);
        const conv1 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv1`);
        const conv2 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv2`);
        return { conv0, conv1, conv2 };
    }
    function extractDenseBlock4Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer = false) {
        const { conv0, conv1, conv2 } = extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer);
        const conv3 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv3`);
        return { conv0, conv1, conv2, conv3 };
    }
    return {
        extractDenseBlock3Params,
        extractDenseBlock4Params
    };
}
exports.extractorsFactory = extractorsFactory;
//# sourceMappingURL=extractorsFactory.js.map