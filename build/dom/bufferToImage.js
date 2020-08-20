"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToImage = void 0;
const env_1 = require("../env");
function bufferToImage(buf) {
    return new Promise((resolve, reject) => {
        if (!(buf instanceof Blob)) {
            return reject('bufferToImage - expected buf to be of type: Blob');
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                return reject('bufferToImage - expected reader.result to be a string, in onload');
            }
            const img = env_1.env.getEnv().createImageElement();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(buf);
    });
}
exports.bufferToImage = bufferToImage;
//# sourceMappingURL=bufferToImage.js.map