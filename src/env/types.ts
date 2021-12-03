export type FileSystem = {
  // eslint-disable-next-line no-unused-vars
  readFile: (filePath: string) => Promise<any>
}

export type Environment = FileSystem & {
  Canvas: typeof HTMLCanvasElement
  CanvasRenderingContext2D: typeof CanvasRenderingContext2D
  Image: typeof HTMLImageElement
  ImageData: typeof ImageData
  Video: typeof HTMLVideoElement
  createCanvasElement: () => HTMLCanvasElement
  createImageElement: () => HTMLImageElement
  createVideoElement: () => HTMLVideoElement
  // eslint-disable-next-line no-undef, no-unused-vars
  fetch: (url: string, init?: RequestInit) => Promise<Response>
}
