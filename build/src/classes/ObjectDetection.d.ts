import { Box } from './Box';
import { Dimensions, IDimensions } from './Dimensions';
import { IRect } from './Rect';
export declare class ObjectDetection {
    private _score;
    private _classScore;
    private _className;
    private _box;
    private _imageDims;
    constructor(score: number, classScore: number, className: string, relativeBox: IRect, imageDims: IDimensions);
    get score(): number;
    get classScore(): number;
    get className(): string;
    get box(): Box;
    get imageDims(): Dimensions;
    get imageWidth(): number;
    get imageHeight(): number;
    get relativeBox(): Box;
    forSize(width: number, height: number): ObjectDetection;
}
