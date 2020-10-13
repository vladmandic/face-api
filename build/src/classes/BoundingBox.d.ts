import { Box } from './Box';
export interface IBoundingBox {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export declare class BoundingBox extends Box<BoundingBox> implements IBoundingBox {
    constructor(left: number, top: number, right: number, bottom: number, allowNegativeDimensions?: boolean);
}
