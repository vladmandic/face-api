/* eslint-disable max-classes-per-file */
import { createFileSystem } from './createFileSystem';
import { Environment } from './types';

export function createNodejsEnv(): Environment {
  // eslint-disable-next-line dot-notation
  const Canvas = global['Canvas'] || global.HTMLCanvasElement;
  const Image = global.Image || global.HTMLImageElement;
  // eslint-disable-next-line dot-notation
  const Video = global['Video'] || global.HTMLVideoElement;

  const createCanvasElement = () => {
    if (Canvas) return new Canvas();
    throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment');
  };

  const createImageElement = () => {
    if (Image) return new Image();
    throw new Error('createImageElement - missing Image implementation for nodejs environment');
  };

  const createVideoElement = () => {
    if (Video) return new Video();
    throw new Error('createVideoElement - missing Video implementation for nodejs environment');
  };

  const fetch = global.fetch;
  // if (!fetch) throw new Error('fetch - missing fetch implementation for nodejs environment');

  const fileSystem = createFileSystem();

  return {
    Canvas: Canvas || class {},
    CanvasRenderingContext2D: global.CanvasRenderingContext2D || class {},
    Image: Image || class {},
    ImageData: global.ImageData || class {},
    Video: global.HTMLVideoElement || class {},
    createCanvasElement,
    createImageElement,
    createVideoElement,
    fetch,
    ...fileSystem,
  };
}
