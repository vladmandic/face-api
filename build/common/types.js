"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparableConvParams = void 0;
class SeparableConvParams {
    constructor(depthwise_filter, pointwise_filter, bias) {
        this.depthwise_filter = depthwise_filter;
        this.pointwise_filter = pointwise_filter;
        this.bias = bias;
    }
}
exports.SeparableConvParams = SeparableConvParams;
//# sourceMappingURL=types.js.map