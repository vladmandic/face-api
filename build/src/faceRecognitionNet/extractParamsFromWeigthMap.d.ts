import * as tf from '@tensorflow/tfjs';
import { ParamMapping } from '../common';
import { NetParams } from './types';
export declare function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
    params: NetParams;
    paramMappings: ParamMapping[];
};
//# sourceMappingURL=extractParamsFromWeigthMap.d.ts.map