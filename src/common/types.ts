import * as tf from '../../dist/tfjs.esm';

// eslint-disable-next-line no-unused-vars
export type ExtractWeightsFunction = (numWeights: number) => Float32Array

export type ParamMapping = {
  originalPath?: string
  paramPath: string
}

export type ConvParams = {
  filters: tf.Tensor4D
  bias: tf.Tensor1D
}

export type FCParams = {
  weights: tf.Tensor2D
  bias: tf.Tensor1D
}

export class SeparableConvParams {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // eslint-disable-next-line no-unused-vars
    public depthwise_filter: tf.Tensor4D,
    // eslint-disable-next-line no-unused-vars
    public pointwise_filter: tf.Tensor4D,
    // eslint-disable-next-line no-unused-vars
    public bias: tf.Tensor1D,
  // eslint-disable-next-line no-empty-function
  ) {}
}
