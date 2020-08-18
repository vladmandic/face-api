import { Box } from './Box';
export class Rect extends Box {
    constructor(x, y, width, height, allowNegativeDimensions = false) {
        super({ x, y, width, height }, allowNegativeDimensions);
    }
}
//# sourceMappingURL=Rect.js.map