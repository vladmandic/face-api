/// <reference types="node" />
declare module "classes/Dimensions" {
    export interface IDimensions {
        width: number;
        height: number;
    }
    export class Dimensions implements IDimensions {
        private _width;
        private _height;
        constructor(width: number, height: number);
        get width(): number;
        get height(): number;
        reverse(): Dimensions;
    }
}
declare module "utils/index" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { Point } from "classes/index";
    import { Dimensions, IDimensions } from "classes/Dimensions";
    export function isTensor(tensor: any, dim: number): boolean;
    export function isTensor1D(tensor: any): tensor is tf.Tensor1D;
    export function isTensor2D(tensor: any): tensor is tf.Tensor2D;
    export function isTensor3D(tensor: any): tensor is tf.Tensor3D;
    export function isTensor4D(tensor: any): tensor is tf.Tensor4D;
    export function isFloat(num: number): boolean;
    export function isEven(num: number): boolean;
    export function round(num: number, prec?: number): number;
    export function isDimensions(obj: any): boolean;
    export function computeReshapedDimensions({ width, height }: IDimensions, inputSize: number): Dimensions;
    export function getCenterPoint(pts: Point[]): Point;
    export function range(num: number, start: number, step: number): number[];
    export function isValidNumber(num: any): boolean;
    export function isValidProbablitiy(num: any): boolean;
}
declare module "classes/Point" {
    export interface IPoint {
        x: number;
        y: number;
    }
    export class Point implements IPoint {
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
}
declare module "classes/Rect" {
    import { Box } from "classes/Box";
    export interface IRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    export class Rect extends Box<Rect> implements IRect {
        constructor(x: number, y: number, width: number, height: number, allowNegativeDimensions?: boolean);
    }
}
declare module "classes/Box" {
    import { IBoundingBox } from "classes/BoundingBox";
    import { IDimensions } from "classes/Dimensions";
    import { Point } from "classes/Point";
    import { IRect } from "classes/Rect";
    export class Box<BoxType = any> implements IBoundingBox, IRect {
        static isRect(rect: any): boolean;
        static assertIsValidBox(box: any, callee: string, allowNegativeDimensions?: boolean): void;
        private _x;
        private _y;
        private _width;
        private _height;
        constructor(_box: IBoundingBox | IRect, allowNegativeDimensions?: boolean);
        get x(): number;
        get y(): number;
        get width(): number;
        get height(): number;
        get left(): number;
        get top(): number;
        get right(): number;
        get bottom(): number;
        get area(): number;
        get topLeft(): Point;
        get topRight(): Point;
        get bottomLeft(): Point;
        get bottomRight(): Point;
        round(): Box<BoxType>;
        floor(): Box<BoxType>;
        toSquare(): Box<BoxType>;
        rescale(s: IDimensions | number): Box<BoxType>;
        pad(padX: number, padY: number): Box<BoxType>;
        clipAtImageBorders(imgWidth: number, imgHeight: number): Box<BoxType>;
        shift(sx: number, sy: number): Box<BoxType>;
        padAtBorders(imageHeight: number, imageWidth: number): {
            dy: number;
            edy: number;
            dx: number;
            edx: number;
            y: number;
            ey: number;
            x: number;
            ex: number;
            w: number;
            h: number;
        };
        calibrate(region: Box): Box<any>;
    }
}
declare module "classes/BoundingBox" {
    import { Box } from "classes/Box";
    export interface IBoundingBox {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    export class BoundingBox extends Box<BoundingBox> implements IBoundingBox {
        constructor(left: number, top: number, right: number, bottom: number, allowNegativeDimensions?: boolean);
    }
}
declare module "classes/ObjectDetection" {
    import { Box } from "classes/Box";
    import { Dimensions, IDimensions } from "classes/Dimensions";
    import { IRect } from "classes/Rect";
    export class ObjectDetection {
        private _score;
        private _classScore;
        private _className;
        private _box;
        private _imageDims;
        constructor(score: number, classScore: number, className: string, relativeBox: IRect, imageDims: IDimensions);
        get score(): number;
        get classScore(): number;
        get className(): string;
        get box(): Box;
        get imageDims(): Dimensions;
        get imageWidth(): number;
        get imageHeight(): number;
        get relativeBox(): Box;
        forSize(width: number, height: number): ObjectDetection;
    }
}
declare module "classes/FaceDetection" {
    import { Box } from "classes/Box";
    import { IDimensions } from "classes/Dimensions";
    import { ObjectDetection } from "classes/ObjectDetection";
    import { Rect } from "classes/Rect";
    export interface IFaceDetecion {
        score: number;
        box: Box;
    }
    export class FaceDetection extends ObjectDetection implements IFaceDetecion {
        constructor(score: number, relativeBox: Rect, imageDims: IDimensions);
        forSize(width: number, height: number): FaceDetection;
    }
}
declare module "ops/iou" {
    import { Box } from "classes/Box";
    export function iou(box1: Box, box2: Box, isIOU?: boolean): number;
}
declare module "ops/minBbox" {
    import { BoundingBox, IPoint } from "classes/index";
    export function minBbox(pts: IPoint[]): BoundingBox;
}
declare module "ops/nonMaxSuppression" {
    import { Box } from "classes/Box";
    export function nonMaxSuppression(boxes: Box[], scores: number[], iouThreshold: number, isIOU?: boolean): number[];
}
declare module "ops/normalize" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function normalize(x: tf.Tensor4D, meanRgb: number[]): tf.Tensor4D;
}
declare module "ops/padToSquare" {
    import * as tf from '../../dist/tfjs.esm.js';
    /**
     * Pads the smaller dimension of an image tensor with zeros, such that width === height.
     *
     * @param imgTensor The image tensor.
     * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
     * both sides of the minor dimension oof the image.
     * @returns The padded tensor with width === height.
     */
    export function padToSquare(imgTensor: tf.Tensor4D, isCenterImage?: boolean): tf.Tensor4D;
}
declare module "ops/shuffleArray" {
    export function shuffleArray(inputArray: any[]): any[];
}
declare module "ops/index" {
    export * from "ops/iou";
    export * from "ops/minBbox";
    export * from "ops/nonMaxSuppression";
    export * from "ops/normalize";
    export * from "ops/padToSquare";
    export * from "ops/shuffleArray";
    export function sigmoid(x: number): number;
    export function inverseSigmoid(x: number): number;
}
declare module "classes/FaceLandmarks" {
    import { IBoundingBox } from "classes/BoundingBox";
    import { Box } from "classes/Box";
    import { Dimensions, IDimensions } from "classes/Dimensions";
    import { FaceDetection } from "classes/FaceDetection";
    import { Point } from "classes/Point";
    import { IRect } from "classes/Rect";
    export interface IFaceLandmarks {
        positions: Point[];
        shift: Point;
    }
    export class FaceLandmarks implements IFaceLandmarks {
        protected _shift: Point;
        protected _positions: Point[];
        protected _imgDims: Dimensions;
        constructor(relativeFaceLandmarkPositions: Point[], imgDims: IDimensions, shift?: Point);
        get shift(): Point;
        get imageWidth(): number;
        get imageHeight(): number;
        get positions(): Point[];
        get relativePositions(): Point[];
        forSize<T extends FaceLandmarks>(width: number, height: number): T;
        shiftBy<T extends FaceLandmarks>(x: number, y: number): T;
        shiftByPoint<T extends FaceLandmarks>(pt: Point): T;
        /**
         * Aligns the face landmarks after face detection from the relative positions of the faces
         * bounding box, or it's current shift. This function should be used to align the face images
         * after face detection has been performed, before they are passed to the face recognition net.
         * This will make the computed face descriptor more accurate.
         *
         * @param detection (optional) The bounding box of the face or the face detection result. If
         * no argument was passed the position of the face landmarks are assumed to be relative to
         * it's current shift.
         * @returns The bounding box of the aligned face.
         */
        align(detection?: FaceDetection | IRect | IBoundingBox | null, options?: {
            useDlibAlignment?: boolean;
            minBoxPadding?: number;
        }): Box;
        private alignDlib;
        private alignMinBbox;
        protected getRefPointsForAlignment(): Point[];
    }
}
declare module "classes/FaceLandmarks5" {
    import { FaceLandmarks } from "classes/FaceLandmarks";
    import { Point } from "classes/Point";
    export class FaceLandmarks5 extends FaceLandmarks {
        protected getRefPointsForAlignment(): Point[];
    }
}
declare module "classes/FaceLandmarks68" {
    import { FaceLandmarks } from "classes/FaceLandmarks";
    import { Point } from "classes/Point";
    export class FaceLandmarks68 extends FaceLandmarks {
        getJawOutline(): Point[];
        getLeftEyeBrow(): Point[];
        getRightEyeBrow(): Point[];
        getNose(): Point[];
        getLeftEye(): Point[];
        getRightEye(): Point[];
        getMouth(): Point[];
        protected getRefPointsForAlignment(): Point[];
    }
}
declare module "classes/FaceMatch" {
    export interface IFaceMatch {
        label: string;
        distance: number;
    }
    export class FaceMatch implements IFaceMatch {
        private _label;
        private _distance;
        constructor(label: string, distance: number);
        get label(): string;
        get distance(): number;
        toString(withDistance?: boolean): string;
    }
}
declare module "classes/LabeledBox" {
    import { IBoundingBox } from "classes/BoundingBox";
    import { Box } from "classes/Box";
    import { IRect } from "classes/Rect";
    export class LabeledBox extends Box<LabeledBox> {
        static assertIsValidLabeledBox(box: any, callee: string): void;
        private _label;
        constructor(box: IBoundingBox | IRect | any, label: number);
        get label(): number;
    }
}
declare module "classes/LabeledFaceDescriptors" {
    export class LabeledFaceDescriptors {
        private _label;
        private _descriptors;
        constructor(label: string, descriptors: Float32Array[]);
        get label(): string;
        get descriptors(): Float32Array[];
        toJSON(): any;
        static fromJSON(json: any): LabeledFaceDescriptors;
    }
}
declare module "classes/PredictedBox" {
    import { IBoundingBox } from "classes/BoundingBox";
    import { LabeledBox } from "classes/LabeledBox";
    import { IRect } from "classes/Rect";
    export class PredictedBox extends LabeledBox {
        static assertIsValidPredictedBox(box: any, callee: string): void;
        private _score;
        private _classScore;
        constructor(box: IBoundingBox | IRect | any, label: number, score: number, classScore: number);
        get score(): number;
        get classScore(): number;
    }
}
declare module "classes/index" {
    export * from "classes/BoundingBox";
    export * from "classes/Box";
    export * from "classes/Dimensions";
    export * from "classes/FaceDetection";
    export * from "classes/FaceLandmarks";
    export * from "classes/FaceLandmarks5";
    export * from "classes/FaceLandmarks68";
    export * from "classes/FaceMatch";
    export * from "classes/LabeledBox";
    export * from "classes/LabeledFaceDescriptors";
    export * from "classes/ObjectDetection";
    export * from "classes/Point";
    export * from "classes/PredictedBox";
    export * from "classes/Rect";
}
declare module "draw/drawContour" {
    import { Point } from "classes/index";
    export function drawContour(ctx: CanvasRenderingContext2D, points: Point[], isClosed?: boolean): void;
}
declare module "factories/WithFaceDetection" {
    import { FaceDetection } from "classes/FaceDetection";
    export type WithFaceDetection<TSource> = TSource & {
        detection: FaceDetection;
    };
    export function isWithFaceDetection(obj: any): obj is WithFaceDetection<{}>;
    export function extendWithFaceDetection<TSource>(sourceObj: TSource, detection: FaceDetection): WithFaceDetection<TSource>;
}
declare module "env/types" {
    export type FileSystem = {
        readFile: (filePath: string) => Promise<Buffer>;
    };
    export type Environment = FileSystem & {
        Canvas: typeof HTMLCanvasElement;
        CanvasRenderingContext2D: typeof CanvasRenderingContext2D;
        Image: typeof HTMLImageElement;
        ImageData: typeof ImageData;
        Video: typeof HTMLVideoElement;
        createCanvasElement: () => HTMLCanvasElement;
        createImageElement: () => HTMLImageElement;
        fetch: (url: string, init?: RequestInit) => Promise<Response>;
    };
}
declare module "env/createBrowserEnv" {
    import { Environment } from "env/types";
    export function createBrowserEnv(): Environment;
}
declare module "env/createFileSystem" {
    import { FileSystem } from "env/types";
    export function createFileSystem(fs?: any): FileSystem;
}
declare module "env/createNodejsEnv" {
    import { Environment } from "env/types";
    export function createNodejsEnv(): Environment;
}
declare module "env/isBrowser" {
    export function isBrowser(): boolean;
}
declare module "env/isNodejs" {
    export function isNodejs(): boolean;
}
declare module "env/index" {
    import { createBrowserEnv } from "env/createBrowserEnv";
    import { createFileSystem } from "env/createFileSystem";
    import { createNodejsEnv } from "env/createNodejsEnv";
    import { isBrowser } from "env/isBrowser";
    import { isNodejs } from "env/isNodejs";
    import { Environment } from "env/types";
    function getEnv(): Environment;
    function setEnv(env: Environment): void;
    function initialize(): void;
    function monkeyPatch(env: Partial<Environment>): void;
    export const env: {
        getEnv: typeof getEnv;
        setEnv: typeof setEnv;
        initialize: typeof initialize;
        createBrowserEnv: typeof createBrowserEnv;
        createFileSystem: typeof createFileSystem;
        createNodejsEnv: typeof createNodejsEnv;
        monkeyPatch: typeof monkeyPatch;
        isBrowser: typeof isBrowser;
        isNodejs: typeof isNodejs;
    };
    export * from "env/types";
}
declare module "dom/resolveInput" {
    export function resolveInput(arg: string | any): any;
}
declare module "dom/getContext2dOrThrow" {
    export function getContext2dOrThrow(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): CanvasRenderingContext2D;
}
declare module "draw/DrawTextField" {
    import { IDimensions, IPoint } from "classes/index";
    export enum AnchorPosition {
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
    export class DrawTextFieldOptions implements IDrawTextFieldOptions {
        anchorPosition: AnchorPosition;
        backgroundColor: string;
        fontColor: string;
        fontSize: number;
        fontStyle: string;
        padding: number;
        constructor(options?: IDrawTextFieldOptions);
    }
    export class DrawTextField {
        text: string[];
        anchor: IPoint;
        options: DrawTextFieldOptions;
        constructor(text: string | string[] | DrawTextField, anchor: IPoint, options?: IDrawTextFieldOptions);
        measureWidth(ctx: CanvasRenderingContext2D): number;
        measureHeight(): number;
        getUpperLeft(ctx: CanvasRenderingContext2D, canvasDims?: IDimensions): IPoint;
        draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
    }
}
declare module "draw/DrawBox" {
    import { Box, IBoundingBox, IRect } from "classes/index";
    import { DrawTextFieldOptions, IDrawTextFieldOptions } from "draw/DrawTextField";
    export interface IDrawBoxOptions {
        boxColor?: string;
        lineWidth?: number;
        drawLabelOptions?: IDrawTextFieldOptions;
        label?: string;
    }
    export class DrawBoxOptions {
        boxColor: string;
        lineWidth: number;
        drawLabelOptions: DrawTextFieldOptions;
        label?: string;
        constructor(options?: IDrawBoxOptions);
    }
    export class DrawBox {
        box: Box;
        options: DrawBoxOptions;
        constructor(box: IBoundingBox | IRect, options?: IDrawBoxOptions);
        draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
    }
}
declare module "draw/drawDetections" {
    import { IBoundingBox, IRect } from "classes/index";
    import { FaceDetection } from "classes/FaceDetection";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    export type TDrawDetectionsInput = IRect | IBoundingBox | FaceDetection | WithFaceDetection<{}>;
    export function drawDetections(canvasArg: string | HTMLCanvasElement, detections: TDrawDetectionsInput | Array<TDrawDetectionsInput>): void;
}
declare module "dom/isMediaLoaded" {
    export function isMediaLoaded(media: HTMLImageElement | HTMLVideoElement): boolean;
}
declare module "dom/awaitMediaLoaded" {
    export function awaitMediaLoaded(media: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<unknown>;
}
declare module "dom/bufferToImage" {
    export function bufferToImage(buf: Blob): Promise<HTMLImageElement>;
}
declare module "dom/getMediaDimensions" {
    import { Dimensions, IDimensions } from "classes/Dimensions";
    export function getMediaDimensions(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | IDimensions): Dimensions;
}
declare module "dom/createCanvas" {
    import { IDimensions } from "classes/Dimensions";
    export function createCanvas({ width, height }: IDimensions): HTMLCanvasElement;
    export function createCanvasFromMedia(media: HTMLImageElement | HTMLVideoElement | ImageData, dims?: IDimensions): HTMLCanvasElement;
}
declare module "dom/imageTensorToCanvas" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function imageTensorToCanvas(imgTensor: tf.Tensor, canvas?: HTMLCanvasElement): Promise<HTMLCanvasElement>;
}
declare module "dom/isMediaElement" {
    export function isMediaElement(input: any): boolean;
}
declare module "dom/imageToSquare" {
    export function imageToSquare(input: HTMLImageElement | HTMLCanvasElement, inputSize: number, centerImage?: boolean): HTMLCanvasElement;
}
declare module "dom/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput } from "dom/NetInput";
    export type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
    export type TResolvedNetInput = TMediaElement | tf.Tensor3D | tf.Tensor4D;
    export type TNetInputArg = string | TResolvedNetInput;
    export type TNetInput = TNetInputArg | Array<TNetInputArg> | NetInput | tf.Tensor4D;
}
declare module "dom/NetInput" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { Dimensions } from "classes/Dimensions";
    import { TResolvedNetInput } from "dom/types";
    export class NetInput {
        private _imageTensors;
        private _canvases;
        private _batchSize;
        private _treatAsBatchInput;
        private _inputDimensions;
        private _inputSize;
        constructor(inputs: Array<TResolvedNetInput>, treatAsBatchInput?: boolean);
        get imageTensors(): Array<tf.Tensor3D | tf.Tensor4D>;
        get canvases(): HTMLCanvasElement[];
        get isBatchInput(): boolean;
        get batchSize(): number;
        get inputDimensions(): number[][];
        get inputSize(): number | undefined;
        get reshapedInputDimensions(): Dimensions[];
        getInput(batchIdx: number): tf.Tensor3D | tf.Tensor4D | HTMLCanvasElement;
        getInputDimensions(batchIdx: number): number[];
        getInputHeight(batchIdx: number): number;
        getInputWidth(batchIdx: number): number;
        getReshapedInputDimensions(batchIdx: number): Dimensions;
        /**
         * Create a batch tensor from all input canvases and tensors
         * with size [batchSize, inputSize, inputSize, 3].
         *
         * @param inputSize Height and width of the tensor.
         * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
         * both sides of the minor dimension oof the image.
         * @returns The batch tensor.
         */
        toBatchTensor(inputSize: number, isCenterInputs?: boolean): tf.Tensor4D;
    }
}
declare module "dom/toNetInput" {
    import { NetInput } from "dom/NetInput";
    import { TNetInput } from "dom/types";
    /**
     * Validates the input to make sure, they are valid net inputs and awaits all media elements
     * to be finished loading.
     *
     * @param input The input, which can be a media element or an array of different media elements.
     * @returns A NetInput instance, which can be passed into one of the neural networks.
     */
    export function toNetInput(inputs: TNetInput): Promise<NetInput>;
}
declare module "dom/extractFaces" {
    import { FaceDetection } from "classes/FaceDetection";
    import { Rect } from "classes/Rect";
    import { TNetInput } from "dom/types";
    /**
     * Extracts the image regions containing the detected faces.
     *
     * @param input The image that face detection has been performed on.
     * @param detections The face detection results or face bounding boxes for that image.
     * @returns The Canvases of the corresponding image region for each detected face.
     */
    export function extractFaces(input: TNetInput, detections: Array<FaceDetection | Rect>): Promise<HTMLCanvasElement[]>;
}
declare module "dom/extractFaceTensors" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { Rect } from "classes/index";
    import { FaceDetection } from "classes/FaceDetection";
    /**
     * Extracts the tensors of the image regions containing the detected faces.
     * Useful if you want to compute the face descriptors for the face images.
     * Using this method is faster then extracting a canvas for each face and
     * converting them to tensors individually.
     *
     * @param imageTensor The image tensor that face detection has been performed on.
     * @param detections The face detection results or face bounding boxes for that image.
     * @returns Tensors of the corresponding image region for each detected face.
     */
    export function extractFaceTensors(imageTensor: tf.Tensor3D | tf.Tensor4D, detections: Array<FaceDetection | Rect>): Promise<tf.Tensor3D[]>;
}
declare module "dom/fetchOrThrow" {
    export function fetchOrThrow(url: string, init?: RequestInit): Promise<Response>;
}
declare module "dom/fetchImage" {
    export function fetchImage(uri: string): Promise<HTMLImageElement>;
}
declare module "dom/fetchJson" {
    export function fetchJson<T>(uri: string): Promise<T>;
}
declare module "dom/fetchNetWeights" {
    export function fetchNetWeights(uri: string): Promise<Float32Array>;
}
declare module "common/getModelUris" {
    export function getModelUris(uri: string | undefined, defaultModelName: string): {
        modelBaseUri: string;
        manifestUri: string;
    };
}
declare module "dom/loadWeightMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function loadWeightMap(uri: string | undefined, defaultModelName: string): Promise<tf.NamedTensorMap>;
}
declare module "dom/matchDimensions" {
    import { IDimensions } from "classes/index";
    export function matchDimensions(input: IDimensions, reference: IDimensions, useMediaDimensions?: boolean): {
        width: number;
        height: number;
    };
}
declare module "dom/index" {
    export * from "dom/awaitMediaLoaded";
    export * from "dom/bufferToImage";
    export * from "dom/createCanvas";
    export * from "dom/extractFaces";
    export * from "dom/extractFaceTensors";
    export * from "dom/fetchImage";
    export * from "dom/fetchJson";
    export * from "dom/fetchNetWeights";
    export * from "dom/fetchOrThrow";
    export * from "dom/getContext2dOrThrow";
    export * from "dom/getMediaDimensions";
    export * from "dom/imageTensorToCanvas";
    export * from "dom/imageToSquare";
    export * from "dom/isMediaElement";
    export * from "dom/isMediaLoaded";
    export * from "dom/loadWeightMap";
    export * from "dom/matchDimensions";
    export * from "dom/NetInput";
    export * from "dom/resolveInput";
    export * from "dom/toNetInput";
    export * from "dom/types";
}
declare module "common/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    export type ExtractWeightsFunction = (numWeights: number) => Float32Array;
    export type ParamMapping = {
        originalPath?: string;
        paramPath: string;
    };
    export type ConvParams = {
        filters: tf.Tensor4D;
        bias: tf.Tensor1D;
    };
    export type FCParams = {
        weights: tf.Tensor2D;
        bias: tf.Tensor1D;
    };
    export class SeparableConvParams {
        depthwise_filter: tf.Tensor4D;
        pointwise_filter: tf.Tensor4D;
        bias: tf.Tensor1D;
        constructor(depthwise_filter: tf.Tensor4D, pointwise_filter: tf.Tensor4D, bias: tf.Tensor1D);
    }
}
declare module "common/convLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvParams } from "common/types";
    export function convLayer(x: tf.Tensor4D, params: ConvParams, padding?: 'valid' | 'same', withRelu?: boolean): tf.Tensor4D;
}
declare module "common/depthwiseSeparableConv" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { SeparableConvParams } from "common/types";
    export function depthwiseSeparableConv(x: tf.Tensor4D, params: SeparableConvParams, stride: [number, number]): tf.Tensor4D;
}
declare module "common/disposeUnusedWeightTensors" {
    import { ParamMapping } from "common/types";
    export function disposeUnusedWeightTensors(weightMap: any, paramMappings: ParamMapping[]): void;
}
declare module "common/extractConvParamsFactory" {
    import { ConvParams, ExtractWeightsFunction, ParamMapping } from "common/types";
    export function extractConvParamsFactory(extractWeights: ExtractWeightsFunction, paramMappings: ParamMapping[]): (channelsIn: number, channelsOut: number, filterSize: number, mappedPrefix: string) => ConvParams;
}
declare module "common/extractFCParamsFactory" {
    import { ExtractWeightsFunction, FCParams, ParamMapping } from "common/types";
    export function extractFCParamsFactory(extractWeights: ExtractWeightsFunction, paramMappings: ParamMapping[]): (channelsIn: number, channelsOut: number, mappedPrefix: string) => FCParams;
}
declare module "common/extractSeparableConvParamsFactory" {
    import { ExtractWeightsFunction, ParamMapping, SeparableConvParams } from "common/types";
    export function extractSeparableConvParamsFactory(extractWeights: ExtractWeightsFunction, paramMappings: ParamMapping[]): (channelsIn: number, channelsOut: number, mappedPrefix: string) => SeparableConvParams;
    export function loadSeparableConvParamsFactory(extractWeightEntry: <T>(originalPath: string, paramRank: number) => T): (prefix: string) => SeparableConvParams;
}
declare module "common/extractWeightEntryFactory" {
    import { ParamMapping } from "common/types";
    export function extractWeightEntryFactory(weightMap: any, paramMappings: ParamMapping[]): <T>(originalPath: string, paramRank: number, mappedPath?: string | undefined) => T;
}
declare module "common/extractWeightsFactory" {
    export function extractWeightsFactory(weights: Float32Array): {
        extractWeights: (numWeights: number) => Float32Array;
        getRemainingWeights: () => Float32Array;
    };
}
declare module "common/index" {
    export * from "common/convLayer";
    export * from "common/depthwiseSeparableConv";
    export * from "common/disposeUnusedWeightTensors";
    export * from "common/extractConvParamsFactory";
    export * from "common/extractFCParamsFactory";
    export * from "common/extractSeparableConvParamsFactory";
    export * from "common/extractWeightEntryFactory";
    export * from "common/extractWeightsFactory";
    export * from "common/getModelUris";
    export * from "common/types";
}
declare module "NeuralNetwork" {
    import * as tf from '../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    export abstract class NeuralNetwork<TNetParams> {
        protected _name: string;
        protected _params: TNetParams | undefined;
        protected _paramMappings: ParamMapping[];
        constructor(_name: string);
        get params(): TNetParams | undefined;
        get paramMappings(): ParamMapping[];
        get isLoaded(): boolean;
        getParamFromPath(paramPath: string): tf.Tensor;
        reassignParamFromPath(paramPath: string, tensor: tf.Tensor): void;
        getParamList(): {
            path: string;
            tensor: any;
        }[];
        getTrainableParams(): {
            path: string;
            tensor: any;
        }[];
        getFrozenParams(): {
            path: string;
            tensor: any;
        }[];
        variable(): void;
        freeze(): void;
        dispose(throwOnRedispose?: boolean): void;
        serializeParams(): Float32Array;
        load(weightsOrUrl: Float32Array | string | undefined): Promise<void>;
        loadFromUri(uri: string | undefined): Promise<void>;
        loadFromDisk(filePath: string | undefined): Promise<void>;
        loadFromWeightMap(weightMap: tf.NamedTensorMap): void;
        extractWeights(weights: Float32Array): void;
        private traversePropertyPath;
        protected abstract getDefaultModelName(): string;
        protected abstract extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TNetParams;
            paramMappings: ParamMapping[];
        };
        protected abstract extractParams(weights: Float32Array): {
            params: TNetParams;
            paramMappings: ParamMapping[];
        };
    }
}
declare module "faceFeatureExtractor/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "index";
    import { ConvParams, SeparableConvParams } from "common/index";
    import { NeuralNetwork } from "NeuralNetwork";
    export type ConvWithBatchNormParams = BatchNormParams & {
        filter: tf.Tensor4D;
    };
    export type BatchNormParams = {
        mean: tf.Tensor1D;
        variance: tf.Tensor1D;
        scale: tf.Tensor1D;
        offset: tf.Tensor1D;
    };
    export type SeparableConvWithBatchNormParams = {
        depthwise: ConvWithBatchNormParams;
        pointwise: ConvWithBatchNormParams;
    };
    export type DenseBlock3Params = {
        conv0: SeparableConvParams | ConvParams;
        conv1: SeparableConvParams;
        conv2: SeparableConvParams;
    };
    export type DenseBlock4Params = DenseBlock3Params & {
        conv3: SeparableConvParams;
    };
    export type TinyFaceFeatureExtractorParams = {
        dense0: DenseBlock3Params;
        dense1: DenseBlock3Params;
        dense2: DenseBlock3Params;
    };
    export type FaceFeatureExtractorParams = {
        dense0: DenseBlock4Params;
        dense1: DenseBlock4Params;
        dense2: DenseBlock4Params;
        dense3: DenseBlock4Params;
    };
    export interface IFaceFeatureExtractor<TNetParams extends TinyFaceFeatureExtractorParams | FaceFeatureExtractorParams> extends NeuralNetwork<TNetParams> {
        forwardInput(input: NetInput): tf.Tensor4D;
        forward(input: TNetInput): Promise<tf.Tensor4D>;
    }
}
declare module "faceFeatureExtractor/denseBlock" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { DenseBlock3Params, DenseBlock4Params } from "faceFeatureExtractor/types";
    export function denseBlock3(x: tf.Tensor4D, denseBlockParams: DenseBlock3Params, isFirstLayer?: boolean): tf.Tensor4D;
    export function denseBlock4(x: tf.Tensor4D, denseBlockParams: DenseBlock4Params, isFirstLayer?: boolean, isScaleDown?: boolean): tf.Tensor4D;
}
declare module "faceFeatureExtractor/extractorsFactory" {
    import { ExtractWeightsFunction, ParamMapping } from "common/index";
    import { DenseBlock3Params, DenseBlock4Params } from "faceFeatureExtractor/types";
    export function extractorsFactory(extractWeights: ExtractWeightsFunction, paramMappings: ParamMapping[]): {
        extractDenseBlock3Params: (channelsIn: number, channelsOut: number, mappedPrefix: string, isFirstLayer?: boolean) => DenseBlock3Params;
        extractDenseBlock4Params: (channelsIn: number, channelsOut: number, mappedPrefix: string, isFirstLayer?: boolean) => DenseBlock4Params;
    };
}
declare module "faceFeatureExtractor/extractParams" {
    import { ParamMapping } from "common/index";
    import { FaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    export function extractParams(weights: Float32Array): {
        params: FaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}
declare module "common/loadConvParamsFactory" {
    import { ConvParams } from "common/types";
    export function loadConvParamsFactory(extractWeightEntry: <T>(originalPath: string, paramRank: number) => T): (prefix: string) => ConvParams;
}
declare module "faceFeatureExtractor/loadParamsFactory" {
    import { ParamMapping } from "common/index";
    import { DenseBlock3Params, DenseBlock4Params } from "faceFeatureExtractor/types";
    export function loadParamsFactory(weightMap: any, paramMappings: ParamMapping[]): {
        extractDenseBlock3Params: (prefix: string, isFirstLayer?: boolean) => DenseBlock3Params;
        extractDenseBlock4Params: (prefix: string, isFirstLayer?: boolean) => DenseBlock4Params;
    };
}
declare module "faceFeatureExtractor/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { FaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: FaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceFeatureExtractor/FaceFeatureExtractor" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "dom/index";
    import { NeuralNetwork } from "NeuralNetwork";
    import { FaceFeatureExtractorParams, IFaceFeatureExtractor } from "faceFeatureExtractor/types";
    export class FaceFeatureExtractor extends NeuralNetwork<FaceFeatureExtractorParams> implements IFaceFeatureExtractor<FaceFeatureExtractorParams> {
        constructor();
        forwardInput(input: NetInput): tf.Tensor4D;
        forward(input: TNetInput): Promise<tf.Tensor4D>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: FaceFeatureExtractorParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: FaceFeatureExtractorParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "common/fullyConnectedLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FCParams } from "common/types";
    export function fullyConnectedLayer(x: tf.Tensor2D, params: FCParams): tf.Tensor2D;
}
declare module "faceProcessor/types" {
    import { FCParams } from "common/index";
    export type NetParams = {
        fc: FCParams;
    };
}
declare module "faceProcessor/extractParams" {
    import { ParamMapping } from "common/index";
    import { NetParams } from "faceProcessor/types";
    export function extractParams(weights: Float32Array, channelsIn: number, channelsOut: number): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceProcessor/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { NetParams } from "faceProcessor/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceProcessor/util" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function seperateWeightMaps(weightMap: tf.NamedTensorMap): {
        featureExtractorMap: any;
        classifierMap: any;
    };
}
declare module "faceProcessor/FaceProcessor" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput } from "dom/index";
    import { FaceFeatureExtractorParams, IFaceFeatureExtractor, TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    import { NeuralNetwork } from "NeuralNetwork";
    import { NetParams } from "faceProcessor/types";
    export abstract class FaceProcessor<TExtractorParams extends FaceFeatureExtractorParams | TinyFaceFeatureExtractorParams> extends NeuralNetwork<NetParams> {
        protected _faceFeatureExtractor: IFaceFeatureExtractor<TExtractorParams>;
        constructor(_name: string, faceFeatureExtractor: IFaceFeatureExtractor<TExtractorParams>);
        get faceFeatureExtractor(): IFaceFeatureExtractor<TExtractorParams>;
        protected abstract getDefaultModelName(): string;
        protected abstract getClassifierChannelsIn(): number;
        protected abstract getClassifierChannelsOut(): number;
        runNet(input: NetInput | tf.Tensor4D): tf.Tensor2D;
        dispose(throwOnRedispose?: boolean): void;
        loadClassifierParams(weights: Float32Array): void;
        extractClassifierParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "faceExpressionNet/FaceExpressions" {
    export const FACE_EXPRESSION_LABELS: string[];
    export class FaceExpressions {
        neutral: number;
        happy: number;
        sad: number;
        angry: number;
        fearful: number;
        disgusted: number;
        surprised: number;
        constructor(probabilities: number[] | Float32Array);
        asSortedArray(): {
            expression: string;
            probability: number;
        }[];
    }
}
declare module "faceExpressionNet/FaceExpressionNet" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "dom/index";
    import { FaceFeatureExtractor } from "faceFeatureExtractor/FaceFeatureExtractor";
    import { FaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    import { FaceProcessor } from "faceProcessor/FaceProcessor";
    import { FaceExpressions } from "faceExpressionNet/FaceExpressions";
    export class FaceExpressionNet extends FaceProcessor<FaceFeatureExtractorParams> {
        constructor(faceFeatureExtractor?: FaceFeatureExtractor);
        forwardInput(input: NetInput | tf.Tensor4D): tf.Tensor2D;
        forward(input: TNetInput): Promise<tf.Tensor2D>;
        predictExpressions(input: TNetInput): Promise<FaceExpressions | FaceExpressions[]>;
        protected getDefaultModelName(): string;
        protected getClassifierChannelsIn(): number;
        protected getClassifierChannelsOut(): number;
    }
}
declare module "faceExpressionNet/index" {
    export * from "faceExpressionNet/FaceExpressionNet";
    export * from "faceExpressionNet/FaceExpressions";
}
declare module "factories/WithFaceExpressions" {
    import { FaceExpressions } from "faceExpressionNet/FaceExpressions";
    export type WithFaceExpressions<TSource> = TSource & {
        expressions: FaceExpressions;
    };
    export function isWithFaceExpressions(obj: any): obj is WithFaceExpressions<{}>;
    export function extendWithFaceExpressions<TSource>(sourceObj: TSource, expressions: FaceExpressions): WithFaceExpressions<TSource>;
}
declare module "draw/drawFaceExpressions" {
    import { IPoint } from "classes/index";
    import { FaceExpressions } from "faceExpressionNet/index";
    import { WithFaceExpressions } from "factories/WithFaceExpressions";
    export type DrawFaceExpressionsInput = FaceExpressions | WithFaceExpressions<{}>;
    export function drawFaceExpressions(canvasArg: string | HTMLCanvasElement, faceExpressions: DrawFaceExpressionsInput | Array<DrawFaceExpressionsInput>, minConfidence?: number, textFieldAnchor?: IPoint): void;
}
declare module "factories/WithFaceLandmarks" {
    import { FaceDetection } from "classes/FaceDetection";
    import { FaceLandmarks } from "classes/FaceLandmarks";
    import { FaceLandmarks68 } from "classes/FaceLandmarks68";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    export type WithFaceLandmarks<TSource extends WithFaceDetection<{}>, TFaceLandmarks extends FaceLandmarks = FaceLandmarks68> = TSource & {
        landmarks: TFaceLandmarks;
        unshiftedLandmarks: TFaceLandmarks;
        alignedRect: FaceDetection;
    };
    export function isWithFaceLandmarks(obj: any): obj is WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks>;
    export function extendWithFaceLandmarks<TSource extends WithFaceDetection<{}>, TFaceLandmarks extends FaceLandmarks = FaceLandmarks68>(sourceObj: TSource, unshiftedLandmarks: TFaceLandmarks): WithFaceLandmarks<TSource, TFaceLandmarks>;
}
declare module "draw/DrawFaceLandmarks" {
    import { FaceLandmarks } from "classes/FaceLandmarks";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    export interface IDrawFaceLandmarksOptions {
        drawLines?: boolean;
        drawPoints?: boolean;
        lineWidth?: number;
        pointSize?: number;
        lineColor?: string;
        pointColor?: string;
    }
    export class DrawFaceLandmarksOptions {
        drawLines: boolean;
        drawPoints: boolean;
        lineWidth: number;
        pointSize: number;
        lineColor: string;
        pointColor: string;
        constructor(options?: IDrawFaceLandmarksOptions);
    }
    export class DrawFaceLandmarks {
        faceLandmarks: FaceLandmarks;
        options: DrawFaceLandmarksOptions;
        constructor(faceLandmarks: FaceLandmarks, options?: IDrawFaceLandmarksOptions);
        draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
    }
    export type DrawFaceLandmarksInput = FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>>;
    export function drawFaceLandmarks(canvasArg: string | HTMLCanvasElement, faceLandmarks: DrawFaceLandmarksInput | Array<DrawFaceLandmarksInput>): void;
}
declare module "draw/index" {
    export * from "draw/drawContour";
    export * from "draw/drawDetections";
    export * from "draw/drawFaceExpressions";
    export * from "draw/DrawBox";
    export * from "draw/DrawFaceLandmarks";
    export * from "draw/DrawTextField";
}
declare module "xception/types" {
    import { ConvParams, SeparableConvParams } from "common/index";
    export type ReductionBlockParams = {
        separable_conv0: SeparableConvParams;
        separable_conv1: SeparableConvParams;
        expansion_conv: ConvParams;
    };
    export type MainBlockParams = {
        separable_conv0: SeparableConvParams;
        separable_conv1: SeparableConvParams;
        separable_conv2: SeparableConvParams;
    };
    export type TinyXceptionParams = {
        entry_flow: {
            conv_in: ConvParams;
            reduction_block_0: ReductionBlockParams;
            reduction_block_1: ReductionBlockParams;
        };
        middle_flow: any;
        exit_flow: {
            reduction_block: ReductionBlockParams;
            separable_conv: SeparableConvParams;
        };
    };
}
declare module "xception/extractParams" {
    import { ParamMapping } from "common/types";
    import { TinyXceptionParams } from "xception/types";
    export function extractParams(weights: Float32Array, numMainBlocks: number): {
        params: TinyXceptionParams;
        paramMappings: ParamMapping[];
    };
}
declare module "xception/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { TinyXceptionParams } from "xception/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap, numMainBlocks: number): {
        params: TinyXceptionParams;
        paramMappings: ParamMapping[];
    };
}
declare module "xception/TinyXception" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "dom/index";
    import { NeuralNetwork } from "NeuralNetwork";
    import { TinyXceptionParams } from "xception/types";
    export class TinyXception extends NeuralNetwork<TinyXceptionParams> {
        private _numMainBlocks;
        constructor(numMainBlocks: number);
        forwardInput(input: NetInput): tf.Tensor4D;
        forward(input: TNetInput): Promise<tf.Tensor4D>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TinyXceptionParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: TinyXceptionParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "ageGenderNet/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FCParams } from "common/index";
    export type AgeAndGenderPrediction = {
        age: number;
        gender: Gender;
        genderProbability: number;
    };
    export enum Gender {
        FEMALE = "female",
        MALE = "male"
    }
    export type NetOutput = {
        age: tf.Tensor1D;
        gender: tf.Tensor2D;
    };
    export type NetParams = {
        fc: {
            age: FCParams;
            gender: FCParams;
        };
    };
}
declare module "ageGenderNet/extractParams" {
    import { ParamMapping } from "common/index";
    import { NetParams } from "ageGenderNet/types";
    export function extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "ageGenderNet/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { NetParams } from "ageGenderNet/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "ageGenderNet/AgeGenderNet" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { TinyXception } from "xception/TinyXception";
    import { AgeAndGenderPrediction, NetOutput, NetParams } from "ageGenderNet/types";
    import { NeuralNetwork } from "NeuralNetwork";
    import { NetInput, TNetInput } from "dom/index";
    export class AgeGenderNet extends NeuralNetwork<NetParams> {
        private _faceFeatureExtractor;
        constructor(faceFeatureExtractor?: TinyXception);
        get faceFeatureExtractor(): TinyXception;
        runNet(input: NetInput | tf.Tensor4D): NetOutput;
        forwardInput(input: NetInput | tf.Tensor4D): NetOutput;
        forward(input: TNetInput): Promise<NetOutput>;
        predictAgeAndGender(input: TNetInput): Promise<AgeAndGenderPrediction | AgeAndGenderPrediction[]>;
        protected getDefaultModelName(): string;
        dispose(throwOnRedispose?: boolean): void;
        loadClassifierParams(weights: Float32Array): void;
        extractClassifierParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "ageGenderNet/index" {
    export * from "ageGenderNet/AgeGenderNet";
    export * from "ageGenderNet/types";
}
declare module "faceLandmarkNet/FaceLandmark68NetBase" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { IDimensions } from "classes/index";
    import { FaceLandmarks68 } from "classes/FaceLandmarks68";
    import { NetInput, TNetInput } from "dom/index";
    import { FaceFeatureExtractorParams, TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    import { FaceProcessor } from "faceProcessor/FaceProcessor";
    export abstract class FaceLandmark68NetBase<TExtractorParams extends FaceFeatureExtractorParams | TinyFaceFeatureExtractorParams> extends FaceProcessor<TExtractorParams> {
        postProcess(output: tf.Tensor2D, inputSize: number, originalDimensions: IDimensions[]): tf.Tensor2D;
        forwardInput(input: NetInput): tf.Tensor2D;
        forward(input: TNetInput): Promise<tf.Tensor2D>;
        detectLandmarks(input: TNetInput): Promise<FaceLandmarks68 | FaceLandmarks68[]>;
        protected getClassifierChannelsOut(): number;
    }
}
declare module "faceLandmarkNet/FaceLandmark68Net" {
    import { FaceFeatureExtractor } from "faceFeatureExtractor/FaceFeatureExtractor";
    import { FaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    import { FaceLandmark68NetBase } from "faceLandmarkNet/FaceLandmark68NetBase";
    export class FaceLandmark68Net extends FaceLandmark68NetBase<FaceFeatureExtractorParams> {
        constructor(faceFeatureExtractor?: FaceFeatureExtractor);
        protected getDefaultModelName(): string;
        protected getClassifierChannelsIn(): number;
    }
}
declare module "faceFeatureExtractor/extractParamsFromWeigthMapTiny" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    export function extractParamsFromWeigthMapTiny(weightMap: tf.NamedTensorMap): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceFeatureExtractor/extractParamsTiny" {
    import { ParamMapping } from "common/index";
    import { TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    export function extractParamsTiny(weights: Float32Array): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceFeatureExtractor/TinyFaceFeatureExtractor" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "dom/index";
    import { NeuralNetwork } from "NeuralNetwork";
    import { IFaceFeatureExtractor, TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    export class TinyFaceFeatureExtractor extends NeuralNetwork<TinyFaceFeatureExtractorParams> implements IFaceFeatureExtractor<TinyFaceFeatureExtractorParams> {
        constructor();
        forwardInput(input: NetInput): tf.Tensor4D;
        forward(input: TNetInput): Promise<tf.Tensor4D>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TinyFaceFeatureExtractorParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: TinyFaceFeatureExtractorParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "faceLandmarkNet/FaceLandmark68TinyNet" {
    import { TinyFaceFeatureExtractor } from "faceFeatureExtractor/TinyFaceFeatureExtractor";
    import { TinyFaceFeatureExtractorParams } from "faceFeatureExtractor/types";
    import { FaceLandmark68NetBase } from "faceLandmarkNet/FaceLandmark68NetBase";
    export class FaceLandmark68TinyNet extends FaceLandmark68NetBase<TinyFaceFeatureExtractorParams> {
        constructor(faceFeatureExtractor?: TinyFaceFeatureExtractor);
        protected getDefaultModelName(): string;
        protected getClassifierChannelsIn(): number;
    }
}
declare module "faceLandmarkNet/index" {
    import { FaceLandmark68Net } from "faceLandmarkNet/FaceLandmark68Net";
    export * from "faceLandmarkNet/FaceLandmark68Net";
    export * from "faceLandmarkNet/FaceLandmark68TinyNet";
    export class FaceLandmarkNet extends FaceLandmark68Net {
    }
}
declare module "faceRecognitionNet/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvParams } from "common/index";
    export type ScaleLayerParams = {
        weights: tf.Tensor1D;
        biases: tf.Tensor1D;
    };
    export type ResidualLayerParams = {
        conv1: ConvLayerParams;
        conv2: ConvLayerParams;
    };
    export type ConvLayerParams = {
        conv: ConvParams;
        scale: ScaleLayerParams;
    };
    export type NetParams = {
        conv32_down: ConvLayerParams;
        conv32_1: ResidualLayerParams;
        conv32_2: ResidualLayerParams;
        conv32_3: ResidualLayerParams;
        conv64_down: ResidualLayerParams;
        conv64_1: ResidualLayerParams;
        conv64_2: ResidualLayerParams;
        conv64_3: ResidualLayerParams;
        conv128_down: ResidualLayerParams;
        conv128_1: ResidualLayerParams;
        conv128_2: ResidualLayerParams;
        conv256_down: ResidualLayerParams;
        conv256_1: ResidualLayerParams;
        conv256_2: ResidualLayerParams;
        conv256_down_out: ResidualLayerParams;
        fc: tf.Tensor2D;
    };
}
declare module "faceRecognitionNet/scaleLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ScaleLayerParams } from "faceRecognitionNet/types";
    export function scale(x: tf.Tensor4D, params: ScaleLayerParams): tf.Tensor4D;
}
declare module "faceRecognitionNet/convLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvLayerParams } from "faceRecognitionNet/types";
    export function conv(x: tf.Tensor4D, params: ConvLayerParams): any;
    export function convNoRelu(x: tf.Tensor4D, params: ConvLayerParams): any;
    export function convDown(x: tf.Tensor4D, params: ConvLayerParams): any;
}
declare module "faceRecognitionNet/extractParams" {
    import { ParamMapping } from "common/index";
    import { NetParams } from "faceRecognitionNet/types";
    export function extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceRecognitionNet/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { NetParams } from "faceRecognitionNet/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "faceRecognitionNet/residualLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ResidualLayerParams } from "faceRecognitionNet/types";
    export function residual(x: tf.Tensor4D, params: ResidualLayerParams): tf.Tensor4D;
    export function residualDown(x: tf.Tensor4D, params: ResidualLayerParams): tf.Tensor4D;
}
declare module "faceRecognitionNet/FaceRecognitionNet" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { NetInput, TNetInput } from "dom/index";
    import { NeuralNetwork } from "NeuralNetwork";
    import { NetParams } from "faceRecognitionNet/types";
    export class FaceRecognitionNet extends NeuralNetwork<NetParams> {
        constructor();
        forwardInput(input: NetInput): tf.Tensor2D;
        forward(input: TNetInput): Promise<tf.Tensor2D>;
        computeFaceDescriptor(input: TNetInput): Promise<Float32Array | Float32Array[]>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "faceRecognitionNet/index" {
    import { FaceRecognitionNet } from "faceRecognitionNet/FaceRecognitionNet";
    export * from "faceRecognitionNet/FaceRecognitionNet";
    export function createFaceRecognitionNet(weights: Float32Array): FaceRecognitionNet;
}
declare module "factories/WithFaceDescriptor" {
    export type WithFaceDescriptor<TSource> = TSource & {
        descriptor: Float32Array;
    };
    export function extendWithFaceDescriptor<TSource>(sourceObj: TSource, descriptor: Float32Array): WithFaceDescriptor<TSource>;
}
declare module "factories/WithAge" {
    export type WithAge<TSource> = TSource & {
        age: number;
    };
    export function isWithAge(obj: any): obj is WithAge<{}>;
    export function extendWithAge<TSource>(sourceObj: TSource, age: number): WithAge<TSource>;
}
declare module "factories/WithGender" {
    import { Gender } from "ageGenderNet/types";
    export type WithGender<TSource> = TSource & {
        gender: Gender;
        genderProbability: number;
    };
    export function isWithGender(obj: any): obj is WithGender<{}>;
    export function extendWithGender<TSource>(sourceObj: TSource, gender: Gender, genderProbability: number): WithGender<TSource>;
}
declare module "factories/index" {
    export * from "factories/WithFaceDescriptor";
    export * from "factories/WithFaceDetection";
    export * from "factories/WithFaceExpressions";
    export * from "factories/WithFaceLandmarks";
    export * from "factories/WithAge";
    export * from "factories/WithGender";
}
declare module "ssdMobilenetv1/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvParams } from "common/index";
    export type PointwiseConvParams = {
        filters: tf.Tensor4D;
        batch_norm_offset: tf.Tensor1D;
    };
    export namespace MobileNetV1 {
        type DepthwiseConvParams = {
            filters: tf.Tensor4D;
            batch_norm_scale: tf.Tensor1D;
            batch_norm_offset: tf.Tensor1D;
            batch_norm_mean: tf.Tensor1D;
            batch_norm_variance: tf.Tensor1D;
        };
        type ConvPairParams = {
            depthwise_conv: DepthwiseConvParams;
            pointwise_conv: PointwiseConvParams;
        };
        type Params = {
            conv_0: PointwiseConvParams;
            conv_1: ConvPairParams;
            conv_2: ConvPairParams;
            conv_3: ConvPairParams;
            conv_4: ConvPairParams;
            conv_5: ConvPairParams;
            conv_6: ConvPairParams;
            conv_7: ConvPairParams;
            conv_8: ConvPairParams;
            conv_9: ConvPairParams;
            conv_10: ConvPairParams;
            conv_11: ConvPairParams;
            conv_12: ConvPairParams;
            conv_13: ConvPairParams;
        };
    }
    export type BoxPredictionParams = {
        box_encoding_predictor: ConvParams;
        class_predictor: ConvParams;
    };
    export type PredictionLayerParams = {
        conv_0: PointwiseConvParams;
        conv_1: PointwiseConvParams;
        conv_2: PointwiseConvParams;
        conv_3: PointwiseConvParams;
        conv_4: PointwiseConvParams;
        conv_5: PointwiseConvParams;
        conv_6: PointwiseConvParams;
        conv_7: PointwiseConvParams;
        box_predictor_0: BoxPredictionParams;
        box_predictor_1: BoxPredictionParams;
        box_predictor_2: BoxPredictionParams;
        box_predictor_3: BoxPredictionParams;
        box_predictor_4: BoxPredictionParams;
        box_predictor_5: BoxPredictionParams;
    };
    export type OutputLayerParams = {
        extra_dim: tf.Tensor3D;
    };
    export type NetParams = {
        mobilenetv1: MobileNetV1.Params;
        prediction_layer: PredictionLayerParams;
        output_layer: OutputLayerParams;
    };
}
declare module "ssdMobilenetv1/extractParams" {
    import { ParamMapping } from "common/index";
    import { NetParams } from "ssdMobilenetv1/types";
    export function extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "ssdMobilenetv1/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/index";
    import { NetParams } from "ssdMobilenetv1/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "ssdMobilenetv1/pointwiseConvLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { PointwiseConvParams } from "ssdMobilenetv1/types";
    export function pointwiseConvLayer(x: tf.Tensor4D, params: PointwiseConvParams, strides: [number, number]): any;
}
declare module "ssdMobilenetv1/mobileNetV1" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { MobileNetV1 } from "ssdMobilenetv1/types";
    export function mobileNetV1(x: tf.Tensor4D, params: MobileNetV1.Params): any;
}
declare module "ssdMobilenetv1/nonMaxSuppression" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function nonMaxSuppression(boxes: tf.Tensor2D, scores: number[], maxOutputSize: number, iouThreshold: number, scoreThreshold: number): number[];
}
declare module "ssdMobilenetv1/outputLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { OutputLayerParams } from "ssdMobilenetv1/types";
    export function outputLayer(boxPredictions: tf.Tensor4D, classPredictions: tf.Tensor4D, params: OutputLayerParams): any;
}
declare module "ssdMobilenetv1/boxPredictionLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { BoxPredictionParams } from "ssdMobilenetv1/types";
    export function boxPredictionLayer(x: tf.Tensor4D, params: BoxPredictionParams): any;
}
declare module "ssdMobilenetv1/predictionLayer" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { PredictionLayerParams } from "ssdMobilenetv1/types";
    export function predictionLayer(x: tf.Tensor4D, conv11: tf.Tensor4D, params: PredictionLayerParams): any;
}
declare module "ssdMobilenetv1/SsdMobilenetv1Options" {
    export interface ISsdMobilenetv1Options {
        minConfidence?: number;
        maxResults?: number;
    }
    export class SsdMobilenetv1Options {
        protected _name: string;
        private _minConfidence;
        private _maxResults;
        constructor({ minConfidence, maxResults }?: ISsdMobilenetv1Options);
        get minConfidence(): number;
        get maxResults(): number;
    }
}
declare module "ssdMobilenetv1/SsdMobilenetv1" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FaceDetection } from "classes/FaceDetection";
    import { NetInput, TNetInput } from "dom/index";
    import { NeuralNetwork } from "NeuralNetwork";
    import { ISsdMobilenetv1Options } from "ssdMobilenetv1/SsdMobilenetv1Options";
    import { NetParams } from "ssdMobilenetv1/types";
    export class SsdMobilenetv1 extends NeuralNetwork<NetParams> {
        constructor();
        forwardInput(input: NetInput): any;
        forward(input: TNetInput): Promise<any>;
        locateFaces(input: TNetInput, options?: ISsdMobilenetv1Options): Promise<FaceDetection[]>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: NetParams;
            paramMappings: import("common").ParamMapping[];
        };
    }
}
declare module "ssdMobilenetv1/index" {
    import { SsdMobilenetv1 } from "ssdMobilenetv1/SsdMobilenetv1";
    export * from "ssdMobilenetv1/SsdMobilenetv1";
    export * from "ssdMobilenetv1/SsdMobilenetv1Options";
    export function createSsdMobilenetv1(weights: Float32Array): SsdMobilenetv1;
    export function createFaceDetectionNet(weights: Float32Array): SsdMobilenetv1;
    export class FaceDetectionNet extends SsdMobilenetv1 {
    }
}
declare module "tinyYolov2/const" {
    import { Point } from "classes/index";
    export const IOU_THRESHOLD = 0.4;
    export const BOX_ANCHORS: Point[];
    export const BOX_ANCHORS_SEPARABLE: Point[];
    export const MEAN_RGB_SEPARABLE: [number, number, number];
    export const DEFAULT_MODEL_NAME = "tiny_yolov2_model";
    export const DEFAULT_MODEL_NAME_SEPARABLE_CONV = "tiny_yolov2_separable_conv_model";
}
declare module "tinyYolov2/config" {
    import { Point } from "classes/Point";
    export type TinyYolov2Config = {
        withSeparableConvs: boolean;
        iouThreshold: number;
        anchors: Point[];
        classes: string[];
        meanRgb?: [number, number, number];
        withClassScores?: boolean;
        filterSizes?: number[];
        isFirstLayerConv2d?: boolean;
    };
    export function validateConfig(config: any): void;
}
declare module "tinyYolov2/leaky" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function leaky(x: tf.Tensor4D): tf.Tensor4D;
}
declare module "tinyYolov2/types" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvParams } from "common/index";
    import { SeparableConvParams } from "common/types";
    export type BatchNorm = {
        sub: tf.Tensor1D;
        truediv: tf.Tensor1D;
    };
    export type ConvWithBatchNorm = {
        conv: ConvParams;
        bn: BatchNorm;
    };
    export type MobilenetParams = {
        conv0: SeparableConvParams | ConvParams;
        conv1: SeparableConvParams;
        conv2: SeparableConvParams;
        conv3: SeparableConvParams;
        conv4: SeparableConvParams;
        conv5: SeparableConvParams;
        conv6?: SeparableConvParams;
        conv7?: SeparableConvParams;
        conv8: ConvParams;
    };
    export type DefaultTinyYolov2NetParams = {
        conv0: ConvWithBatchNorm;
        conv1: ConvWithBatchNorm;
        conv2: ConvWithBatchNorm;
        conv3: ConvWithBatchNorm;
        conv4: ConvWithBatchNorm;
        conv5: ConvWithBatchNorm;
        conv6: ConvWithBatchNorm;
        conv7: ConvWithBatchNorm;
        conv8: ConvParams;
    };
    export type TinyYolov2NetParams = DefaultTinyYolov2NetParams | MobilenetParams;
}
declare module "tinyYolov2/convWithBatchNorm" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ConvWithBatchNorm } from "tinyYolov2/types";
    export function convWithBatchNorm(x: tf.Tensor4D, params: ConvWithBatchNorm): tf.Tensor4D;
}
declare module "tinyYolov2/depthwiseSeparableConv" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { SeparableConvParams } from "common/types";
    export function depthwiseSeparableConv(x: tf.Tensor4D, params: SeparableConvParams): tf.Tensor4D;
}
declare module "tinyYolov2/extractParams" {
    import { ParamMapping } from "common/types";
    import { TinyYolov2Config } from "tinyYolov2/config";
    import { TinyYolov2NetParams } from "tinyYolov2/types";
    export function extractParams(weights: Float32Array, config: TinyYolov2Config, boxEncodingSize: number, filterSizes: number[]): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "tinyYolov2/extractParamsFromWeigthMap" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { ParamMapping } from "common/types";
    import { TinyYolov2Config } from "tinyYolov2/config";
    import { TinyYolov2NetParams } from "tinyYolov2/types";
    export function extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap, config: TinyYolov2Config): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}
