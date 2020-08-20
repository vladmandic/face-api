"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padToSquare = void 0;
const tf = require("@tensorflow/tfjs-core");
/**
 * Pads the smaller dimension of an image tensor with zeros, such that width === height.
 *
 * @param imgTensor The image tensor.
 * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
 * both sides of the minor dimension oof the image.
 * @returns The padded tensor with width === height.
 */
function padToSquare(imgTensor, isCenterImage = false) {
    return tf.tidy(() => {
        const [height, width] = imgTensor.shape.slice(1);
        if (height === width) {
            return imgTensor;
        }
        const dimDiff = Math.abs(height - width);
        const paddingAmount = Math.round(dimDiff * (isCenterImage ? 0.5 : 1));
        const paddingAxis = height > width ? 2 : 1;
        const createPaddingTensor = (paddingAmount) => {
            const paddingTensorShape = imgTensor.shape.slice();
            paddingTensorShape[paddingAxis] = paddingAmount;
            return tf.fill(paddingTensorShape, 0);
        };
        const paddingTensorAppend = createPaddingTensor(paddingAmount);
        const remainingPaddingAmount = dimDiff - paddingTensorAppend.shape[paddingAxis];
        const paddingTensorPrepend = isCenterImage && remainingPaddingAmount
            ? createPaddingTensor(remainingPaddingAmount)
            : null;
        const tensorsToStack = [
            paddingTensorPrepend,
            imgTensor,
            paddingTensorAppend
        ]
            .filter(t => !!t)
            .map((t) => t.toFloat());
        return tf.concat(tensorsToStack, paddingAxis);
    });
}
exports.padToSquare = padToSquare;
//# sourceMappingURL=padToSquare.js.map