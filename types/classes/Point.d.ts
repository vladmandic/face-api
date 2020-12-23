export interface IPoint {
    x: number;
    y: number;
}
export declare class Point implements IPoint {
    private _x;
    private _y;
    constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    add(pt: IPoint): Point;
    sub(pt: IPoint): Point;
    mul(pt: IPoint): Point;
    div(pt: IPoint): Point;
    abs(): Point;
    magnitude(): number;
    floor(): Point;
}
