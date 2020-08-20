import { Box } from './Box';
export class BoundingBox extends Box {
    constructor(left, top, right, bottom, allowNegativeDimensions = false) {
        super({ left, top, right, bottom }, allowNegativeDimensions);
    }
}
//# sourceMappingURL=BoundingBox.js.map