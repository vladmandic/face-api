import { Dimensions } from '../classes/Dimensions';
import { env } from '../env';
export function getMediaDimensions(input) {
    const { Image, Video } = env.getEnv();
    if (input instanceof Image) {
        return new Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof Video) {
        return new Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions(input.width, input.height);
}
//# sourceMappingURL=getMediaDimensions.js.map