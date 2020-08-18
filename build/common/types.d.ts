import * as tf from '@tensorflow/tfjs-core';
export declare type ExtractWeightsFunction = (numWeights: number) => Float32Array;
export declare type ParamMapping = {
    originalPath?: string;
    paramPath: string;
};
export declare type ConvParams = {
    filters: tf.Tensor4D;
    bias: tf.Tensor1D;
};
export declare type FCParams = {
    weights: tf.Tensor2D;
    bias: tf.Tensor1D;
};
export declare class SeparableConvParams {
    depthwise_filter: tf.Tensor4D;
    pointwise_filter: tf.Tensor4D;
    bias: tf.Tensor1D;
    constructor(depthwise_filter: tf.Tensor4D, pointwise_filter: tf.Tensor4D, bias: tf.Tensor1D);
}
