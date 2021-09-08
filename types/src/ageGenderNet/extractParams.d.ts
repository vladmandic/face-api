import { ParamMapping } from '../common/index';
import { NetParams } from './types';
export declare function extractParams(weights: Float32Array): {
    params: NetParams;
    paramMappings: ParamMapping[];
};
