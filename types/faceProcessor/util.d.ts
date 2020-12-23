import * as tf from '../../dist/tfjs.esm.js';
export declare function seperateWeightMaps(weightMap: tf.NamedTensorMap): {
    featureExtractorMap: any;
    classifierMap: any;
};
