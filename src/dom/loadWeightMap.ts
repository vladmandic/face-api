import * as tf from '../../dist/tfjs.esm.js';

import { getModelUris } from '../common/getModelUris';
import { fetchJson } from './fetchJson';

export async function loadWeightMap(
  uri: string | undefined,
  defaultModelName: string,
): Promise<tf.NamedTensorMap> {
  const { manifestUri, modelBaseUri } = getModelUris(uri, defaultModelName)
  let manifest = await fetchJson<tf.io.WeightsManifestConfig>(manifestUri)
  // if (manifest['weightsManifest']) manifest = manifest['weightsManifest'];
  return tf.io.loadWeights(manifest, modelBaseUri)
}