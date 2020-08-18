import * as tf from '@tensorflow/tfjs-core';
import { NetInput, TNetInput } from '../dom';
import { NeuralNetwork } from '../NeuralNetwork';
import { IFaceFeatureExtractor, TinyFaceFeatureExtractorParams } from './types';
export declare class TinyFaceFeatureExtractor extends NeuralNetwork<TinyFaceFeatureExtractorParams> implements IFaceFeatureExtractor<TinyFaceFeatureExtractorParams> {
    constructor();
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: import("../common").ParamMapping[];
    };
}
