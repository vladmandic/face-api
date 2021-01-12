import * as tf from '../../dist/tfjs.esm';
import { ParamMapping } from '../common/index';
import { TinyXceptionParams } from './types';
export declare function extractParamsFromWeightMap(weightMap: tf.NamedTensorMap, numMainBlocks: number): {
    params: TinyXceptionParams;
    paramMappings: ParamMapping[];
};
