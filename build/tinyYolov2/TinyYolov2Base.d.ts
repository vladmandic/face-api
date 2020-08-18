import * as tf from '@tensorflow/tfjs-core';
import { BoundingBox } from '../classes/BoundingBox';
import { Dimensions } from '../classes/Dimensions';
import { ObjectDetection } from '../classes/ObjectDetection';
import { NetInput } from '../dom/NetInput';
import { TNetInput } from '../dom/types';
import { NeuralNetwork } from '../NeuralNetwork';
import { TinyYolov2Config } from './config';
import { ITinyYolov2Options } from './TinyYolov2Options';
import { DefaultTinyYolov2NetParams, MobilenetParams, TinyYolov2NetParams } from './types';
export declare class TinyYolov2Base extends NeuralNetwork<TinyYolov2NetParams> {
    static DEFAULT_FILTER_SIZES: number[];
    private _config;
    constructor(config: TinyYolov2Config);
    get config(): TinyYolov2Config;
    get withClassScores(): boolean;
    get boxEncodingSize(): number;
    runTinyYolov2(x: tf.Tensor4D, params: DefaultTinyYolov2NetParams): tf.Tensor4D;
    runMobilenet(x: tf.Tensor4D, params: MobilenetParams): tf.Tensor4D;
    forwardInput(input: NetInput, inputSize: number): tf.Tensor4D;
    forward(input: TNetInput, inputSize: number): Promise<tf.Tensor4D>;
    detect(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<ObjectDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyYolov2NetParams;
        paramMappings: import("../common").ParamMapping[];
    };
    protected extractBoxes(outputTensor: tf.Tensor4D, inputBlobDimensions: Dimensions, scoreThreshold?: number): Promise<{
        row: number;
        col: number;
        anchor: number;
        box: BoundingBox;
        score: number;
        classScore: number;
        label: number;
    }[]>;
    private extractPredictedClass;
}
