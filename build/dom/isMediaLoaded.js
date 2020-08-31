import { env } from '../env';
export function isMediaLoaded(media) {
    const { Image, Video } = env.getEnv();
    return (media instanceof Image && media.complete)
        || (media instanceof Video && media.readyState >= 3);
}
//# sourceMappingURL=isMediaLoaded.js.map