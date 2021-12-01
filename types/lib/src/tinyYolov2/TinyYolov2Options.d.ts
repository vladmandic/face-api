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
