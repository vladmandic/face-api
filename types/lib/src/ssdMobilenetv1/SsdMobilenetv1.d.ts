import * as tf from '../../dist/tfjs.esm';
import { FaceDetection } from '../classes/FaceDetection';
import { NetInput, TNetInput } from '../dom/index';
import { NeuralNetwork } from '../NeuralNetwork';
import { ISsdMobilenetv1Options } from './SsdMobilenetv1Options';
import { NetParams } from './types';
export declare class SsdMobilenetv1 extends NeuralNetwork<NetParams> {
    constructor();
    forwardInput(input: NetInput): any;
    forward(input: TNetInput): Promise<any>;
    locateFaces(input: TNetInput, options?: ISsdMobilenetv1Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
}
