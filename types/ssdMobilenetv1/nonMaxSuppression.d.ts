import * as tf from '../../dist/tfjs.esm.js';
export declare function nonMaxSuppression(boxes: tf.Tensor2D, scores: number[], maxOutputSize: number, iouThreshold: number, scoreThreshold: number): number[];
