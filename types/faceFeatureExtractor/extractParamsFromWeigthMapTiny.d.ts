import * as tf from '../../dist/tfjs.esm';
import { ParamMapping } from '../common/index';
import { TinyFaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeigthMapTiny(weightMap: tf.NamedTensorMap): {
    params: TinyFaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
