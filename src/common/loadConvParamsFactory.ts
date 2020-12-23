import * as tf from '../../dist/tfjs.esm';

import { ConvParams } from './types';

// eslint-disable-next-line no-unused-vars
export function loadConvParamsFactory(extractWeightEntry: <T>(originalPath: string, paramRank: number) => T) {
  return (prefix: string): ConvParams => {
    const filters = extractWeightEntry<tf.Tensor4D>(`${prefix}/filters`, 4);
    const bias = extractWeightEntry<tf.Tensor1D>(`${prefix}/bias`, 1);

    return { filters, bias };
  };
}
