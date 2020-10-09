import * as tf from '@tensorflow/tfjs';
import { PredictionLayerParams } from './types';
export declare function predictionLayer(x: tf.Tensor4D, conv11: tf.Tensor4D, params: PredictionLayerParams): {
    boxPredictions: tf.Tensor4D;
    classPredictions: tf.Tensor4D;
};
//# sourceMappingURL=predictionLayer.d.ts.map