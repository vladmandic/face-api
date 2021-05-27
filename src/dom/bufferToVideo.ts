import { env } from '../env/index';

export function bufferToVideo(buf: Blob): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    if (!(buf instanceof Blob)) reject(new Error('bufferToVideo - expected buf to be of type: Blob'));

    const video = env.getEnv().createVideoElement();
    video.oncanplay = () => resolve(video);
    video.onerror = reject;
    // video.type = buf.type;
    video.playsInline = true;
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(buf);
  });
}
