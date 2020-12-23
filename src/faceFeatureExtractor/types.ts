import * as tf from '../../dist/tfjs.esm';

import { NetInput, TNetInput } from '../index';
import { ConvParams, SeparableConvParams } from '../common/index';
import { NeuralNetwork } from '../NeuralNetwork';

export type BatchNormParams = {
  mean: tf.Tensor1D
  variance: tf.Tensor1D
  scale: tf.Tensor1D
  offset: tf.Tensor1D
}

export type ConvWithBatchNormParams = BatchNormParams & {
  filter: tf.Tensor4D
}

export type SeparableConvWithBatchNormParams = {
  depthwise: ConvWithBatchNormParams
  pointwise: ConvWithBatchNormParams
}

export type DenseBlock3Params = {
  conv0: SeparableConvParams | ConvParams
  conv1: SeparableConvParams
  conv2: SeparableConvParams
}

export type DenseBlock4Params = DenseBlock3Params & {
  conv3: SeparableConvParams
}

export type TinyFaceFeatureExtractorParams = {
  dense0: DenseBlock3Params
  dense1: DenseBlock3Params
  dense2: DenseBlock3Params
}

export type FaceFeatureExtractorParams = {
  dense0: DenseBlock4Params
  dense1: DenseBlock4Params
  dense2: DenseBlock4Params
  dense3: DenseBlock4Params
}

export interface IFaceFeatureExtractor<TNetParams extends TinyFaceFeatureExtractorParams | FaceFeatureExtractorParams> extends NeuralNetwork<TNetParams> {
  // eslint-disable-next-line no-unused-vars
  forwardInput(input: NetInput): tf.Tensor4D
  // eslint-disable-next-line no-unused-vars
  forward(input: TNetInput): Promise<tf.Tensor4D>
}
