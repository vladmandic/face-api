import * as tf from '@tensorflow/tfjs-core';
import { ParamMapping } from '../common';
import { TinyFaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeigthMapTiny(weightMap: tf.NamedTensorMap): {
    params: TinyFaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
