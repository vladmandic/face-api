import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { ParamMapping } from '../common';
import { TinyXceptionParams } from './types';
export declare function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap, numMainBlocks: number): {
    params: TinyXceptionParams;
    paramMappings: ParamMapping[];
};
