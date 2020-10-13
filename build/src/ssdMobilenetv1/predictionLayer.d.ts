import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { PredictionLayerParams } from './types';
export declare function predictionLayer(x: tf.Tensor4D, conv11: tf.Tensor4D, params: PredictionLayerParams): any;
