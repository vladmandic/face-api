export declare type FileSystem = {
    readFile: (filePath: string) => Promise<any>;
};
export declare type Environment = FileSystem & {
    Canvas: typeof HTMLCanvasElement;
    CanvasRenderingContext2D: typeof CanvasRenderingContext2D;
    Image: typeof HTMLImageElement;
    ImageData: typeof ImageData;
    Video: typeof HTMLVideoElement;
    createCanvasElement: () => HTMLCanvasElement;
    createImageElement: () => HTMLImageElement;
    createVideoElement: () => HTMLVideoElement;
    fetch: (url: string, init?: RequestInit) => Promise<Response>;
};
