import { env } from '../env/index';

export function bufferToVideo(buf: Blob): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    if (!(buf instanceof Blob)) reject(new Error('bufferToVideo - expected buf to be of type: Blob'));
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') reject(new Error('bufferToVideo - expected reader.result to be a string, in onload'));
      const video = env.getEnv().createVideoElement();
      video.onloadstart = () => {
        setTimeout(() => resolve(video), 100);
      };
      video.onerror = reject;
      // video.type = 'video/mp4';
      video.autoplay = true;
      video.muted = true;
      video.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(buf);
  });
}
