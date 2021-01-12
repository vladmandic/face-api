import * as tf from '../../dist/tfjs.esm';
import { ParamMapping } from '../common/index';
import { NetParams } from './types';
export declare function extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
    params: NetParams;
    paramMappings: ParamMapping[];
};
