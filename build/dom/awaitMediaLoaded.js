"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitMediaLoaded = void 0;
const env_1 = require("../env");
const isMediaLoaded_1 = require("./isMediaLoaded");
function awaitMediaLoaded(media) {
    return new Promise((resolve, reject) => {
        if (media instanceof env_1.env.getEnv().Canvas || isMediaLoaded_1.isMediaLoaded(media)) {
            return resolve();
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
exports.awaitMediaLoaded = awaitMediaLoaded;
//# sourceMappingURL=awaitMediaLoaded.js.map