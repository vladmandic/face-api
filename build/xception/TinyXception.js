"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyXception = void 0;
const tf = require("@tensorflow/tfjs-core");
const common_1 = require("../common");
const dom_1 = require("../dom");
const NeuralNetwork_1 = require("../NeuralNetwork");
const ops_1 = require("../ops");
const utils_1 = require("../utils");
const extractParams_1 = require("./extractParams");
const extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
function conv(x, params, stride) {
    return tf.add(tf.conv2d(x, params.filters, stride, 'same'), params.bias);
}
function reductionBlock(x, params, isActivateInput = true) {
    let out = isActivateInput ? tf.relu(x) : x;
    out = common_1.depthwiseSeparableConv(out, params.separable_conv0, [1, 1]);
    out = common_1.depthwiseSeparableConv(tf.relu(out), params.separable_conv1, [1, 1]);
    out = tf.maxPool(out, [3, 3], [2, 2], 'same');
    out = tf.add(out, conv(x, params.expansion_conv, [2, 2]));
    return out;
}
function mainBlock(x, params) {
    let out = common_1.depthwiseSeparableConv(tf.relu(x), params.separable_conv0, [1, 1]);
    out = common_1.depthwiseSeparableConv(tf.relu(out), params.separable_conv1, [1, 1]);
    out = common_1.depthwiseSeparableConv(tf.relu(out), params.separable_conv2, [1, 1]);
    out = tf.add(out, x);
    return out;
}
class TinyXception extends NeuralNetwork_1.NeuralNetwork {
    constructor(numMainBlocks) {
        super('TinyXception');
        this._numMainBlocks = numMainBlocks;
    }
    forwardInput(input) {
        const { params } = this;
        if (!params) {
            throw new Error('TinyXception - load model before inference');
        }
        return tf.tidy(() => {
            const batchTensor = input.toBatchTensor(112, true);
            const meanRgb = [122.782, 117.001, 104.298];
            const normalized = ops_1.normalize(batchTensor, meanRgb).div(tf.scalar(256));
            let out = tf.relu(conv(normalized, params.entry_flow.conv_in, [2, 2]));
            out = reductionBlock(out, params.entry_flow.reduction_block_0, false);
            out = reductionBlock(out, params.entry_flow.reduction_block_1);
            utils_1.range(this._numMainBlocks, 0, 1).forEach((idx) => {
                out = mainBlock(out, params.middle_flow[`main_block_${idx}`]);
            });
            out = reductionBlock(out, params.exit_flow.reduction_block);
            out = tf.relu(common_1.depthwiseSeparableConv(out, params.exit_flow.separable_conv, [1, 1]));
            return out;
        });
    }
    async forward(input) {
        return this.forwardInput(await dom_1.toNetInput(input));
    }
    getDefaultModelName() {
        return 'tiny_xception_model';
    }
    extractParamsFromWeigthMap(weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap, this._numMainBlocks);
    }
    extractParams(weights) {
        return extractParams_1.extractParams(weights, this._numMainBlocks);
    }
}
exports.TinyXception = TinyXception;
//# sourceMappingURL=TinyXception.js.map