import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { ParamMapping } from '../common';
import { TinyFaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeigthMapTiny(weightMap: tf.NamedTensorMap): {
    params: TinyFaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
