import { env } from '../env/index';

export async function fetchOrThrow(
  url: string,
  // eslint-disable-next-line no-undef
  init?: RequestInit,
): Promise<Response> {
  const { fetch } = env.getEnv();
  const res = await fetch(url, init);
  if (!(res.status < 400)) {
    throw new Error(`failed to fetch: (${res.status}) ${res.statusText}, from url: ${res.url}`);
  }
  return res;
}
