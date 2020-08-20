"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParamsFactory = void 0;
const common_1 = require("../common");
const loadConvParamsFactory_1 = require("../common/loadConvParamsFactory");
function loadParamsFactory(weightMap, paramMappings) {
    const extractWeightEntry = common_1.extractWeightEntryFactory(weightMap, paramMappings);
    const extractConvParams = loadConvParamsFactory_1.loadConvParamsFactory(extractWeightEntry);
    const extractSeparableConvParams = common_1.loadSeparableConvParamsFactory(extractWeightEntry);
    function extractDenseBlock3Params(prefix, isFirstLayer = false) {
        const conv0 = isFirstLayer
            ? extractConvParams(`${prefix}/conv0`)
            : extractSeparableConvParams(`${prefix}/conv0`);
        const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
        const conv2 = extractSeparableConvParams(`${prefix}/conv2`);
        return { conv0, conv1, conv2 };
    }
    function extractDenseBlock4Params(prefix, isFirstLayer = false) {
        const conv0 = isFirstLayer
            ? extractConvParams(`${prefix}/conv0`)
            : extractSeparableConvParams(`${prefix}/conv0`);
        const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
        const conv2 = extractSeparableConvParams(`${prefix}/conv2`);
        const conv3 = extractSeparableConvParams(`${prefix}/conv3`);
        return { conv0, conv1, conv2, conv3 };
    }
    return {
        extractDenseBlock3Params,
        extractDenseBlock4Params
    };
}
exports.loadParamsFactory = loadParamsFactory;
//# sourceMappingURL=loadParamsFactory.js.map