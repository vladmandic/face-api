import { ParamMapping } from '../common/index';
import { TinyFaceFeatureExtractorParams } from './types';
export declare function extractParamsTiny(weights: Float32Array): {
    params: TinyFaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
