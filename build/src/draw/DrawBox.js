import { Box } from '../classes';
import { getContext2dOrThrow } from '../dom/getContext2dOrThrow';
import { AnchorPosition, DrawTextField, DrawTextFieldOptions } from './DrawTextField';
export class DrawBoxOptions {
    constructor(options = {}) {
        const { boxColor, lineWidth, label, drawLabelOptions } = options;
        this.boxColor = boxColor || 'rgba(0, 0, 255, 1)';
        this.lineWidth = lineWidth || 2;
        this.label = label;
        const defaultDrawLabelOptions = {
            anchorPosition: AnchorPosition.BOTTOM_LEFT,
            backgroundColor: this.boxColor
        };
        this.drawLabelOptions = new DrawTextFieldOptions(Object.assign({}, defaultDrawLabelOptions, drawLabelOptions));
    }
}
export class DrawBox {
    constructor(box, options = {}) {
        this.box = new Box(box);
        this.options = new DrawBoxOptions(options);
    }
    draw(canvasArg) {
        const ctx = getContext2dOrThrow(canvasArg);
        const { boxColor, lineWidth } = this.options;
        const { x, y, width, height } = this.box;
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
        const { label } = this.options;
        if (label) {
            new DrawTextField([label], { x: x - (lineWidth / 2), y }, this.options.drawLabelOptions).draw(canvasArg);
        }
    }
}
//# sourceMappingURL=DrawBox.js.map