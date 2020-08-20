"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParams = void 0;
const tf = require("@tensorflow/tfjs-core");
const common_1 = require("../common");
const extractSeparableConvParamsFactory_1 = require("../common/extractSeparableConvParamsFactory");
const extractWeightsFactory_1 = require("../common/extractWeightsFactory");
function extractorsFactory(extractWeights, paramMappings) {
    const extractConvParams = common_1.extractConvParamsFactory(extractWeights, paramMappings);
    function extractBatchNormParams(size, mappedPrefix) {
        const sub = tf.tensor1d(extractWeights(size));
        const truediv = tf.tensor1d(extractWeights(size));
        paramMappings.push({ paramPath: `${mappedPrefix}/sub` }, { paramPath: `${mappedPrefix}/truediv` });
        return { sub, truediv };
    }
    function extractConvWithBatchNormParams(channelsIn, channelsOut, mappedPrefix) {
        const conv = extractConvParams(channelsIn, channelsOut, 3, `${mappedPrefix}/conv`);
        const bn = extractBatchNormParams(channelsOut, `${mappedPrefix}/bn`);
        return { conv, bn };
    }
    const extractSeparableConvParams = extractSeparableConvParamsFactory_1.extractSeparableConvParamsFactory(extractWeights, paramMappings);
    return {
        extractConvParams,
        extractConvWithBatchNormParams,
        extractSeparableConvParams
    };
}
function extractParams(weights, config, boxEncodingSize, filterSizes) {
    const { extractWeights, getRemainingWeights } = extractWeightsFactory_1.extractWeightsFactory(weights);
    const paramMappings = [];
    const { extractConvParams, extractConvWithBatchNormParams, extractSeparableConvParams } = extractorsFactory(extractWeights, paramMappings);
    let params;
    if (config.withSeparableConvs) {
        const [s0, s1, s2, s3, s4, s5, s6, s7, s8] = filterSizes;
        const conv0 = config.isFirstLayerConv2d
            ? extractConvParams(s0, s1, 3, 'conv0')
            : extractSeparableConvParams(s0, s1, 'conv0');
        const conv1 = extractSeparableConvParams(s1, s2, 'conv1');
        const conv2 = extractSeparableConvParams(s2, s3, 'conv2');
        const conv3 = extractSeparableConvParams(s3, s4, 'conv3');
        const conv4 = extractSeparableConvParams(s4, s5, 'conv4');
        const conv5 = extractSeparableConvParams(s5, s6, 'conv5');
        const conv6 = s7 ? extractSeparableConvParams(s6, s7, 'conv6') : undefined;
        const conv7 = s8 ? extractSeparableConvParams(s7, s8, 'conv7') : undefined;
        const conv8 = extractConvParams(s8 || s7 || s6, 5 * boxEncodingSize, 1, 'conv8');
        params = { conv0, conv1, conv2, conv3, conv4, conv5, conv6, conv7, conv8 };
    }
    else {
        const [s0, s1, s2, s3, s4, s5, s6, s7, s8] = filterSizes;
        const conv0 = extractConvWithBatchNormParams(s0, s1, 'conv0');
        const conv1 = extractConvWithBatchNormParams(s1, s2, 'conv1');
        const conv2 = extractConvWithBatchNormParams(s2, s3, 'conv2');
        const conv3 = extractConvWithBatchNormParams(s3, s4, 'conv3');
        const conv4 = extractConvWithBatchNormParams(s4, s5, 'conv4');
        const conv5 = extractConvWithBatchNormParams(s5, s6, 'conv5');
        const conv6 = extractConvWithBatchNormParams(s6, s7, 'conv6');
        const conv7 = extractConvWithBatchNormParams(s7, s8, 'conv7');
        const conv8 = extractConvParams(s8, 5 * boxEncodingSize, 1, 'conv8');
        params = { conv0, conv1, conv2, conv3, conv4, conv5, conv6, conv7, conv8 };
    }
    if (getRemainingWeights().length !== 0) {
        throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
    }
    return { params, paramMappings };
}
exports.extractParams = extractParams;
//# sourceMappingURL=extractParams.js.map