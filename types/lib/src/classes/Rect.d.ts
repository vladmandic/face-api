import { Box } from './Box';
export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class Rect extends Box implements IRect {
    constructor(x: number, y: number, width: number, height: number, allowNegativeDimensions?: boolean);
}
