"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawTextField = exports.DrawTextFieldOptions = exports.AnchorPosition = void 0;
const getContext2dOrThrow_1 = require("../dom/getContext2dOrThrow");
const resolveInput_1 = require("../dom/resolveInput");
var AnchorPosition;
(function (AnchorPosition) {
    AnchorPosition["TOP_LEFT"] = "TOP_LEFT";
    AnchorPosition["TOP_RIGHT"] = "TOP_RIGHT";
    AnchorPosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    AnchorPosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
})(AnchorPosition = exports.AnchorPosition || (exports.AnchorPosition = {}));
class DrawTextFieldOptions {
    constructor(options = {}) {
        const { anchorPosition, backgroundColor, fontColor, fontSize, fontStyle, padding } = options;
        this.anchorPosition = anchorPosition || AnchorPosition.TOP_LEFT;
        this.backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.5)';
        this.fontColor = fontColor || 'rgba(255, 255, 255, 1)';
        this.fontSize = fontSize || 14;
        this.fontStyle = fontStyle || 'Georgia';
        this.padding = padding || 4;
    }
}
exports.DrawTextFieldOptions = DrawTextFieldOptions;
class DrawTextField {
    constructor(text, anchor, options = {}) {
        this.text = typeof text === 'string'
            ? [text]
            : (text instanceof DrawTextField ? text.text : text);
        this.anchor = anchor;
        this.options = new DrawTextFieldOptions(options);
    }
    measureWidth(ctx) {
        const { padding } = this.options;
        return this.text.map(l => ctx.measureText(l).width).reduce((w0, w1) => w0 < w1 ? w1 : w0, 0) + (2 * padding);
    }
    measureHeight() {
        const { fontSize, padding } = this.options;
        return this.text.length * fontSize + (2 * padding);
    }
    getUpperLeft(ctx, canvasDims) {
        const { anchorPosition } = this.options;
        const isShiftLeft = anchorPosition === AnchorPosition.BOTTOM_RIGHT || anchorPosition === AnchorPosition.TOP_RIGHT;
        const isShiftTop = anchorPosition === AnchorPosition.BOTTOM_LEFT || anchorPosition === AnchorPosition.BOTTOM_RIGHT;
        const textFieldWidth = this.measureWidth(ctx);
        const textFieldHeight = this.measureHeight();
        const x = (isShiftLeft ? this.anchor.x - textFieldWidth : this.anchor.x);
        const y = isShiftTop ? this.anchor.y - textFieldHeight : this.anchor.y;
        // adjust anchor if text box exceeds canvas borders
        if (canvasDims) {
            const { width, height } = canvasDims;
            const newX = Math.max(Math.min(x, width - textFieldWidth), 0);
            const newY = Math.max(Math.min(y, height - textFieldHeight), 0);
            return { x: newX, y: newY };
        }
        return { x, y };
    }
    draw(canvasArg) {
        const canvas = resolveInput_1.resolveInput(canvasArg);
        const ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvas);
        const { backgroundColor, fontColor, fontSize, fontStyle, padding } = this.options;
        ctx.font = `${fontSize}px ${fontStyle}`;
        const maxTextWidth = this.measureWidth(ctx);
        const textHeight = this.measureHeight();
        ctx.fillStyle = backgroundColor;
        const upperLeft = this.getUpperLeft(ctx, canvas);
        ctx.fillRect(upperLeft.x, upperLeft.y, maxTextWidth, textHeight);
        ctx.fillStyle = fontColor;
        this.text.forEach((textLine, i) => {
            const x = padding + upperLeft.x;
            const y = padding + upperLeft.y + ((i + 1) * fontSize);
            ctx.fillText(textLine, x, y);
        });
    }
}
exports.DrawTextField = DrawTextField;
//# sourceMappingURL=DrawTextField.js.map