import { fetchOrThrow } from './fetchOrThrow';
export async function fetchJson(uri) {
    return (await fetchOrThrow(uri)).json();
}
//# sourceMappingURL=fetchJson.js.map