declare module "tinyYolov2/TinyYolov2Options" {
    export enum TinyYolov2SizeType {
        XS = 224,
        SM = 320,
        MD = 416,
        LG = 608
    }
    export interface ITinyYolov2Options {
        inputSize?: number;
        scoreThreshold?: number;
    }
    export class TinyYolov2Options {
        protected _name: string;
        private _inputSize;
        private _scoreThreshold;
        constructor({ inputSize, scoreThreshold }?: ITinyYolov2Options);
        get inputSize(): number;
        get scoreThreshold(): number;
    }
}
declare module "tinyYolov2/TinyYolov2Base" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { Dimensions } from "classes/Dimensions";
    import { ObjectDetection } from "classes/ObjectDetection";
    import { NetInput } from "dom/NetInput";
    import { TNetInput } from "dom/types";
    import { NeuralNetwork } from "NeuralNetwork";
    import { TinyYolov2Config } from "tinyYolov2/config";
    import { ITinyYolov2Options } from "tinyYolov2/TinyYolov2Options";
    import { DefaultTinyYolov2NetParams, MobilenetParams, TinyYolov2NetParams } from "tinyYolov2/types";
    export class TinyYolov2Base extends NeuralNetwork<TinyYolov2NetParams> {
        static DEFAULT_FILTER_SIZES: number[];
        private _config;
        constructor(config: TinyYolov2Config);
        get config(): TinyYolov2Config;
        get withClassScores(): boolean;
        get boxEncodingSize(): number;
        runTinyYolov2(x: tf.Tensor4D, params: DefaultTinyYolov2NetParams): tf.Tensor4D;
        runMobilenet(x: tf.Tensor4D, params: MobilenetParams): tf.Tensor4D;
        forwardInput(input: NetInput, inputSize: number): tf.Tensor4D;
        forward(input: TNetInput, inputSize: number): Promise<tf.Tensor4D>;
        detect(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<ObjectDetection[]>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TinyYolov2NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractParams(weights: Float32Array): {
            params: TinyYolov2NetParams;
            paramMappings: import("common").ParamMapping[];
        };
        protected extractBoxes(outputTensor: tf.Tensor4D, inputBlobDimensions: Dimensions, scoreThreshold?: number): Promise<any>;
        private extractPredictedClass;
    }
}
declare module "tinyYolov2/TinyYolov2" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FaceDetection, Point } from "classes/index";
    import { ParamMapping } from "common/types";
    import { TNetInput } from "dom/types";
    import { TinyYolov2Base } from "tinyYolov2/TinyYolov2Base";
    import { ITinyYolov2Options } from "tinyYolov2/TinyYolov2Options";
    import { TinyYolov2NetParams } from "tinyYolov2/types";
    export class TinyYolov2 extends TinyYolov2Base {
        constructor(withSeparableConvs?: boolean);
        get withSeparableConvs(): boolean;
        get anchors(): Point[];
        locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TinyYolov2NetParams;
            paramMappings: ParamMapping[];
        };
    }
}
declare module "tinyYolov2/index" {
    import { TinyYolov2 } from "tinyYolov2/TinyYolov2";
    export * from "tinyYolov2/TinyYolov2Options";
    export * from "tinyYolov2/config";
    export * from "tinyYolov2/types";
    export { TinyYolov2 };
    export function createTinyYolov2(weights: Float32Array, withSeparableConvs?: boolean): TinyYolov2;
}
declare module "tinyFaceDetector/TinyFaceDetectorOptions" {
    import { ITinyYolov2Options, TinyYolov2Options } from "tinyYolov2/index";
    export interface ITinyFaceDetectorOptions extends ITinyYolov2Options {
    }
    export class TinyFaceDetectorOptions extends TinyYolov2Options {
        protected _name: string;
    }
}
declare module "globalApi/ComposableTask" {
    export class ComposableTask<T> {
        then(onfulfilled: (value: T) => T | PromiseLike<T>): Promise<T>;
        run(): Promise<T>;
    }
}
declare module "globalApi/extractFacesAndComputeResults" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FaceDetection } from "classes/FaceDetection";
    import { TNetInput } from "dom/index";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    export function extractAllFacesAndComputeResults<TSource extends WithFaceDetection<{}>, TResult>(parentResults: TSource[], input: TNetInput, computeResults: (faces: Array<HTMLCanvasElement | tf.Tensor3D>) => Promise<TResult>, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | null, getRectForAlignment?: (parentResult: WithFaceLandmarks<TSource, any>) => FaceDetection): Promise<TResult>;
    export function extractSingleFaceAndComputeResult<TSource extends WithFaceDetection<{}>, TResult>(parentResult: TSource, input: TNetInput, computeResult: (face: HTMLCanvasElement | tf.Tensor3D) => Promise<TResult>, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | null, getRectForAlignment?: (parentResult: WithFaceLandmarks<TSource, any>) => FaceDetection): Promise<TResult>;
}
declare module "tinyFaceDetector/const" {
    import { Point } from "classes/index";
    export const IOU_THRESHOLD = 0.4;
    export const BOX_ANCHORS: Point[];
    export const MEAN_RGB: [number, number, number];
}
declare module "tinyFaceDetector/TinyFaceDetector" {
    import * as tf from '../../dist/tfjs.esm.js';
    import { FaceDetection, Point } from "classes/index";
    import { ParamMapping } from "common/index";
    import { TNetInput } from "dom/index";
    import { ITinyYolov2Options } from "tinyYolov2/index";
    import { TinyYolov2Base } from "tinyYolov2/TinyYolov2Base";
    import { TinyYolov2NetParams } from "tinyYolov2/types";
    export class TinyFaceDetector extends TinyYolov2Base {
        constructor();
        get anchors(): Point[];
        locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
        protected getDefaultModelName(): string;
        protected extractParamsFromWeigthMap(weightMap: tf.NamedTensorMap): {
            params: TinyYolov2NetParams;
            paramMappings: ParamMapping[];
        };
    }
}
declare module "globalApi/nets" {
    import { AgeGenderNet } from "ageGenderNet/AgeGenderNet";
    import { AgeAndGenderPrediction } from "ageGenderNet/types";
    import { FaceDetection } from "classes/FaceDetection";
    import { FaceLandmarks68 } from "classes/FaceLandmarks68";
    import { TNetInput } from "dom/index";
    import { FaceExpressionNet } from "faceExpressionNet/FaceExpressionNet";
    import { FaceExpressions } from "faceExpressionNet/FaceExpressions";
    import { FaceLandmark68Net } from "faceLandmarkNet/FaceLandmark68Net";
    import { FaceLandmark68TinyNet } from "faceLandmarkNet/FaceLandmark68TinyNet";
    import { FaceRecognitionNet } from "faceRecognitionNet/FaceRecognitionNet";
    import { SsdMobilenetv1 } from "ssdMobilenetv1/SsdMobilenetv1";
    import { SsdMobilenetv1Options } from "ssdMobilenetv1/SsdMobilenetv1Options";
    import { TinyFaceDetector } from "tinyFaceDetector/TinyFaceDetector";
    import { TinyFaceDetectorOptions } from "tinyFaceDetector/TinyFaceDetectorOptions";
    import { ITinyYolov2Options, TinyYolov2 } from "tinyYolov2/index";
    export const nets: {
        ssdMobilenetv1: SsdMobilenetv1;
        tinyFaceDetector: TinyFaceDetector;
        tinyYolov2: TinyYolov2;
        faceLandmark68Net: FaceLandmark68Net;
        faceLandmark68TinyNet: FaceLandmark68TinyNet;
        faceRecognitionNet: FaceRecognitionNet;
        faceExpressionNet: FaceExpressionNet;
        ageGenderNet: AgeGenderNet;
    };
    /**
     * Attempts to detect all faces in an image using SSD Mobilenetv1 Network.
     *
     * @param input The input image.
     * @param options (optional, default: see SsdMobilenetv1Options constructor for default parameters).
     * @returns Bounding box of each face with score.
     */
    export const ssdMobilenetv1: (input: TNetInput, options: SsdMobilenetv1Options) => Promise<FaceDetection[]>;
    /**
     * Attempts to detect all faces in an image using the Tiny Face Detector.
     *
     * @param input The input image.
     * @param options (optional, default: see TinyFaceDetectorOptions constructor for default parameters).
     * @returns Bounding box of each face with score.
     */
    export const tinyFaceDetector: (input: TNetInput, options: TinyFaceDetectorOptions) => Promise<FaceDetection[]>;
    /**
     * Attempts to detect all faces in an image using the Tiny Yolov2 Network.
     *
     * @param input The input image.
     * @param options (optional, default: see TinyYolov2Options constructor for default parameters).
     * @returns Bounding box of each face with score.
     */
    export const tinyYolov2: (input: TNetInput, options: ITinyYolov2Options) => Promise<FaceDetection[]>;
    /**
     * Detects the 68 point face landmark positions of the face shown in an image.
     *
     * @param inputs The face image extracted from the bounding box of a face. Can
     * also be an array of input images, which will be batch processed.
     * @returns 68 point face landmarks or array thereof in case of batch input.
     */
    export const detectFaceLandmarks: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;
    /**
     * Detects the 68 point face landmark positions of the face shown in an image
     * using a tinier version of the 68 point face landmark model, which is slightly
     * faster at inference, but also slightly less accurate.
     *
     * @param inputs The face image extracted from the bounding box of a face. Can
     * also be an array of input images, which will be batch processed.
     * @returns 68 point face landmarks or array thereof in case of batch input.
     */
    export const detectFaceLandmarksTiny: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;
    /**
     * Computes a 128 entry vector (face descriptor / face embeddings) from the face shown in an image,
     * which uniquely represents the features of that persons face. The computed face descriptor can
     * be used to measure the similarity between faces, by computing the euclidean distance of two
     * face descriptors.
     *
     * @param inputs The face image extracted from the aligned bounding box of a face. Can
     * also be an array of input images, which will be batch processed.
     * @returns Face descriptor with 128 entries or array thereof in case of batch input.
     */
    export const computeFaceDescriptor: (input: TNetInput) => Promise<Float32Array | Float32Array[]>;
    /**
     * Recognizes the facial expressions from a face image.
     *
     * @param inputs The face image extracted from the bounding box of a face. Can
     * also be an array of input images, which will be batch processed.
     * @returns Facial expressions with corresponding probabilities or array thereof in case of batch input.
     */
    export const recognizeFaceExpressions: (input: TNetInput) => Promise<FaceExpressions | FaceExpressions[]>;
    /**
     * Predicts age and gender from a face image.
     *
     * @param inputs The face image extracted from the bounding box of a face. Can
     * also be an array of input images, which will be batch processed.
     * @returns Predictions with age, gender and gender probability or array thereof in case of batch input.
     */
    export const predictAgeAndGender: (input: TNetInput) => Promise<AgeAndGenderPrediction | AgeAndGenderPrediction[]>;
    export const loadSsdMobilenetv1Model: (url: string) => Promise<void>;
    export const loadTinyFaceDetectorModel: (url: string) => Promise<void>;
    export const loadTinyYolov2Model: (url: string) => Promise<void>;
    export const loadFaceLandmarkModel: (url: string) => Promise<void>;
    export const loadFaceLandmarkTinyModel: (url: string) => Promise<void>;
    export const loadFaceRecognitionModel: (url: string) => Promise<void>;
    export const loadFaceExpressionModel: (url: string) => Promise<void>;
    export const loadAgeGenderModel: (url: string) => Promise<void>;
    export const loadFaceDetectionModel: (url: string) => Promise<void>;
    export const locateFaces: (input: TNetInput, options: SsdMobilenetv1Options) => Promise<FaceDetection[]>;
    export const detectLandmarks: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;
}
declare module "globalApi/PredictFaceExpressionsTask" {
    import { TNetInput } from "dom/index";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceExpressions } from "factories/WithFaceExpressions";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    import { ComposableTask } from "globalApi/ComposableTask";
    import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from "globalApi/ComputeFaceDescriptorsTasks";
    import { PredictAllAgeAndGenderTask, PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from "globalApi/PredictAgeAndGenderTask";
    export class PredictFaceExpressionsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
        protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
        protected input: TNetInput;
        protected extractedFaces?: any[] | undefined;
        constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: any[] | undefined);
    }
    export class PredictAllFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource>[], TSource[]> {
        run(): Promise<WithFaceExpressions<TSource>[]>;
        withAgeAndGender(): PredictAllAgeAndGenderTask<WithFaceExpressions<TSource>>;
    }
    export class PredictSingleFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource> | undefined, TSource | undefined> {
        run(): Promise<WithFaceExpressions<TSource> | undefined>;
        withAgeAndGender(): PredictSingleAgeAndGenderTask<WithFaceExpressions<TSource>>;
    }
    export class PredictAllFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllFaceExpressionsTask<TSource> {
        withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
        withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceExpressions<TSource>>;
    }
    export class PredictSingleFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleFaceExpressionsTask<TSource> {
        withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
        withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceExpressions<TSource>>;
    }
}
declare module "globalApi/PredictAgeAndGenderTask" {
    import { TNetInput } from "dom/index";
    import { WithAge } from "factories/WithAge";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    import { WithGender } from "factories/WithGender";
    import { ComposableTask } from "globalApi/ComposableTask";
    import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from "globalApi/ComputeFaceDescriptorsTasks";
    import { PredictAllFaceExpressionsTask, PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsTask, PredictSingleFaceExpressionsWithFaceAlignmentTask } from "globalApi/PredictFaceExpressionsTask";
    export class PredictAgeAndGenderTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
        protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
        protected input: TNetInput;
        protected extractedFaces?: any[] | undefined;
        constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: any[] | undefined);
    }
    export class PredictAllAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>>[], TSource[]> {
        run(): Promise<WithAge<WithGender<TSource>>[]>;
        withFaceExpressions(): PredictAllFaceExpressionsTask<WithAge<WithGender<TSource>>>;
    }
    export class PredictSingleAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>> | undefined, TSource | undefined> {
        run(): Promise<WithAge<WithGender<TSource>> | undefined>;
        withFaceExpressions(): PredictSingleFaceExpressionsTask<WithAge<WithGender<TSource>>>;
    }
    export class PredictAllAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllAgeAndGenderTask<TSource> {
        withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
        withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithAge<WithGender<TSource>>>;
    }
    export class PredictSingleAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleAgeAndGenderTask<TSource> {
        withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
        withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithAge<WithGender<TSource>>>;
    }
}
declare module "globalApi/ComputeFaceDescriptorsTasks" {
    import { TNetInput } from "dom/index";
    import { WithFaceDescriptor } from "factories/WithFaceDescriptor";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    import { ComposableTask } from "globalApi/ComposableTask";
    import { PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from "globalApi/PredictAgeAndGenderTask";
    import { PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsWithFaceAlignmentTask } from "globalApi/PredictFaceExpressionsTask";
    export class ComputeFaceDescriptorsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
        protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
        protected input: TNetInput;
        constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput);
    }
    export class ComputeAllFaceDescriptorsTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource>[], TSource[]> {
        run(): Promise<WithFaceDescriptor<TSource>[]>;
        withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
        withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
    }
    export class ComputeSingleFaceDescriptorTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource> | undefined, TSource | undefined> {
        run(): Promise<WithFaceDescriptor<TSource> | undefined>;
        withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
        withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
    }
}
declare module "globalApi/DetectFaceLandmarksTasks" {
    import { FaceLandmarks68 } from "classes/FaceLandmarks68";
    import { TNetInput } from "dom/index";
    import { FaceLandmark68Net } from "faceLandmarkNet/FaceLandmark68Net";
    import { FaceLandmark68TinyNet } from "faceLandmarkNet/FaceLandmark68TinyNet";
    import { WithFaceDetection } from "factories/WithFaceDetection";
    import { WithFaceLandmarks } from "factories/WithFaceLandmarks";
    import { ComposableTask } from "globalApi/ComposableTask";
    import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from "globalApi/ComputeFaceDescriptorsTasks";
    import { PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from "globalApi/PredictAgeAndGenderTask";
    import { PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsWithFaceAlignmentTask } from "globalApi/PredictFaceExpressionsTask";
    export class DetectFaceLandmarksTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
        protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
        protected input: TNetInput;
        protected useTinyLandmarkNet: boolean;
        constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, useTinyLandmarkNet: boolean);
        protected get landmarkNet(): FaceLandmark68Net | FaceLandmark68TinyNet;
    }
    export class DetectAllFaceLandmarksTask<TSource extends WithFaceDetection<{}>> extends DetectFaceLandmarksTaskBase<WithFaceLandmarks<TSource>[], TSource[]> {
        run(): Promise<WithFaceLandmarks<TSource>[]>;
        withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
        withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
        withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    }
    export class DetectSingleFaceLandmarksTask<TSource extends WithFaceDetection<{}>> extends DetectFaceLandmarksTaskBase<WithFaceLandmarks<TSource> | undefined, TSource | undefined> {
        run(): Promise<WithFaceLandmarks<TSource> | undefined>;
        withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
        withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
        withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    }
}
declare module "globalApi/types" {
    import { FaceDetection } from "classes/FaceDetection";
    import { TNetInput } from "dom/index";
    import { SsdMobilenetv1Options } from "ssdMobilenetv1/SsdMobilenetv1Options";
    import { TinyFaceDetectorOptions } from "tinyFaceDetector/TinyFaceDetectorOptions";
    import { TinyYolov2Options } from "tinyYolov2/index";
    export type FaceDetectionOptions = TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options;
    export type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>;
}
declare module "globalApi/DetectFacesTasks" {
    import { FaceDetection } from "classes/FaceDetection";
    import { TNetInput } from "dom/index";
    import { ComposableTask } from "globalApi/ComposableTask";
    import { DetectAllFaceLandmarksTask, DetectSingleFaceLandmarksTask } from "globalApi/DetectFaceLandmarksTasks";
    import { PredictAllAgeAndGenderTask, PredictSingleAgeAndGenderTask } from "globalApi/PredictAgeAndGenderTask";
    import { PredictAllFaceExpressionsTask, PredictSingleFaceExpressionsTask } from "globalApi/PredictFaceExpressionsTask";
    import { FaceDetectionOptions } from "globalApi/types";
    export class DetectFacesTaskBase<TReturn> extends ComposableTask<TReturn> {
        protected input: TNetInput;
        protected options: FaceDetectionOptions;
        constructor(input: TNetInput, options?: FaceDetectionOptions);
    }
    export class DetectAllFacesTask extends DetectFacesTaskBase<FaceDetection[]> {
        run(): Promise<FaceDetection[]>;
        private runAndExtendWithFaceDetections;
        withFaceLandmarks(useTinyLandmarkNet?: boolean): DetectAllFaceLandmarksTask<{
            detection: FaceDetection;
        }>;
        withFaceExpressions(): PredictAllFaceExpressionsTask<{
            detection: FaceDetection;
        }>;
        withAgeAndGender(): PredictAllAgeAndGenderTask<{
            detection: FaceDetection;
        }>;
    }
    export class DetectSingleFaceTask extends DetectFacesTaskBase<FaceDetection | undefined> {
        run(): Promise<FaceDetection | undefined>;
        private runAndExtendWithFaceDetection;
        withFaceLandmarks(useTinyLandmarkNet?: boolean): DetectSingleFaceLandmarksTask<{
            detection: FaceDetection;
        }>;
        withFaceExpressions(): PredictSingleFaceExpressionsTask<{
            detection: FaceDetection;
        }>;
        withAgeAndGender(): PredictSingleAgeAndGenderTask<{
            detection: FaceDetection;
        }>;
    }
}
declare module "globalApi/detectFaces" {
    import { TNetInput } from "dom/index";
    import { DetectAllFacesTask, DetectSingleFaceTask } from "globalApi/DetectFacesTasks";
    import { FaceDetectionOptions } from "globalApi/types";
    export function detectSingleFace(input: TNetInput, options?: FaceDetectionOptions): DetectSingleFaceTask;
    export function detectAllFaces(input: TNetInput, options?: FaceDetectionOptions): DetectAllFacesTask;
}
declare module "globalApi/allFaces" {
    import { TNetInput } from "dom/index";
    import { WithFaceDescriptor, WithFaceDetection, WithFaceLandmarks } from "factories/index";
    import { ITinyYolov2Options } from "tinyYolov2/index";
    export function allFacesSsdMobilenetv1(input: TNetInput, minConfidence?: number): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;
    export function allFacesTinyYolov2(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;
    export const allFaces: typeof allFacesSsdMobilenetv1;
}
declare module "euclideanDistance" {
    export function euclideanDistance(arr1: number[] | Float32Array, arr2: number[] | Float32Array): number;
}
declare module "globalApi/FaceMatcher" {
    import { FaceMatch } from "classes/FaceMatch";
    import { LabeledFaceDescriptors } from "classes/LabeledFaceDescriptors";
    import { WithFaceDescriptor } from "factories/index";
    export class FaceMatcher {
        private _labeledDescriptors;
        private _distanceThreshold;
        constructor(inputs: LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>, distanceThreshold?: number);
        get labeledDescriptors(): LabeledFaceDescriptors[];
        get distanceThreshold(): number;
        computeMeanDistance(queryDescriptor: Float32Array, descriptors: Float32Array[]): number;
        matchDescriptor(queryDescriptor: Float32Array): FaceMatch;
        findBestMatch(queryDescriptor: Float32Array): FaceMatch;
        toJSON(): any;
        static fromJSON(json: any): FaceMatcher;
    }
}
declare module "globalApi/index" {
    export * from "globalApi/allFaces";
    export * from "globalApi/ComposableTask";
    export * from "globalApi/ComputeFaceDescriptorsTasks";
    export * from "globalApi/detectFaces";
    export * from "globalApi/DetectFacesTasks";
    export * from "globalApi/DetectFaceLandmarksTasks";
    export * from "globalApi/FaceMatcher";
    export * from "globalApi/nets";
    export * from "globalApi/types";
}
declare module "tinyFaceDetector/index" {
    import { TinyFaceDetector } from "tinyFaceDetector/TinyFaceDetector";
    export * from "tinyFaceDetector/TinyFaceDetector";
    export * from "tinyFaceDetector/TinyFaceDetectorOptions";
    export function createTinyFaceDetector(weights: Float32Array): TinyFaceDetector;
}
declare module "resizeResults" {
    import { IDimensions } from "classes/index";
    export function resizeResults<T>(results: T, dimensions: IDimensions): T;
}
declare module "index" {
    import * as tf from '../dist/tfjs.esm.js';
    import * as draw from "draw/index";
    import * as utils from "utils/index";
    export { tf, draw, utils };
    export * from "ageGenderNet/index";
    export * from "classes/index";
    export * from "dom/index";
    export * from "env/index";
    export * from "faceExpressionNet/index";
    export * from "faceLandmarkNet/index";
    export * from "faceRecognitionNet/index";
    export * from "factories/index";
    export * from "globalApi/index";
    export * from "ops/index";
    export * from "ssdMobilenetv1/index";
    export * from "tinyFaceDetector/index";
    export * from "tinyYolov2/index";
    export * from "euclideanDistance";
    export * from "NeuralNetwork";
    export * from "resizeResults";
    export const version: {
        faceapi: string;
        node: boolean;
        browser: boolean;
    };
}
