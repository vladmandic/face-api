import * as tf from '../../dist/tfjs.esm';
import { NetInput, TNetInput } from '../dom/index';
import { NeuralNetwork } from '../NeuralNetwork';
import { TinyXceptionParams } from './types';
export declare class TinyXception extends NeuralNetwork<TinyXceptionParams> {
    private _numMainBlocks;
    constructor(numMainBlocks: number);
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyXceptionParams;
        paramMappings: import("../common/types").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyXceptionParams;
        paramMappings: import("../common/types").ParamMapping[];
    };
}
