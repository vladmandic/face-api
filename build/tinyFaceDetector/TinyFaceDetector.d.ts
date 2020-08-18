import * as tf from '@tensorflow/tfjs-core';
import { FaceDetection, Point } from '../classes';
import { ParamMapping } from '../common';
import { TNetInput } from '../dom';
import { ITinyYolov2Options } from '../tinyYolov2';
import { TinyYolov2Base } from '../tinyYolov2/TinyYolov2Base';
import { TinyYolov2NetParams } from '../tinyYolov2/types';
export declare class TinyFaceDetector extends TinyYolov2Base {
    constructor();
    get anchors(): Point[];
    locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}
