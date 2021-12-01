import * as tf from '../../dist/tfjs.esm';
import { NetInput, TNetInput } from '../dom/index';
import { FaceFeatureExtractor } from '../faceFeatureExtractor/FaceFeatureExtractor';
import { FaceFeatureExtractorParams } from '../faceFeatureExtractor/types';
import { FaceProcessor } from '../faceProcessor/FaceProcessor';
export declare class FaceExpressionNet extends FaceProcessor<FaceFeatureExtractorParams> {
    constructor(faceFeatureExtractor?: FaceFeatureExtractor);
    forwardInput(input: NetInput | tf.Tensor4D): tf.Tensor2D;
    forward(input: TNetInput): Promise<tf.Tensor2D>;
    predictExpressions(input: TNetInput): Promise<any>;
    protected getDefaultModelName(): string;
    protected getClassifierChannelsIn(): number;
    protected getClassifierChannelsOut(): number;
}
