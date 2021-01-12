import * as tf from '../../dist/tfjs.esm';
import { ParamMapping } from '../common/index';
import { FaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
    params: FaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
