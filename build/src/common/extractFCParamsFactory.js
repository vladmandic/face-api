import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
export function extractFCParamsFactory(extractWeights, paramMappings) {
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
//# sourceMappingURL=extractFCParamsFactory.js.map