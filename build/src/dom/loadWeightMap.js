import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import { getModelUris } from '../common/getModelUris';
import { fetchJson } from './fetchJson';
export async function loadWeightMap(uri, defaultModelName) {
    const { manifestUri, modelBaseUri } = getModelUris(uri, defaultModelName);
    let manifest = await fetchJson(manifestUri);
    // if (manifest['weightsManifest']) manifest = manifest['weightsManifest'];
    return tf.io.loadWeights(manifest, modelBaseUri);
}
//# sourceMappingURL=loadWeightMap.js.map