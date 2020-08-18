import * as tf from '@tensorflow/tfjs-core';
import { NetInput } from '../dom';
import { FaceFeatureExtractorParams, IFaceFeatureExtractor, TinyFaceFeatureExtractorParams } from '../faceFeatureExtractor/types';
import { NeuralNetwork } from '../NeuralNetwork';
import { NetParams } from './types';
export declare abstract class FaceProcessor<TExtractorParams extends FaceFeatureExtractorParams | TinyFaceFeatureExtractorParams> extends NeuralNetwork<NetParams> {
    protected _faceFeatureExtractor: IFaceFeatureExtractor<TExtractorParams>;
    constructor(_name: string, faceFeatureExtractor: IFaceFeatureExtractor<TExtractorParams>);
    get faceFeatureExtractor(): IFaceFeatureExtractor<TExtractorParams>;
    protected abstract getDefaultModelName(): string;
    protected abstract getClassifierChannelsIn(): number;
    protected abstract getClassifierChannelsOut(): number;
    runNet(input: NetInput | tf.Tensor4D): tf.Tensor2D;
    dispose(throwOnRedispose?: boolean): void;
    loadClassifierParams(weights: Float32Array): void;
    extractClassifierParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
}
