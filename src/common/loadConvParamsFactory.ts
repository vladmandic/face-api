import * as tf from '../../dist/tfjs.esm.js';

import { ConvParams } from './types';

export function loadConvParamsFactory(extractWeightEntry: <T>(originalPath: string, paramRank: number) => T) {
  return function(prefix: string): ConvParams {
    const filters = extractWeightEntry<tf.Tensor4D>(`${prefix}/filters`, 4)
    const bias = extractWeightEntry<tf.Tensor1D>(`${prefix}/bias`, 1)

    return { filters, bias }
  }
}