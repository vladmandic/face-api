import * as tf from '@tensorflow/tfjs-core';
import { FaceDetection, Point } from '../classes';
import { ParamMapping } from '../common/types';
import { TNetInput } from '../dom/types';
import { TinyYolov2Base } from './TinyYolov2Base';
import { ITinyYolov2Options } from './TinyYolov2Options';
import { TinyYolov2NetParams } from './types';
export declare class TinyYolov2 extends TinyYolov2Base {
    constructor(withSeparableConvs?: boolean);
    get withSeparableConvs(): boolean;
    get anchors(): Point[];
    locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}
