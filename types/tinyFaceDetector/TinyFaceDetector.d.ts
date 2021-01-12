import * as tf from '../../dist/tfjs.esm';
import { FaceDetection, Point } from '../classes/index';
import { ParamMapping } from '../common/index';
import { TNetInput } from '../dom/index';
import { ITinyYolov2Options } from '../tinyYolov2/index';
import { TinyYolov2Base } from '../tinyYolov2/TinyYolov2Base';
import { TinyYolov2NetParams } from '../tinyYolov2/types';
export declare class TinyFaceDetector extends TinyYolov2Base {
    constructor();
    get anchors(): Point[];
    locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}
