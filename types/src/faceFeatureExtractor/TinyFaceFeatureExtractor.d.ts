import * as tf from '../../dist/tfjs.esm';
import { NetInput, TNetInput } from '../dom/index';
import { NeuralNetwork } from '../NeuralNetwork';
import { IFaceFeatureExtractor, TinyFaceFeatureExtractorParams } from './types';
export declare class TinyFaceFeatureExtractor extends NeuralNetwork<TinyFaceFeatureExtractorParams> implements IFaceFeatureExtractor<TinyFaceFeatureExtractorParams> {
    constructor();
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: import("../common").ParamMapping[];
    };
}
