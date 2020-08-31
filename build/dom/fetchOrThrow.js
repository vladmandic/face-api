import { env } from '../env';
export async function fetchOrThrow(url, init) {
    const fetch = env.getEnv().fetch;
    const res = await fetch(url, init);
    if (!(res.status < 400)) {
        throw new Error(`failed to fetch: (${res.status}) ${res.statusText}, from url: ${res.url}`);
    }
    return res;
}
//# sourceMappingURL=fetchOrThrow.js.map