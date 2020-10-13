export declare enum TinyYolov2SizeType {
    XS = 224,
    SM = 320,
    MD = 416,
    LG = 608
}
export interface ITinyYolov2Options {
    inputSize?: number;
    scoreThreshold?: number;
}
export declare class TinyYolov2Options {
    protected _name: string;
    private _inputSize;
    private _scoreThreshold;
    constructor({ inputSize, scoreThreshold }?: ITinyYolov2Options);
    get inputSize(): number;
    get scoreThreshold(): number;
}
