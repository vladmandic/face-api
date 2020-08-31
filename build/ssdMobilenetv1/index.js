import { SsdMobilenetv1 } from './SsdMobilenetv1';
export * from './SsdMobilenetv1';
export * from './SsdMobilenetv1Options';
export function createSsdMobilenetv1(weights) {
    const net = new SsdMobilenetv1();
    net.extractWeights(weights);
    return net;
}
export function createFaceDetectionNet(weights) {
    return createSsdMobilenetv1(weights);
}
// alias for backward compatibily
export class FaceDetectionNet extends SsdMobilenetv1 {
}
//# sourceMappingURL=index.js.map