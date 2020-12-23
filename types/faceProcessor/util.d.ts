import * as tf from '../../dist/tfjs.esm';
export declare function seperateWeightMaps(weightMap: tf.NamedTensorMap): {
    featureExtractorMap: any;
    classifierMap: any;
};
