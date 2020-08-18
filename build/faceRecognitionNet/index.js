import { FaceRecognitionNet } from './FaceRecognitionNet';
export * from './FaceRecognitionNet';
export function createFaceRecognitionNet(weights) {
    const net = new FaceRecognitionNet();
    net.extractWeights(weights);
    return net;
}
//# sourceMappingURL=index.js.map