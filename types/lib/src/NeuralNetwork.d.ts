import * as tf from '../dist/tfjs.esm';
import { ParamMapping } from './common/index';
export declare abstract class NeuralNetwork<TNetParams> {
    constructor(name: string);
    protected _params: TNetParams | undefined;
    protected _paramMappings: ParamMapping[];
    _name: any;
    get params(): TNetParams | undefined;
    get paramMappings(): ParamMapping[];
    get isLoaded(): boolean;
    getParamFromPath(paramPath: string): tf.Tensor;
    reassignParamFromPath(paramPath: string, tensor: tf.Tensor): void;
    getParamList(): {
        path: string;
        tensor: tf.Tensor;
    }[];
    getTrainableParams(): {
        path: string;
        tensor: tf.Tensor;
    }[];
    getFrozenParams(): {
        path: string;
        tensor: tf.Tensor;
    }[];
    variable(): void;
    freeze(): void;
    dispose(throwOnRedispose?: boolean): void;
    serializeParams(): Float32Array;
    load(weightsOrUrl: Float32Array | string | undefined): Promise<void>;
    loadFromUri(uri: string | undefined): Promise<void>;
    loadFromDisk(filePath: string | undefined): Promise<void>;
    loadFromWeightMap(weightMap: tf.NamedTensorMap): void;
    extractWeights(weights: Float32Array): void;
    private traversePropertyPath;
    protected abstract getDefaultModelName(): string;
    protected abstract extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TNetParams;
        paramMappings: ParamMapping[];
    };
    protected abstract extractParams(weights: Float32Array): {
        params: TNetParams;
        paramMappings: ParamMapping[];
    };
}
