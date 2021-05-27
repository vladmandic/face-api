import { bufferToVideo } from './bufferToVideo';
import { fetchOrThrow } from './fetchOrThrow';

export async function fetchVideo(uri: string): Promise<HTMLVideoElement> {
  const res = await fetchOrThrow(uri);
  const blob = await (res).blob();

  if (!blob.type.startsWith('video/')) {
    throw new Error(`fetchVideo - expected blob type to be of type video/*, instead have: ${blob.type}, for url: ${res.url}`);
  }
  return bufferToVideo(blob);
}
