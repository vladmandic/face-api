import { getMediaDimensions } from './getMediaDimensions';
export function matchDimensions(input, reference, useMediaDimensions = false) {
    const { width, height } = useMediaDimensions
        ? getMediaDimensions(reference)
        : reference;
    input.width = width;
    input.height = height;
    return { width, height };
}
//# sourceMappingURL=matchDimensions.js.map