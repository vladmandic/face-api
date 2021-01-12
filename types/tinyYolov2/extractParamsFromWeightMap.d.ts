import * as tf from '../../dist/tfjs.esm';
import { ParamMapping } from '../common/types';
import { TinyYolov2Config } from './config';
import { TinyYolov2NetParams } from './types';
export declare function extractParamsFromWeightMap(weightMap: tf.NamedTensorMap, config: TinyYolov2Config): {
    params: TinyYolov2NetParams;
    paramMappings: ParamMapping[];
};
