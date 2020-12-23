import { env } from '../env/index';

export function bufferToImage(buf: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!(buf instanceof Blob)) reject(new Error('bufferToImage - expected buf to be of type: Blob'));
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') reject(new Error('bufferToImage - expected reader.result to be a string, in onload'));
      const img = env.getEnv().createImageElement();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(buf);
  });
}
