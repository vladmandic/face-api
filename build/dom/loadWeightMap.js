import * as tf from '@tensorflow/tfjs-core';
import { getModelUris } from '../common/getModelUris';
import { fetchJson } from './fetchJson';
export async function loadWeightMap(uri, defaultModelName) {
    const { manifestUri, modelBaseUri } = getModelUris(uri, defaultModelName);
    const manifest = await fetchJson(manifestUri);
    console.log(typeof manifest, manifest);
    return tf.io.loadWeights(manifest, modelBaseUri);
}
//# sourceMappingURL=loadWeightMap.js.map