import { Box, IBoundingBox, IRect } from '../classes';
import { DrawTextFieldOptions, IDrawTextFieldOptions } from './DrawTextField';
export interface IDrawBoxOptions {
    boxColor?: string;
    lineWidth?: number;
    drawLabelOptions?: IDrawTextFieldOptions;
    label?: string;
}
export declare class DrawBoxOptions {
    boxColor: string;
    lineWidth: number;
    drawLabelOptions: DrawTextFieldOptions;
    label?: string;
    constructor(options?: IDrawBoxOptions);
}
export declare class DrawBox {
    box: Box;
    options: DrawBoxOptions;
    constructor(box: IBoundingBox | IRect, options?: IDrawBoxOptions);
    draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
}
