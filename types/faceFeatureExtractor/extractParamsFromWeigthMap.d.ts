import * as tf from '../../dist/tfjs.esm.js';
import { ParamMapping } from '../common/index';
import { FaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
    params: FaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
