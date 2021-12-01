import { Box } from './Box';

export interface IBoundingBox {
  left: number
  top: number
  right: number
  bottom: number
}

export class BoundingBox extends Box implements IBoundingBox {
  constructor(left: number, top: number, right: number, bottom: number, allowNegativeDimensions = false) {
    super({ left, top, right, bottom }, allowNegativeDimensions);
  }
}
