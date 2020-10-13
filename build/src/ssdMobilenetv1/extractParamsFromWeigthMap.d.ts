import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { ParamMapping } from '../common';
import { NetParams } from './types';
export declare function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
    params: NetParams;
    paramMappings: ParamMapping[];
};
