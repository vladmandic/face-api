import { IPoint } from '../classes/index';
import { FaceExpressions } from '../faceExpressionNet/index';
import { WithFaceExpressions } from '../factories/WithFaceExpressions';
export declare type DrawFaceExpressionsInput = FaceExpressions | WithFaceExpressions<{}>;
export declare function drawFaceExpressions(canvasArg: string | HTMLCanvasElement, faceExpressions: DrawFaceExpressionsInput | Array<DrawFaceExpressionsInput>, minConfidence?: number, textFieldAnchor?: IPoint): void;
