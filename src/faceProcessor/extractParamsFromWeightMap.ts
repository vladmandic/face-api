import * as tf from '../../dist/tfjs.esm';

import { disposeUnusedWeightTensors, extractWeightEntryFactory, FCParams, ParamMapping } from '../common/index';
import { NetParams } from './types';

export function extractParamsFromWeightMap(
  weightMap: tf.NamedTensorMap,
): { params: NetParams, paramMappings: ParamMapping[] } {
  const paramMappings: ParamMapping[] = [];

  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);

  function extractFcParams(prefix: string): FCParams {
    const weights = extractWeightEntry(`${prefix}/weights`, 2);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return { weights, bias };
  }

  const params = {
    fc: extractFcParams('fc'),
  };

  disposeUnusedWeightTensors(weightMap, paramMappings);

  return { params, paramMappings };
}
