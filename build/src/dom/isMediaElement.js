import { env } from '../env';
export function isMediaElement(input) {
    const { Image, Canvas, Video } = env.getEnv();
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
//# sourceMappingURL=isMediaElement.js.map