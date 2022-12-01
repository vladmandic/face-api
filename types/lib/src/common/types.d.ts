import * as tf from '../../dist/tfjs.esm';
export type ExtractWeightsFunction = (numWeights: number) => Float32Array;
export type ParamMapping = {
    originalPath?: string;
    paramPath: string;
};
export type ConvParams = {
    filters: tf.Tensor4D;
    bias: tf.Tensor1D;
};
export type FCParams = {
    weights: tf.Tensor2D;
    bias: tf.Tensor1D;
};
export declare class SeparableConvParams {
    depthwise_filter: tf.Tensor4D;
    pointwise_filter: tf.Tensor4D;
    bias: tf.Tensor1D;
    constructor(depthwise_filter: tf.Tensor4D, pointwise_filter: tf.Tensor4D, bias: tf.Tensor1D);
}
