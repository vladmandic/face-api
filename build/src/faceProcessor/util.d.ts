import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
export declare function seperateWeightMaps(weightMap: tf.NamedTensorMap): {
    featureExtractorMap: any;
    classifierMap: any;
};
