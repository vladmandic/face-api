import { Environment } from './types';

export function createBrowserEnv(): Environment {
  const fetch = window.fetch;
  if (!fetch) throw new Error('fetch - missing fetch implementation for browser environment');

  const readFile = () => {
    throw new Error('readFile - filesystem not available for browser environment');
  };

  return {
    Canvas: HTMLCanvasElement,
    CanvasRenderingContext2D,
    Image: HTMLImageElement,
    ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img'),
    createVideoElement: () => document.createElement('video'),
    fetch,
    readFile,
  };
}
