import * as tf from '@tensorflow/tfjs';
import { ParamMapping } from '../common';
import { FaceFeatureExtractorParams } from './types';
export declare function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
    params: FaceFeatureExtractorParams;
    paramMappings: ParamMapping[];
};
//# sourceMappingURL=extractParamsFromWeigthMap.d.ts.map