import { env } from '../env/index';
import { createCanvas, createCanvasFromMedia } from './createCanvas';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';

export function imageToSquare(input: HTMLImageElement | HTMLCanvasElement, inputSize: number, centerImage = false) {
  const { Image, Canvas } = env.getEnv();

  if (!(input instanceof Image || input instanceof Canvas)) {
    throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
  }

  if (inputSize <= 0) return createCanvas({ width: 1, height: 1 });
  const dims = getMediaDimensions(input);
  const scale = inputSize / Math.max(dims.height, dims.width);
  const width = scale * dims.width;
  const height = scale * dims.height;

  const targetCanvas = createCanvas({ width: inputSize, height: inputSize });
  const inputCanvas = input instanceof Canvas ? input : createCanvasFromMedia(input);

  const offset = Math.abs(width - height) / 2;
  const dx = centerImage && width < height ? offset : 0;
  const dy = centerImage && height < width ? offset : 0;
  if (inputCanvas.width > 0 && inputCanvas.height > 0) getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);

  return targetCanvas;
}
