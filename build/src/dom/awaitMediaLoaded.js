import { env } from '../env';
import { isMediaLoaded } from './isMediaLoaded';
export function awaitMediaLoaded(media) {
    return new Promise((resolve, reject) => {
        if (media instanceof env.getEnv().Canvas || isMediaLoaded(media)) {
            return resolve(null);
        }
        function onLoad(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            resolve(e);
        }
        function onError(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            reject(e);
        }
        media.addEventListener('load', onLoad);
        media.addEventListener('error', onError);
    });
}
//# sourceMappingURL=awaitMediaLoaded.js.map