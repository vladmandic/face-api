import { IDimensions, IPoint } from '../classes';
export declare enum AnchorPosition {
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT"
}
export interface IDrawTextFieldOptions {
    anchorPosition?: AnchorPosition;
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: number;
    fontStyle?: string;
    padding?: number;
}
export declare class DrawTextFieldOptions implements IDrawTextFieldOptions {
    anchorPosition: AnchorPosition;
    backgroundColor: string;
    fontColor: string;
    fontSize: number;
    fontStyle: string;
    padding: number;
    constructor(options?: IDrawTextFieldOptions);
}
export declare class DrawTextField {
    text: string[];
    anchor: IPoint;
    options: DrawTextFieldOptions;
    constructor(text: string | string[] | DrawTextField, anchor: IPoint, options?: IDrawTextFieldOptions);
    measureWidth(ctx: CanvasRenderingContext2D): number;
    measureHeight(): number;
    getUpperLeft(ctx: CanvasRenderingContext2D, canvasDims?: IDimensions): IPoint;
    draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
}
