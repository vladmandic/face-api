import { IBoundingBox } from './BoundingBox';
import { LabeledBox } from './LabeledBox';
import { IRect } from './Rect';
export declare class PredictedBox extends LabeledBox {
    static assertIsValidPredictedBox(box: any, callee: string): void;
    private _score;
    private _classScore;
    constructor(box: IBoundingBox | IRect | any, label: number, score: number, classScore: number);
    get score(): number;
    get classScore(): number;
}
