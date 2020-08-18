import { fetchOrThrow } from './fetchOrThrow';
export async function fetchNetWeights(uri) {
    return new Float32Array(await (await fetchOrThrow(uri)).arrayBuffer());
}
//# sourceMappingURL=fetchNetWeights.js.map