import { IBoundingBox, IRect } from '../classes';
import { FaceDetection } from '../classes/FaceDetection';
import { WithFaceDetection } from '../factories/WithFaceDetection';
export declare type TDrawDetectionsInput = IRect | IBoundingBox | FaceDetection | WithFaceDetection<{}>;
export declare function drawDetections(canvasArg: string | HTMLCanvasElement, detections: TDrawDetectionsInput | Array<TDrawDetectionsInput>): void;
