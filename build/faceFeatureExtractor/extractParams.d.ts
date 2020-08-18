import { ParamMapping } from '../common';
import { FaceFeatureExtractorParams } from './types';
export declare function extractParams(weights: Float32Array): {
    params: FaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
