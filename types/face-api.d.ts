declare const add: typeof add_;

/**
 * Adds two `tf.Tensor`s element-wise, A + B. Supports broadcasting.
 *
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 *
 * ```js
 * // Broadcast add a with b.
 * const a = tf.scalar(5);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 * @param a The first `tf.Tensor` to add.
 * @param b The second `tf.Tensor` to add. Must have the same type as `a`.
 *
 * @doc {heading: 'Operations', subheading: 'Arithmetic'}
 */
declare function add_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;

export declare type AgeAndGenderPrediction = {
    age: number;
    gender: Gender;
    genderProbability: number;
};

export declare class AgeGenderNet extends NeuralNetwork<NetParams> {
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
        paramMappings: ParamMapping[];
    };
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams;
        paramMappings: ParamMapping[];
    };
}

export declare const allFaces: typeof allFacesSsdMobilenetv1;

export declare function allFacesSsdMobilenetv1(input: TNetInput, minConfidence?: number): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;

export declare function allFacesTinyYolov2(input: TNetInput, forwardParams?: ITinyYolov2Options): Promise<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>[]>;

declare enum AnchorPosition {
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT"
}

/** @docalias number[] */
declare interface ArrayMap {
    R0: number;
    R1: number[];
    R2: number[][];
    R3: number[][][];
    R4: number[][][][];
    R5: number[][][][][];
    R6: number[][][][][][];
}

declare const avgPool: typeof avgPool_;

/**
 * Computes the 2D average pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *         https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. If none is
 *     provided, it will default to truncate.
 */
declare function avgPool_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number | conv_util.ExplicitPadding, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;

export declare function awaitMediaLoaded(media: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<unknown>;

export declare type BatchNorm = {
    sub: tf.Tensor1D;
    truediv: tf.Tensor1D;
};

declare const batchNorm: typeof batchNorm_;

/**
 * Batch normalization.
 *
 * As described in
 * [http://arxiv.org/abs/1502.03167](http://arxiv.org/abs/1502.03167).
 *
 * Mean, variance, scale, and offset can be of two shapes:
 *   - The same shape as the input.
 *   - In the common case, the depth dimension is the last dimension of x, so
 *     the values would be an `tf.Tensor1D` of shape [depth].
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that parameters passed are of given rank
 *   - `tf.batchNorm2d`
 *   - `tf.batchNorm3d`
 *   - `tf.batchNorm4d`
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 *
 * @doc {heading: 'Operations', subheading: 'Normalization'}
 */
declare function batchNorm_<R extends Rank>(x: Tensor<R> | TensorLike, mean: Tensor<R> | Tensor1D | TensorLike, variance: Tensor<R> | Tensor1D | TensorLike, offset?: Tensor<R> | Tensor1D | TensorLike, scale?: Tensor<R> | Tensor1D | TensorLike, varianceEpsilon?: number): Tensor<R>;

export declare class BoundingBox extends Box implements IBoundingBox {
    constructor(left: number, top: number, right: number, bottom: number, allowNegativeDimensions?: boolean);
}

export declare class Box<BoxType = any> implements IBoundingBox, IRect {
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

declare type BoxPredictionParams = {
    box_encoding_predictor: ConvParams;
    class_predictor: ConvParams;
};

export declare function bufferToImage(buf: Blob): Promise<HTMLImageElement>;

declare const cast: typeof cast_;

/**
 * Casts a `tf.Tensor` to a new dtype.
 *
 * ```js
 * const x = tf.tensor1d([1.5, 2.5, 3]);
 * tf.cast(x, 'int32').print();
 * ```
 * @param x The input tensor to be casted.
 * @param dtype The dtype to cast the input tensor to.
 *
 * @doc {heading: 'Tensors', subheading: 'Transformations'}
 */
declare function cast_<T extends Tensor>(x: T | TensorLike, dtype: DataType): T;

/**
 * Check validity of pad when using dimRoundingMode.
 * @param opDesc A string of op description
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid` output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. If none is
 *     provided, it will default to truncate.
 * @throws unknown padding parameter
 */
declare function checkPadOnDimRoundingMode(opDesc: string, pad: 'valid' | 'same' | number | ExplicitPadding, dimRoundingMode?: 'floor' | 'round' | 'ceil'): void;

declare const clipByValue: typeof clipByValue_;

/**
 * Clips values element-wise. `max(min(x, clipValueMax), clipValueMin)`
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.clipByValue(-2, 3).print();  // or tf.clipByValue(x, -2, 3)
 * ```
 * @param x The input tensor.
 * @param clipValueMin Lower-bound of range to be clipped to.
 * @param clipValueMax Upper-bound of range to be clipped to.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function clipByValue_<T extends Tensor>(x: T | TensorLike, clipValueMin: number, clipValueMax: number): T;

export declare class ComposableTask<T> {
    then(onfulfilled: (value: T) => T | PromiseLike<T>): Promise<T>;
    run(): Promise<T>;
}

export declare class ComputeAllFaceDescriptorsTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource>[], TSource[]> {
    run(): Promise<WithFaceDescriptor<TSource>[]>;
    withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
    withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
}

/**
 * Computes the information for a forward pass of a convolution/pooling
 * operation.
 */
declare function computeConv2DInfo(inShape: [number, number, number, number], filterShape: [number, number, number, number], strides: number | [number, number], dilations: number | [number, number], pad: 'same' | 'valid' | number | ExplicitPadding, roundingMode?: 'floor' | 'round' | 'ceil', depthwise?: boolean, dataFormat?: 'channelsFirst' | 'channelsLast'): Conv2DInfo;

/**
 * Computes the information for a forward pass of a 3D convolution/pooling
 * operation.
 */
declare function computeConv3DInfo(inShape: [number, number, number, number, number], filterShape: [number, number, number, number, number], strides: number | [number, number, number], dilations: number | [number, number, number], pad: 'same' | 'valid' | number, depthwise?: boolean, dataFormat?: 'channelsFirst' | 'channelsLast', roundingMode?: 'floor' | 'round' | 'ceil'): Conv3DInfo;

declare function computeDefaultPad(inputShape: [number, number] | [number, number, number, number], fieldSize: number, stride: number, dilation?: number): number;

/**
 *
 * @param inputShape Input tensor shape is of the following dimensions:
 *     `[batch, height, width, inChannels]`.
 * @param filterShape The filter shape is of the following dimensions:
 *     `[filterHeight, filterWidth, depth]`.
 * @param strides The strides of the sliding window for each dimension of the
 *     input tensor: `[strideHeight, strideWidth]`.
 *     If `strides` is a single number,
 *     then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1*1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dataFormat The data format of the input and output data.
 *     Defaults to 'NHWC'.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`.
 *     Defaults to `[1, 1]`. If `dilations` is a single number, then
 *     `dilationHeight == dilationWidth`.
 */
declare function computeDilation2DInfo(inputShape: [number, number, number, number], filterShape: [number, number, number], strides: number | [number, number], pad: 'same' | 'valid' | number, dataFormat: 'NHWC', dilations: number | [number, number]): Conv2DInfo;

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
export declare const computeFaceDescriptor: (input: TNetInput) => Promise<Float32Array | Float32Array[]>;

export declare class ComputeFaceDescriptorsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput);
}

declare function computePool2DInfo(inShape: [number, number, number, number], filterSize: [number, number] | number, strides: number | [number, number], dilations: number | [number, number], pad: 'same' | 'valid' | number | ExplicitPadding, roundingMode?: 'floor' | 'round' | 'ceil', dataFormat?: 'channelsFirst' | 'channelsLast'): Conv2DInfo;

/**
 * Computes the information for a forward pass of a pooling3D operation.
 */
declare function computePool3DInfo(inShape: [number, number, number, number, number], filterSize: number | [number, number, number], strides: number | [number, number, number], dilations: number | [number, number, number], pad: 'same' | 'valid' | number, roundingMode?: 'floor' | 'round' | 'ceil', dataFormat?: 'NDHWC' | 'NCDHW'): Conv3DInfo;

declare function computeReshapedDimensions({ width, height }: IDimensions, inputSize: number): Dimensions;

export declare class ComputeSingleFaceDescriptorTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource> | undefined, TSource | undefined> {
    run(): Promise<WithFaceDescriptor<TSource> | undefined>;
    withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
    withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceDescriptor<TSource>>;
}

declare const concat: typeof concat_;

/**
 * Concatenates a list of `tf.Tensor`s along a given axis.
 *
 * The tensors ranks and types must match, and their sizes must match in all
 * dimensions except `axis`.
 *
 * Also available are stricter rank-specific methods that assert that
 * `tensors` are of the given rank:
 *   - `tf.concat1d`
 *   - `tf.concat2d`
 *   - `tf.concat3d`
 *   - `tf.concat4d`
 *
 * Except `tf.concat1d` (which does not have axis param), all methods have
 * same signature as this method.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * a.concat(b).print();  // or a.concat(b)
 * ```
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 * tf.concat([a, b, c]).print();
 * ```
 *
 * ```js
 * const a = tf.tensor2d([[1, 2], [10, 20]]);
 * const b = tf.tensor2d([[3, 4], [30, 40]]);
 * const axis = 1;
 * tf.concat([a, b], axis).print();
 * ```
 * @param tensors A list of tensors to concatenate.
 * @param axis The axis to concate along. Defaults to 0 (the first dim).
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function concat_<T extends Tensor>(tensors: Array<T | TensorLike>, axis?: number): T;

declare const conv2d: typeof conv2d_;

/**
 * Computes a 2D convolution over the input x.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter, rank 4, of shape
 *     `[filterHeight, filterWidth, inDepth, outDepth]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels].
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. If none is
 *     provided, it will default to truncate.
 *
 * @doc {heading: 'Operations', subheading: 'Convolution'}
 */
declare function conv2d_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filter: Tensor4D | TensorLike, strides: [number, number] | number, pad: 'valid' | 'same' | number | conv_util.ExplicitPadding, dataFormat?: 'NHWC' | 'NCHW', dilations?: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;

/**
 * Information about the forward pass of a convolution/pooling operation.
 * It includes input and output shape, strides, filter size and padding
 * information.
 */
declare type Conv2DInfo = {
    batchSize: number;
    inHeight: number;
    inWidth: number;
    inChannels: number;
    outHeight: number;
    outWidth: number;
    outChannels: number;
    dataFormat: 'channelsFirst' | 'channelsLast';
    strideHeight: number;
    strideWidth: number;
    dilationHeight: number;
    dilationWidth: number;
    filterHeight: number;
    filterWidth: number;
    effectiveFilterHeight: number;
    effectiveFilterWidth: number;
    padInfo: PadInfo;
    inShape: [number, number, number, number];
    outShape: [number, number, number, number];
    filterShape: [number, number, number, number];
};

/**
 * Information about the forward pass of a 3D convolution/pooling operation.
 * It includes input and output shape, strides, filter size and padding
 * information.
 */
declare type Conv3DInfo = {
    batchSize: number;
    inDepth: number;
    inHeight: number;
    inWidth: number;
    inChannels: number;
    outDepth: number;
    outHeight: number;
    outWidth: number;
    outChannels: number;
    dataFormat: 'channelsFirst' | 'channelsLast';
    strideDepth: number;
    strideHeight: number;
    strideWidth: number;
    dilationDepth: number;
    dilationHeight: number;
    dilationWidth: number;
    filterDepth: number;
    filterHeight: number;
    filterWidth: number;
    effectiveFilterDepth: number;
    effectiveFilterHeight: number;
    effectiveFilterWidth: number;
    padInfo: PadInfo3D;
    inShape: [number, number, number, number, number];
    outShape: [number, number, number, number, number];
    filterShape: [number, number, number, number, number];
};

declare namespace conv_util {
    export {
        computeDilation2DInfo,
        computePool2DInfo,
        computePool3DInfo,
        computeConv2DInfo,
        computeConv3DInfo,
        computeDefaultPad,
        tupleValuesAreOne,
        eitherStridesOrDilationsAreOne,
        convertConv2DDataFormat,
        checkPadOnDimRoundingMode,
        ExplicitPadding,
        PadInfo,
        PadInfo3D,
        Conv2DInfo,
        Conv3DInfo
    }
}

/**
 * Convert Conv2D dataFormat from 'NHWC'|'NCHW' to
 *    'channelsLast'|'channelsFirst'
 * @param dataFormat in 'NHWC'|'NCHW' mode
 * @return dataFormat in 'channelsLast'|'channelsFirst' mode
 * @throws unknown dataFormat
 */
declare function convertConv2DDataFormat(dataFormat: 'NHWC' | 'NCHW'): 'channelsLast' | 'channelsFirst';

declare type ConvLayerParams = {
    conv: ConvParams;
    scale: ScaleLayerParams;
};

declare type ConvParams = {
    filters: tf.Tensor4D;
    bias: tf.Tensor1D;
};

export declare type ConvWithBatchNorm = {
    conv: ConvParams;
    bn: BatchNorm;
};

declare function createBrowserEnv(): Environment;

export declare function createCanvas({ width, height }: IDimensions): HTMLCanvasElement;

export declare function createCanvasFromMedia(media: HTMLImageElement | HTMLVideoElement | ImageData, dims?: IDimensions): HTMLCanvasElement;

export declare function createFaceDetectionNet(weights: Float32Array): SsdMobilenetv1;

export declare function createFaceRecognitionNet(weights: Float32Array): FaceRecognitionNet;

declare function createFileSystem(fs?: any): FileSystem_2;

declare function createNodejsEnv(): Environment;

export declare function createSsdMobilenetv1(weights: Float32Array): SsdMobilenetv1;

export declare function createTinyFaceDetector(weights: Float32Array): TinyFaceDetector;

export declare function createTinyYolov2(weights: Float32Array, withSeparableConvs?: boolean): TinyYolov2;

/**
 * We wrap data id since we use weak map to avoid memory leaks.
 * Since we have our own memory management, we have a reference counter
 * mapping a tensor to its data, so there is always a pointer (even if that
 * data is otherwise garbage collectable).
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
 * Global_Objects/WeakMap
 */
declare type DataId = object;

declare type DataToGPUOptions = DataToGPUWebGLOption;

declare interface DataToGPUWebGLOption {
    customTexShape?: [number, number];
}

/** @docalias 'float32'|'int32'|'bool'|'complex64'|'string' */
declare type DataType = keyof DataTypeMap;

declare interface DataTypeMap {
    float32: Float32Array;
    int32: Int32Array;
    bool: Uint8Array;
    complex64: Float32Array;
    string: string[];
}

export declare type DefaultTinyYolov2NetParams = {
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

declare type DenseBlock3Params = {
    conv0: SeparableConvParams | ConvParams;
    conv1: SeparableConvParams;
    conv2: SeparableConvParams;
};

declare type DenseBlock4Params = DenseBlock3Params & {
    conv3: SeparableConvParams;
};

declare const depthwiseConv2d: typeof depthwiseConv2d_;

/**
 * Depthwise 2D convolution.
 *
 * Given a 4D `input` array and a `filter` array of shape
 * `[filterHeight, filterWidth, inChannels, channelMultiplier]` containing
 * `inChannels` convolutional filters of depth 1, this op applies a
 * different filter to each input channel (expanding from 1 channel to
 * `channelMultiplier` channels for each), then concatenates the results
 * together. The output has `inChannels * channelMultiplier` channels.
 *
 * See
 * [https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d](
 *     https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d)
 * for more details.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter tensor, rank 4, of shape
 *     `[filterHeight, filterWidth, inChannels, channelMultiplier]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`. If strides is a single number, then `strideHeight ==
 * strideWidth`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `rate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. If none is
 *     provided, it will default to truncate.
 *
 * @doc {heading: 'Operations', subheading: 'Convolution'}
 */
declare function depthwiseConv2d_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filter: Tensor4D | TensorLike, strides: [number, number] | number, pad: 'valid' | 'same' | number | conv_util.ExplicitPadding, dataFormat?: 'NHWC' | 'NCHW', dilations?: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;

export declare class DetectAllFaceLandmarksTask<TSource extends WithFaceDetection<{}>> extends DetectFaceLandmarksTaskBase<WithFaceLandmarks<TSource>[], TSource[]> {
    run(): Promise<WithFaceLandmarks<TSource>[]>;
    withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
}

export declare function detectAllFaces(input: TNetInput, options?: FaceDetectionOptions): DetectAllFacesTask;

export declare class DetectAllFacesTask extends DetectFacesTaskBase<FaceDetection[]> {
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

/**
 * Detects the 68 point face landmark positions of the face shown in an image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
export declare const detectFaceLandmarks: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;

export declare class DetectFaceLandmarksTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    protected useTinyLandmarkNet: boolean;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, useTinyLandmarkNet: boolean);
    protected get landmarkNet(): FaceLandmark68Net | FaceLandmark68TinyNet;
}

/**
 * Detects the 68 point face landmark positions of the face shown in an image
 * using a tinier version of the 68 point face landmark model, which is slightly
 * faster at inference, but also slightly less accurate.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
export declare const detectFaceLandmarksTiny: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;

export declare class DetectFacesTaskBase<TReturn> extends ComposableTask<TReturn> {
    protected input: TNetInput;
    protected options: FaceDetectionOptions;
    constructor(input: TNetInput, options?: FaceDetectionOptions);
}

export declare const detectLandmarks: (input: TNetInput) => Promise<FaceLandmarks68 | FaceLandmarks68[]>;

export declare function detectSingleFace(input: TNetInput, options?: FaceDetectionOptions): DetectSingleFaceTask;

export declare class DetectSingleFaceLandmarksTask<TSource extends WithFaceDetection<{}>> extends DetectFaceLandmarksTaskBase<WithFaceLandmarks<TSource> | undefined, TSource | undefined> {
    run(): Promise<WithFaceLandmarks<TSource> | undefined>;
    withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceLandmarks<TSource, FaceLandmarks68>>;
}

export declare class DetectSingleFaceTask extends DetectFacesTaskBase<FaceDetection | undefined> {
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

export declare class Dimensions implements IDimensions {
    private _width;
    private _height;
    constructor(width: number, height: number);
    get width(): number;
    get height(): number;
    reverse(): Dimensions;
}

declare const div: typeof div_;

/**
 * Divides two `tf.Tensor`s element-wise, A / B. Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 9, 16]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * ```js
 * // Broadcast div a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(2);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * @param a The first tensor as the numerator.
 * @param b The second tensor as the denominator. Must have the same dtype as
 * `a`.
 *
 * @doc {heading: 'Operations', subheading: 'Arithmetic'}
 */
declare function div_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;

declare namespace draw {
    export {
        drawContour,
        drawDetections,
        TDrawDetectionsInput,
        drawFaceExpressions,
        DrawFaceExpressionsInput,
        IDrawBoxOptions,
        DrawBoxOptions,
        DrawBox,
        drawFaceLandmarks,
        IDrawFaceLandmarksOptions,
        DrawFaceLandmarksOptions,
        DrawFaceLandmarks,
        DrawFaceLandmarksInput,
        AnchorPosition,
        IDrawTextFieldOptions,
        DrawTextFieldOptions,
        DrawTextField
    }
}
export { draw }

declare class DrawBox {
    box: Box;
    options: DrawBoxOptions;
    constructor(box: IBoundingBox | IRect, options?: IDrawBoxOptions);
    draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
}

declare class DrawBoxOptions {
    boxColor: string;
    lineWidth: number;
    drawLabelOptions: DrawTextFieldOptions;
    label?: string;
    constructor(options?: IDrawBoxOptions);
}

declare function drawContour(ctx: CanvasRenderingContext2D, points: Point[], isClosed?: boolean): void;

declare function drawDetections(canvasArg: string | HTMLCanvasElement, detections: TDrawDetectionsInput | Array<TDrawDetectionsInput>): void;

declare function drawFaceExpressions(canvasArg: string | HTMLCanvasElement, faceExpressions: DrawFaceExpressionsInput | Array<DrawFaceExpressionsInput>, minConfidence?: number, textFieldAnchor?: IPoint): void;

declare type DrawFaceExpressionsInput = FaceExpressions | WithFaceExpressions<{}>;

declare class DrawFaceLandmarks {
    faceLandmarks: FaceLandmarks;
    options: DrawFaceLandmarksOptions;
    constructor(faceLandmarks: FaceLandmarks, options?: IDrawFaceLandmarksOptions);
    draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
}

declare function drawFaceLandmarks(canvasArg: string | HTMLCanvasElement, faceLandmarks: DrawFaceLandmarksInput | Array<DrawFaceLandmarksInput>): void;

declare type DrawFaceLandmarksInput = FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>>;

declare class DrawFaceLandmarksOptions {
    drawLines: boolean;
    drawPoints: boolean;
    lineWidth: number;
    pointSize: number;
    lineColor: string;
    pointColor: string;
    constructor(options?: IDrawFaceLandmarksOptions);
}

declare class DrawTextField {
    text: string[];
    anchor: IPoint;
    options: DrawTextFieldOptions;
    constructor(text: string | string[] | DrawTextField, anchor: IPoint, options?: IDrawTextFieldOptions);
    measureWidth(ctx: CanvasRenderingContext2D): number;
    measureHeight(): number;
    getUpperLeft(ctx: CanvasRenderingContext2D, canvasDims?: IDimensions): IPoint;
    draw(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): void;
}

declare class DrawTextFieldOptions implements IDrawTextFieldOptions {
    anchorPosition: AnchorPosition;
    backgroundColor: string;
    fontColor: string;
    fontSize: number;
    fontStyle: string;
    padding: number;
    constructor(options?: IDrawTextFieldOptions);
}

declare function eitherStridesOrDilationsAreOne(strides: number | number[], dilations: number | number[]): boolean;

declare let ENV: Environment_2;

export declare const env: {
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

export declare type Environment = FileSystem_2 & {
    Canvas: typeof HTMLCanvasElement;
    CanvasRenderingContext2D: typeof CanvasRenderingContext2D;
    Image: typeof HTMLImageElement;
    ImageData: typeof ImageData;
    Video: typeof HTMLVideoElement;
    createCanvasElement: () => HTMLCanvasElement;
    createImageElement: () => HTMLImageElement;
    createVideoElement: () => HTMLVideoElement;
    fetch: (url: string, init?: RequestInit) => Promise<Response>;
};

/**
 * The environment contains evaluated flags as well as the registered platform.
 * This is always used as a global singleton and can be retrieved with
 * `tf.env()`.
 *
 * @doc {heading: 'Environment'}
 */
declare class Environment_2 {
    global: any;
    private flags;
    private flagRegistry;
    private urlFlags;
    platformName: string;
    platform: Platform;
    getQueryParams: typeof getQueryParams;
    constructor(global: any);
    setPlatform(platformName: string, platform: Platform): void;
    registerFlag(flagName: string, evaluationFn: FlagEvaluationFn, setHook?: (value: FlagValue) => void): void;
    getAsync(flagName: string): Promise<FlagValue>;
    get(flagName: string): FlagValue;
    getNumber(flagName: string): number;
    getBool(flagName: string): boolean;
    getFlags(): Flags;
    readonly features: Flags;
    set(flagName: string, value: FlagValue): void;
    private evaluateFlag;
    setFlags(flags: Flags): void;
    reset(): void;
    private populateURLFlags;
}

export declare function euclideanDistance(arr1: number[] | Float32Array, arr2: number[] | Float32Array): number;

declare const exp: typeof exp_;

/**
 * Computes exponential of the input `tf.Tensor` element-wise. `e ^ x`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, -3]);
 *
 * x.exp().print();  // or tf.exp(x)
 * ```
 * @param x The input tensor.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function exp_<T extends Tensor>(x: T | TensorLike): T;

declare const expandDims: typeof expandDims_;

/**
 * Returns a `tf.Tensor` that has expanded rank, by inserting a dimension
 * into the tensor's shape.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * const axis = 1;
 * x.expandDims(axis).print();
 * ```
 *
 * @param x The input tensor whose dimensions to be expanded.
 * @param axis The dimension index at which to insert shape of `1`. Defaults
 *     to 0 (the first dimension).
 *
 * @doc {heading: 'Tensors', subheading: 'Transformations'}
 */
declare function expandDims_<T extends Tensor>(x: Tensor | TensorLike, axis?: number): T;

declare type ExplicitPadding = [[number, number], [number, number], [number, number], [number, number]];

export declare function extendWithAge<TSource>(sourceObj: TSource, age: number): WithAge<TSource>;

export declare function extendWithFaceDescriptor<TSource>(sourceObj: TSource, descriptor: Float32Array): WithFaceDescriptor<TSource>;

export declare function extendWithFaceDetection<TSource>(sourceObj: TSource, detection: FaceDetection): WithFaceDetection<TSource>;

export declare function extendWithFaceExpressions<TSource>(sourceObj: TSource, expressions: FaceExpressions): WithFaceExpressions<TSource>;

export declare function extendWithFaceLandmarks<TSource extends WithFaceDetection<{}>, TFaceLandmarks extends FaceLandmarks = FaceLandmarks68>(sourceObj: TSource, unshiftedLandmarks: TFaceLandmarks): WithFaceLandmarks<TSource, TFaceLandmarks>;

export declare function extendWithGender<TSource>(sourceObj: TSource, gender: Gender, genderProbability: number): WithGender<TSource>;

/**
 * Extracts the image regions containing the detected faces.
 *
 * @param input The image that face detection has been performed on.
 * @param detections The face detection results or face bounding boxes for that image.
 * @returns The Canvases of the corresponding image region for each detected face.
 */
export declare function extractFaces(input: TNetInput, detections: Array<FaceDetection | Rect>): Promise<HTMLCanvasElement[]>;

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
export declare function extractFaceTensors(imageTensor: tf.Tensor3D | tf.Tensor4D, detections: Array<FaceDetection | Rect>): Promise<tf.Tensor3D[]>;

export declare const FACE_EXPRESSION_LABELS: string[];

export declare class FaceDetection extends ObjectDetection implements IFaceDetecion {
    constructor(score: number, relativeBox: Rect, imageDims: IDimensions);
    forSize(width: number, height: number): FaceDetection;
}

export declare type FaceDetectionFunction = (input: TNetInput) => Promise<FaceDetection[]>;

export declare class FaceDetectionNet extends SsdMobilenetv1 {
}

export declare type FaceDetectionOptions = TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options;

export declare class FaceExpressionNet extends FaceProcessor<FaceFeatureExtractorParams> {
    constructor(faceFeatureExtractor?: FaceFeatureExtractor);
    forwardInput(input: NetInput | tf.Tensor4D): tf.Tensor2D;
    forward(input: TNetInput): Promise<tf.Tensor2D>;
    predictExpressions(input: TNetInput): Promise<any>;
    protected getDefaultModelName(): string;
    protected getClassifierChannelsIn(): number;
    protected getClassifierChannelsOut(): number;
}

export declare class FaceExpressions {
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

declare class FaceFeatureExtractor extends NeuralNetwork<FaceFeatureExtractorParams> implements IFaceFeatureExtractor<FaceFeatureExtractorParams> {
    constructor();
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: FaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: FaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}

declare type FaceFeatureExtractorParams = {
    dense0: DenseBlock4Params;
    dense1: DenseBlock4Params;
    dense2: DenseBlock4Params;
    dense3: DenseBlock4Params;
};

export declare class FaceLandmark68Net extends FaceLandmark68NetBase<FaceFeatureExtractorParams> {
    constructor(faceFeatureExtractor?: FaceFeatureExtractor);
    protected getDefaultModelName(): string;
    protected getClassifierChannelsIn(): number;
}

declare abstract class FaceLandmark68NetBase<TExtractorParams extends FaceFeatureExtractorParams | TinyFaceFeatureExtractorParams> extends FaceProcessor<TExtractorParams> {
    postProcess(output: tf.Tensor2D, inputSize: number, originalDimensions: IDimensions[]): tf.Tensor2D;
    forwardInput(input: NetInput): tf.Tensor2D;
    forward(input: TNetInput): Promise<tf.Tensor2D>;
    detectLandmarks(input: TNetInput): Promise<FaceLandmarks68 | FaceLandmarks68[]>;
    protected getClassifierChannelsOut(): number;
}

export declare class FaceLandmark68TinyNet extends FaceLandmark68NetBase<TinyFaceFeatureExtractorParams> {
    constructor(faceFeatureExtractor?: TinyFaceFeatureExtractor);
    protected getDefaultModelName(): string;
    protected getClassifierChannelsIn(): number;
}

export declare class FaceLandmarkNet extends FaceLandmark68Net {
}

export declare class FaceLandmarks implements IFaceLandmarks {
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

export declare class FaceLandmarks5 extends FaceLandmarks {
    protected getRefPointsForAlignment(): Point[];
}

export declare class FaceLandmarks68 extends FaceLandmarks {
    getJawOutline(): Point[];
    getLeftEyeBrow(): Point[];
    getRightEyeBrow(): Point[];
    getNose(): Point[];
    getLeftEye(): Point[];
    getRightEye(): Point[];
    getMouth(): Point[];
    protected getRefPointsForAlignment(): Point[];
}

export declare class FaceMatch implements IFaceMatch {
    private _label;
    private _distance;
    constructor(label: string, distance: number);
    get label(): string;
    get distance(): number;
    toString(withDistance?: boolean): string;
}

export declare class FaceMatcher {
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

declare abstract class FaceProcessor<TExtractorParams extends FaceFeatureExtractorParams | TinyFaceFeatureExtractorParams> extends NeuralNetwork<NetParams_2> {
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
        params: NetParams_2;
        paramMappings: ParamMapping[];
    };
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: NetParams_2;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams_2;
        paramMappings: ParamMapping[];
    };
}

export declare class FaceRecognitionNet extends NeuralNetwork<NetParams_3> {
    constructor();
    forwardInput(input: NetInput): tf.Tensor2D;
    forward(input: TNetInput): Promise<tf.Tensor2D>;
    computeFaceDescriptor(input: TNetInput): Promise<Float32Array | Float32Array[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: NetParams_3;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams_3;
        paramMappings: ParamMapping[];
    };
}

declare type FCParams = {
    weights: tf.Tensor2D;
    bias: tf.Tensor1D;
};

export declare function fetchImage(uri: string): Promise<HTMLImageElement>;

export declare function fetchJson<T>(uri: string): Promise<T>;

export declare function fetchNetWeights(uri: string): Promise<Float32Array>;

export declare function fetchOrThrow(url: string, init?: RequestInit): Promise<Response>;

export declare function fetchVideo(uri: string): Promise<HTMLVideoElement>;

declare type FileSystem_2 = {
    readFile: (filePath: string) => Promise<any>;
};
export { FileSystem_2 as FileSystem }

/**
 * Creates a `tf.Tensor` filled with a scalar value.
 *
 * ```js
 * tf.fill([2, 2], 4).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param value The scalar value to fill the tensor with.
 * @param dtype The type of an element in the resulting tensor. Defaults to
 * 'float'.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function fill<R extends Rank>(shape: ShapeMap[R], value: number | string, dtype?: DataType): Tensor<R>;

declare type FlagEvaluationFn = (() => FlagValue) | (() => Promise<FlagValue>);

declare type Flags = {
    [featureName: string]: FlagValue;
};

declare type FlagValue = number | boolean;

export declare enum Gender {
    FEMALE = "female",
    MALE = "male"
}

declare function getCenterPoint(pts: Point[]): Point;

export declare function getContext2dOrThrow(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): CanvasRenderingContext2D;

declare function getEnv(): Environment;

export declare function getMediaDimensions(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | IDimensions): Dimensions;

declare function getQueryParams(queryString: string): {
    [key: string]: string;
};

declare interface GPUData {
    tensorRef: Tensor;
    texture?: WebGLTexture;
    texShape?: [number, number];
}

export declare interface IBoundingBox {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export declare interface IDimensions {
    width: number;
    height: number;
}

declare interface IDrawBoxOptions {
    boxColor?: string;
    lineWidth?: number;
    drawLabelOptions?: IDrawTextFieldOptions;
    label?: string;
}

declare interface IDrawFaceLandmarksOptions {
    drawLines?: boolean;
    drawPoints?: boolean;
    lineWidth?: number;
    pointSize?: number;
    lineColor?: string;
    pointColor?: string;
}

declare interface IDrawTextFieldOptions {
    anchorPosition?: AnchorPosition;
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: number;
    fontStyle?: string;
    padding?: number;
}

export declare interface IFaceDetecion {
    score: number;
    box: Box;
}

declare interface IFaceFeatureExtractor<TNetParams extends TinyFaceFeatureExtractorParams | FaceFeatureExtractorParams> extends NeuralNetwork<TNetParams> {
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
}

export declare interface IFaceLandmarks {
    positions: Point[];
    shift: Point;
}

export declare interface IFaceMatch {
    label: string;
    distance: number;
}

export declare function imageTensorToCanvas(imgTensor: tf.Tensor, canvas?: HTMLCanvasElement): Promise<HTMLCanvasElement>;

export declare function imageToSquare(input: HTMLImageElement | HTMLCanvasElement, inputSize: number, centerImage?: boolean): HTMLCanvasElement;

declare function initialize(): void | null;

export declare function inverseSigmoid(x: number): number;

export declare function iou(box1: Box, box2: Box, isIOU?: boolean): number;

export declare interface IPoint {
    x: number;
    y: number;
}

export declare interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare function isBrowser(): boolean;

declare function isDimensions(obj: any): boolean;

declare function isEven(num: number): boolean;

declare function isFloat(num: number): boolean;

export declare function isMediaElement(input: any): boolean;

export declare function isMediaLoaded(media: HTMLImageElement | HTMLVideoElement): boolean;

declare function isNodejs(): boolean;

export declare interface ISsdMobilenetv1Options {
    minConfidence?: number;
    maxResults?: number;
}

declare function isTensor(tensor: any, dim: number): boolean;

declare function isTensor1D(tensor: any): tensor is tf.Tensor1D;

declare function isTensor2D(tensor: any): tensor is tf.Tensor2D;

declare function isTensor3D(tensor: any): tensor is tf.Tensor3D;

declare function isTensor4D(tensor: any): tensor is tf.Tensor4D;

declare function isValidNumber(num: any): boolean;

declare function isValidProbablitiy(num: any): boolean;

export declare function isWithAge(obj: any): obj is WithAge<{}>;

export declare function isWithFaceDetection(obj: any): obj is WithFaceDetection<{}>;

export declare function isWithFaceExpressions(obj: any): obj is WithFaceExpressions<{}>;

export declare function isWithFaceLandmarks(obj: any): obj is WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks>;

export declare function isWithGender(obj: any): obj is WithGender<{}>;

export declare type ITinyFaceDetectorOptions = ITinyYolov2Options;

export declare interface ITinyYolov2Options {
    inputSize?: number;
    scoreThreshold?: number;
}

export declare class LabeledBox extends Box {
    static assertIsValidLabeledBox(box: any, callee: string): void;
    private _label;
    constructor(box: IBoundingBox | IRect | any, label: number);
    get label(): number;
}

export declare class LabeledFaceDescriptors {
    private _label;
    private _descriptors;
    constructor(label: string, descriptors: Float32Array[]);
    get label(): string;
    get descriptors(): Float32Array[];
    toJSON(): any;
    static fromJSON(json: any): LabeledFaceDescriptors;
}

export declare const loadAgeGenderModel: (url: string) => Promise<void>;

export declare const loadFaceDetectionModel: (url: string) => Promise<void>;

export declare const loadFaceExpressionModel: (url: string) => Promise<void>;

export declare const loadFaceLandmarkModel: (url: string) => Promise<void>;

export declare const loadFaceLandmarkTinyModel: (url: string) => Promise<void>;

export declare const loadFaceRecognitionModel: (url: string) => Promise<void>;

export declare const loadSsdMobilenetv1Model: (url: string) => Promise<void>;

export declare const loadTinyFaceDetectorModel: (url: string) => Promise<void>;

export declare const loadTinyYolov2Model: (url: string) => Promise<void>;

export declare function loadWeightMap(uri: string | undefined, defaultModelName: string): Promise<tf.NamedTensorMap>;

export declare const locateFaces: (input: TNetInput, options: SsdMobilenetv1Options) => Promise<FaceDetection[]>;

export declare function matchDimensions(input: IDimensions, reference: IDimensions, useMediaDimensions?: boolean): {
    width: number;
    height: number;
};

declare const matMul: typeof matMul_;

/**
 * Computes the dot product of two matrices, A * B. These must be matrices.
 *
 * ```js
 * const a = tf.tensor2d([1, 2], [1, 2]);
 * const b = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.matMul(b).print();  // or tf.matMul(a, b)
 * ```
 * @param a First matrix in dot product operation.
 * @param b Second matrix in dot product operation.
 * @param transposeA If true, `a` is transposed before multiplication.
 * @param transposeB If true, `b` is transposed before multiplication.
 *
 * @doc {heading: 'Operations', subheading: 'Matrices'}
 */
declare function matMul_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike, transposeA?: boolean, transposeB?: boolean): T;

declare const maxPool: typeof maxPool_;

/**
 * Computes the 2D max pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in dilated pooling. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. If none is
 *     provided, it will default to truncate.
 */
declare function maxPool_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number | conv_util.ExplicitPadding, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;

export declare function minBbox(pts: IPoint[]): BoundingBox;

export declare type MobilenetParams = {
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

declare namespace MobileNetV1 {
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

declare function monkeyPatch(env: Partial<Environment>): void;

declare const mul: typeof mul_;

/**
 * Multiplies two `tf.Tensor`s element-wise, A * B. Supports broadcasting.
 *
 * We also expose `tf.mulStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.tensor1d([2, 3, 4, 5]);
 *
 * a.mul(b).print();  // or tf.mul(a, b)
 * ```
 *
 * ```js
 * // Broadcast mul a with b.
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.scalar(5);
 *
 * a.mul(b).print();  // or tf.mul(a, b)
 * ```
 * @param a The first tensor to multiply.
 * @param b The second tensor to multiply. Must have the same dtype as `a`.
 *
 * @doc {heading: 'Operations', subheading: 'Arithmetic'}
 */
declare function mul_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;

/** @docalias {[name: string]: Tensor} */
declare type NamedTensorMap = {
    [name: string]: Tensor;
};

export declare class NetInput {
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

export declare type NetOutput = {
    age: tf.Tensor1D;
    gender: tf.Tensor2D;
};

export declare type NetParams = {
    fc: {
        age: FCParams;
        gender: FCParams;
    };
};

declare type NetParams_2 = {
    fc: FCParams;
};

declare type NetParams_3 = {
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

declare type NetParams_4 = {
    mobilenetv1: MobileNetV1.Params;
    prediction_layer: PredictionLayerParams;
    output_layer: OutputLayerParams;
};

export declare const nets: {
    ssdMobilenetv1: SsdMobilenetv1;
    tinyFaceDetector: TinyFaceDetector;
    tinyYolov2: TinyYolov2;
    faceLandmark68Net: FaceLandmark68Net;
    faceLandmark68TinyNet: FaceLandmark68TinyNet;
    faceRecognitionNet: FaceRecognitionNet;
    faceExpressionNet: FaceExpressionNet;
    ageGenderNet: AgeGenderNet;
};

export declare abstract class NeuralNetwork<TNetParams> {
    constructor(name: string);
    protected _params: TNetParams | undefined;
    protected _paramMappings: ParamMapping[];
    _name: any;
    get params(): TNetParams | undefined;
    get paramMappings(): ParamMapping[];
    get isLoaded(): boolean;
    getParamFromPath(paramPath: string): tf.Tensor;
    reassignParamFromPath(paramPath: string, tensor: tf.Tensor): void;
    getParamList(): {
        path: string;
        tensor: tf.Tensor;
    }[];
    getTrainableParams(): {
        path: string;
        tensor: tf.Tensor;
    }[];
    getFrozenParams(): {
        path: string;
        tensor: tf.Tensor;
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
    protected abstract extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TNetParams;
        paramMappings: ParamMapping[];
    };
    protected abstract extractParams(weights: Float32Array): {
        params: TNetParams;
        paramMappings: ParamMapping[];
    };
}

export declare function nonMaxSuppression(boxes: Box[], scores: number[], iouThreshold: number, isIOU?: boolean): number[];

export declare function normalize(x: tf.Tensor4D, meanRgb: number[]): tf.Tensor4D;

declare type NumericDataType = 'float32' | 'int32' | 'bool' | 'complex64';

export declare class ObjectDetection {
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

declare type OutputLayerParams = {
    extra_dim: tf.Tensor3D;
};

declare const pad: typeof pad_;

/**
 * Pads a `tf.Tensor` with a given value and paddings.
 *
 * This operation implements `CONSTANT` mode. For `REFLECT` and `SYMMETRIC`,
 * refer to `tf.mirrorPad`
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that `paddings` is of given length.
 *   - `tf.pad1d`
 *   - `tf.pad2d`
 *   - `tf.pad3d`
 *   - `tf.pad4d`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * x.pad([[1, 2]]).print();
 * ```
 * @param x The tensor to pad.
 * @param paddings An array of length `R` (the rank of the tensor), where
 * each element is a length-2 tuple of ints `[padBefore, padAfter]`,
 * specifying how much to pad along each dimension of the tensor.
 * @param constantValue The pad value to use. Defaults to 0.
 *
 * @doc {heading: 'Tensors', subheading: 'Transformations'}
 */
declare function pad_<T extends Tensor>(x: T | TensorLike, paddings: Array<[number, number]>, constantValue?: number): T;

declare type PadInfo = {
    top: number;
    left: number;
    right: number;
    bottom: number;
    type: PadType;
};

declare type PadInfo3D = {
    top: number;
    left: number;
    right: number;
    bottom: number;
    front: number;
    back: number;
    type: PadType;
};

/**
 * Pads the smaller dimension of an image tensor with zeros, such that width === height.
 *
 * @param imgTensor The image tensor.
 * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
 * both sides of the minor dimension oof the image.
 * @returns The padded tensor with width === height.
 */
export declare function padToSquare(imgTensor: tf.Tensor4D, isCenterImage?: boolean): tf.Tensor4D;

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/// <amd-module name="@tensorflow/tfjs-core/dist/ops/conv_util" />
declare type PadType = 'SAME' | 'VALID' | 'NUMBER' | 'EXPLICIT';

declare type ParamMapping = {
    originalPath?: string;
    paramPath: string;
};

/**
 * At any given time a single platform is active and represents and
 * implementation of this interface. In practice, a platform is an environment
 * where TensorFlow.js can be executed, e.g. the browser or Node.js.
 */
declare interface Platform {
    /**
     * Makes an HTTP request.
     * @param path The URL path to make a request to
     * @param init The request init. See init here:
     *     https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
     */
    fetch(path: string, requestInits?: RequestInit, options?: RequestDetails): Promise<Response>;
    /**
     * Returns the current high-resolution time in milliseconds relative to an
     * arbitrary time in the past. It works across different platforms (node.js,
     * browsers).
     */
    now(): number;
    /**
     * Encode the provided string into an array of bytes using the provided
     * encoding.
     */
    encode(text: string, encoding: string): Uint8Array;
    /** Decode the provided bytes into a string using the provided encoding. */
    decode(bytes: Uint8Array, encoding: string): string;
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

declare type PointwiseConvParams = {
    filters: tf.Tensor4D;
    batch_norm_offset: tf.Tensor1D;
};

/**
 * Predicts age and gender from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Predictions with age, gender and gender probability or array thereof in case of batch input.
 */
export declare const predictAgeAndGender: (input: TNetInput) => Promise<AgeAndGenderPrediction | AgeAndGenderPrediction[]>;

declare class PredictAgeAndGenderTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    protected extractedFaces?: any[] | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: any[] | undefined);
}

declare class PredictAllAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>>[], TSource[]> {
    run(): Promise<WithAge<WithGender<TSource>>[]>;
    withFaceExpressions(): PredictAllFaceExpressionsTask<WithAge<WithGender<TSource>>>;
}

declare class PredictAllAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllAgeAndGenderTask<TSource> {
    withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithAge<WithGender<TSource>>>;
}

declare class PredictAllFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource>[], TSource[]> {
    run(): Promise<WithFaceExpressions<TSource>[]>;
    withAgeAndGender(): PredictAllAgeAndGenderTask<WithFaceExpressions<TSource>>;
}

declare class PredictAllFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllFaceExpressionsTask<TSource> {
    withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceExpressions<TSource>>;
}

export declare class PredictedBox extends LabeledBox {
    static assertIsValidPredictedBox(box: any, callee: string): void;
    private _score;
    private _classScore;
    constructor(box: IBoundingBox | IRect | any, label: number, score: number, classScore: number);
    get score(): number;
    get classScore(): number;
}

declare class PredictFaceExpressionsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    protected extractedFaces?: any[] | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: any[] | undefined);
}

declare type PredictionLayerParams = {
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

declare class PredictSingleAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>> | undefined, TSource | undefined> {
    run(): Promise<WithAge<WithGender<TSource>> | undefined>;
    withFaceExpressions(): PredictSingleFaceExpressionsTask<WithAge<WithGender<TSource>>>;
}

declare class PredictSingleAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleAgeAndGenderTask<TSource> {
    withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithAge<WithGender<TSource>>>;
}

declare class PredictSingleFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource> | undefined, TSource | undefined> {
    run(): Promise<WithFaceExpressions<TSource> | undefined>;
    withAgeAndGender(): PredictSingleAgeAndGenderTask<WithFaceExpressions<TSource>>;
}

declare class PredictSingleFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleFaceExpressionsTask<TSource> {
    withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceExpressions<TSource>>;
}

declare function range(num: number, start: number, step: number): number[];

declare enum Rank {
    R0 = "R0",
    R1 = "R1",
    R2 = "R2",
    R3 = "R3",
    R4 = "R4",
    R5 = "R5",
    R6 = "R6"
}

/**
 * Recognizes the facial expressions from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Facial expressions with corresponding probabilities or array thereof in case of batch input.
 */
export declare const recognizeFaceExpressions: (input: TNetInput) => Promise<FaceExpressions | FaceExpressions[]>;

export declare class Rect extends Box implements IRect {
    constructor(x: number, y: number, width: number, height: number, allowNegativeDimensions?: boolean);
}

declare interface RecursiveArray<T extends any> {
    [index: number]: T | RecursiveArray<T>;
}

declare type ReductionBlockParams = {
    separable_conv0: SeparableConvParams;
    separable_conv1: SeparableConvParams;
    expansion_conv: ConvParams;
};

declare const relu: typeof relu_;

/**
 * Computes rectified linear element-wise: `max(x, 0)`.
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.relu().print();  // or tf.relu(x)
 * ```
 * @param x The input tensor. If the dtype is `bool`, the output dtype will be
 *     `int32'.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function relu_<T extends Tensor>(x: T | TensorLike): T;

/**
 * Additional options for Platform.fetch
 */
declare interface RequestDetails {
    /**
     * Is this request for a binary file (as opposed to a json file)
     */
    isBinary?: boolean;
}

declare const reshape: typeof reshape_;

/**
 * Reshapes a `tf.Tensor` to a given shape.
 *
 * Given an input tensor, returns a new tensor with the same values as the
 * input tensor with shape `shape`.
 *
 * If one component of shape is the special value -1, the size of that
 * dimension is computed so that the total size remains constant. In
 * particular, a shape of [-1] flattens into 1-D. At most one component of
 * shape can be -1.
 *
 * If shape is 1-D or higher, then the operation returns a tensor with shape
 * shape filled with the values of tensor. In this case, the number of
 * elements implied by shape must be the same as the number of elements in
 * tensor.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * x.reshape([2, 2]).print();
 * ```
 *
 * @param x The input tensor to be reshaped.
 * @param shape An array of integers defining the output tensor shape.
 *
 * @doc {heading: 'Tensors', subheading: 'Transformations'}
 */
declare function reshape_<R extends Rank>(x: Tensor | TensorLike, shape: ShapeMap[R]): Tensor<R>;

declare type ResidualLayerParams = {
    conv1: ConvLayerParams;
    conv2: ConvLayerParams;
};

export declare function resizeResults<T>(results: T, dimensions: IDimensions): T;

export declare function resolveInput(arg: string | any): any;

declare function round(num: number, prec?: number): number;

/** @doclink Tensor */
declare type Scalar = Tensor<Rank.R0>;

/**
 * Creates rank-0 `tf.Tensor` (scalar) with the provided value and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.scalar` as it makes the code more readable.
 *
 * ```js
 * tf.scalar(3.14).print();
 * ```
 *
 * @param value The value of the scalar.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function scalar(value: number | boolean | string | Uint8Array, dtype?: DataType): Scalar;

declare type ScaleLayerParams = {
    weights: tf.Tensor1D;
    biases: tf.Tensor1D;
};

/** @docalias Function */
declare type ScopeFn<T extends TensorContainer> = () => T;

declare const separableConv2d: typeof separableConv2d_;

/**
 * 2-D convolution with separable filters.
 *
 * Performs a depthwise convolution that acts separately on channels followed
 * by a pointwise convolution that mixes channels. Note that this is
 * separability between dimensions [1, 2] and 3, not spatial separability
 * between dimensions 1 and 2.
 *
 * See
 * [https://www.tensorflow.org/api_docs/python/tf/nn/separable_conv2d](
 *     https://www.tensorflow.org/api_docs/python/tf/nn/separable_conv2d)
 * for more details.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param depthwiseFilter The depthwise filter tensor, rank 4, of shape
 *     `[filterHeight, filterWidth, inChannels, channelMultiplier]`. This is
 *     the filter used in the first step.
 * @param pointwiseFilter The pointwise filter tensor, rank 4, of shape
 *     `[1, 1, inChannels * channelMultiplier, outChannels]`. This is
 *     the filter used in the second step.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`. If strides is a single number, then `strideHeight ==
 * strideWidth`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_docs/python/tf/nn/convolution](
 *          https://www.tensorflow.org/api_docs/python/tf/nn/convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `rate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 *
 * @doc {heading: 'Operations', subheading: 'Convolution'}
 */
declare function separableConv2d_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, depthwiseFilter: Tensor4D | TensorLike, pointwiseFilter: Tensor4D | TensorLike, strides: [number, number] | number, pad: 'valid' | 'same', dilation?: [number, number] | number, dataFormat?: 'NHWC' | 'NCHW'): T;

declare class SeparableConvParams {
    depthwise_filter: tf.Tensor4D;
    pointwise_filter: tf.Tensor4D;
    bias: tf.Tensor1D;
    constructor(depthwise_filter: tf.Tensor4D, pointwise_filter: tf.Tensor4D, bias: tf.Tensor1D);
}

declare function setEnv(env: Environment): void;

/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/// <amd-module name="@tensorflow/tfjs-core/dist/types" />
/** @docalias number[] */
declare interface ShapeMap {
    R0: number[];
    R1: [number];
    R2: [number, number];
    R3: [number, number, number];
    R4: [number, number, number, number];
    R5: [number, number, number, number, number];
    R6: [number, number, number, number, number, number];
}

export declare function shuffleArray(inputArray: any[]): any[];

export declare function sigmoid(x: number): number;

/**
 * Computes sigmoid element-wise, `1 / (1 + exp(-x))`
 *
 * ```js
 * const x = tf.tensor1d([0, -1, 2, -3]);
 *
 * x.sigmoid().print();  // or tf.sigmoid(x)
 * ```
 * @param x The input tensor.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function sigmoid_<T extends Tensor>(x: T | TensorLike): T;

declare const sigmoid_2: typeof sigmoid_;

declare interface SingleValueMap {
    bool: boolean;
    int32: number;
    float32: number;
    complex64: number;
    string: string;
}

declare const slice: typeof slice_;

declare const slice3d: typeof slice3d_;

/**
 * Extracts a 3D slice from a 3D array starting at coordinates `begin` and
 * is of size `size`. See `slice` for details.
 */
declare function slice3d_(x: Tensor3D | TensorLike, begin: [number, number, number], size: [number, number, number]): Tensor3D;

/**
 * Extracts a slice from a `tf.Tensor` starting at coordinates `begin`
 * and is of size `size`.
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that `x` is of the given rank:
 *   - `tf.slice1d`
 *   - `tf.slice2d`
 *   - `tf.slice3d`
 *   - `tf.slice4d`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 *
 * x.slice([1], [2]).print();
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * x.slice([1, 0], [1, 2]).print();
 * ```
 * @param x The input `tf.Tensor` to slice from.
 * @param begin The coordinates to start the slice from. The length can be
 *     less than the rank of x - the rest of the axes will have implicit 0 as
 *     start. Can also be a single number, in which case it specifies the
 *     first axis.
 * @param size The size of the slice. The length can be less than the rank of
 *     x - the rest of the axes will have implicit -1. A value of -1 requests
 *     the rest of the dimensions in the axis. Can also be a single number,
 *     in which case it specifies the size of the first axis.
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function slice_<R extends Rank, T extends Tensor<R>>(x: T | TensorLike, begin: number | number[], size?: number | number[]): T;

declare const softmax: typeof softmax_;

/**
 * Computes the softmax normalized vector given the logits.
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 *
 * a.softmax().print();  // or tf.softmax(a)
 * ```
 *
 * ```js
 * const a = tf.tensor2d([2, 4, 6, 1, 2, 3], [2, 3]);
 *
 * a.softmax().print();  // or tf.softmax(a)
 * ```
 *
 * @param logits The logits array.
 * @param dim The dimension softmax would be performed on. Defaults to `-1`
 *     which indicates the last dimension.
 *
 * @doc {heading: 'Operations', subheading: 'Normalization'}
 */
declare function softmax_<T extends Tensor>(logits: T | TensorLike, dim?: number): T;

export declare class SsdMobilenetv1 extends NeuralNetwork<NetParams_4> {
    constructor();
    forwardInput(input: NetInput): any;
    forward(input: TNetInput): Promise<any>;
    locateFaces(input: TNetInput, options?: ISsdMobilenetv1Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: NetParams_4;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: NetParams_4;
        paramMappings: ParamMapping[];
    };
}

/**
 * Attempts to detect all faces in an image using SSD Mobilenetv1 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see SsdMobilenetv1Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export declare const ssdMobilenetv1: (input: TNetInput, options: SsdMobilenetv1Options) => Promise<FaceDetection[]>;

export declare class SsdMobilenetv1Options {
    protected _name: string;
    private _minConfidence;
    private _maxResults;
    constructor({ minConfidence, maxResults }?: ISsdMobilenetv1Options);
    get minConfidence(): number;
    get maxResults(): number;
}

declare const stack: typeof stack_;

/**
 * Stacks a list of rank-`R` `tf.Tensor`s into one rank-`(R+1)` `tf.Tensor`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 * tf.stack([a, b, c]).print();
 * ```
 *
 * @param tensors A list of tensor objects with the same shape and dtype.
 * @param axis The axis to stack along. Defaults to 0 (the first dim).
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function stack_<T extends Tensor>(tensors: Array<T | TensorLike>, axis?: number): Tensor;

declare const sub: typeof sub_;

/**
 * Subtracts two `tf.Tensor`s element-wise, A - B. Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([10, 20, 30, 40]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.sub(b).print();  // or tf.sub(a, b)
 * ```
 *
 * ```js
 * // Broadcast subtract a with b.
 * const a = tf.tensor1d([10, 20, 30, 40]);
 * const b = tf.scalar(5);
 *
 * a.sub(b).print();  // or tf.sub(a, b)
 * ```
 * @param a The first `tf.Tensor` to subtract from.
 * @param b The second `tf.Tensor` to be subtracted. Must have the same dtype as
 * `a`.
 *
 * @doc {heading: 'Operations', subheading: 'Arithmetic'}
 */
declare function sub_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;

declare type TDrawDetectionsInput = IRect | IBoundingBox | FaceDetection | WithFaceDetection<{}>;

declare namespace Tensor { }

/**
 * A `tf.Tensor` object represents an immutable, multidimensional array of
 * numbers that has a shape and a data type.
 *
 * For performance reasons, functions that create tensors do not necessarily
 * perform a copy of the data passed to them (e.g. if the data is passed as a
 * `Float32Array`), and changes to the data will change the tensor. This is not
 * a feature and is not supported. To avoid this behavior, use the tensor before
 * changing the input data or create a copy with `copy = tf.add(yourTensor, 0)`.
 *
 * See `tf.tensor` for details on how to create a `tf.Tensor`.
 *
 * @doc {heading: 'Tensors', subheading: 'Classes'}
 */
declare class Tensor<R extends Rank = Rank> {
    /** Unique id of this tensor. */
    readonly id: number;
    /**
     * Id of the bucket holding the data for this tensor. Multiple arrays can
     * point to the same bucket (e.g. when calling array.reshape()).
     */
    dataId: DataId;
    /** The shape of the tensor. */
    readonly shape: ShapeMap[R];
    /** Number of elements in the tensor. */
    readonly size: number;
    /** The data type for the array. */
    readonly dtype: DataType;
    /** The rank type for the array (see `Rank` enum). */
    readonly rankType: R;
    /** Whether this tensor has been globally kept. */
    kept: boolean;
    /** The id of the scope this tensor is being tracked in. */
    scopeId: number;
    /**
     * Number of elements to skip in each dimension when indexing. See
     * https://docs.scipy.org/doc/numpy/reference/generated/\
     * numpy.ndarray.strides.html
     */
    readonly strides: number[];
    constructor(shape: ShapeMap[R], dtype: DataType, dataId: DataId, id: number);
    readonly rank: number;
    /**
     * Returns a promise of `tf.TensorBuffer` that holds the underlying data.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    buffer<D extends DataType = 'float32'>(): Promise<TensorBuffer<R, D>>;
    /**
     * Returns a `tf.TensorBuffer` that holds the underlying data.
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    bufferSync<D extends DataType = 'float32'>(): TensorBuffer<R, D>;
    /**
     * Returns the tensor data as a nested array. The transfer of data is done
     * asynchronously.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    array(): Promise<ArrayMap[R]>;
    /**
     * Returns the tensor data as a nested array. The transfer of data is done
     * synchronously.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    arraySync(): ArrayMap[R];
    /**
     * Asynchronously downloads the values from the `tf.Tensor`. Returns a
     * promise of `TypedArray` that resolves when the computation has finished.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    data<D extends DataType = NumericDataType>(): Promise<DataTypeMap[D]>;
    /**
     * Copy the tensor's data to a new GPU resource. Comparing to the `dataSync()`
     * and `data()`, this method prevents data from being downloaded to CPU.
     *
     * For WebGL backend, the data will be stored on a densely packed texture.
     * This means that the texture will use the RGBA channels to store value.
     *
     * @param options:
     *     For WebGL,
     *         - customTexShape: Optional. If set, will use the user defined
     *     texture shape to create the texture.
     *
     * @returns For WebGL backend, a GPUData contains the new texture and
     *     its information.
     *     {
     *        tensorRef: The tensor that is associated with this texture,
     *        texture: WebGLTexture,
     *        texShape: [number, number] // [height, width]
     *     }
     *     Remember to dispose the GPUData after it is used by
     *     `res.tensorRef.dispose()`.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    dataToGPU(options?: DataToGPUOptions): GPUData;
    /**
     * Synchronously downloads the values from the `tf.Tensor`. This blocks the
     * UI thread until the values are ready, which can cause performance issues.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    dataSync<D extends DataType = NumericDataType>(): DataTypeMap[D];
    /** Returns the underlying bytes of the tensor's data. */
    bytes(): Promise<Uint8Array[] | Uint8Array>;
    /**
     * Disposes `tf.Tensor` from memory.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    dispose(): void;
    protected isDisposedInternal: boolean;
    readonly isDisposed: boolean;
    throwIfDisposed(): void;
    /**
     * Prints the `tf.Tensor`. See `tf.print` for details.
     *
     * @param verbose Whether to print verbose information about the tensor,
     *    including dtype and size.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    print(verbose?: boolean): void;
    /**
     * Returns a copy of the tensor. See `tf.clone` for details.
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    clone<T extends Tensor>(this: T): T;
    /**
     * Returns a human-readable description of the tensor. Useful for logging.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    toString(verbose?: boolean): string;
    variable(trainable?: boolean, name?: string, dtype?: DataType): Variable<R>;
}

/**
 * Creates a `tf.Tensor` with the provided values, shape and dtype.
 *
 * ```js
 * // Pass an array of values to create a vector.
 * tf.tensor([1, 2, 3, 4]).print();
 * ```
 *
 * ```js
 * // Pass a nested array of values to make a matrix or a higher
 * // dimensional tensor.
 * tf.tensor([[1, 2], [3, 4]]).print();
 * ```
 *
 * ```js
 * // Pass a flat array and specify a shape yourself.
 * tf.tensor([1, 2, 3, 4], [2, 2]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`. If the values are strings,
 *     they will be encoded as utf-8 and kept as `Uint8Array[]`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor<R extends Rank>(values: TensorLike, shape?: ShapeMap[R], dtype?: DataType): Tensor<R>;

/** @doclink Tensor */
declare type Tensor1D = Tensor<Rank.R1>;

/**
 * Creates rank-1 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor1d` as it makes the code more readable.
 *
 * ```js
 * tf.tensor1d([1, 2, 3]).print();
 * ```
 *
 * @param values The values of the tensor. Can be array of numbers,
 *     or a `TypedArray`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor1d(values: TensorLike1D, dtype?: DataType): Tensor1D;

/** @doclink Tensor */
declare type Tensor2D = Tensor<Rank.R2>;

/**
 * Creates rank-2 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor2d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor2d([[1, 2], [3, 4]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor2d([1, 2, 3, 4], [2, 2]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. If not provided, it is inferred from
 *     `values`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor2d(values: TensorLike2D, shape?: [number, number], dtype?: DataType): Tensor2D;

/** @doclink Tensor */
declare type Tensor3D = Tensor<Rank.R3>;

/**
 * Creates rank-3 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor3d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor3d([1, 2, 3, 4], [2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. If not provided,  it is inferred from
 *     `values`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor3d(values: TensorLike3D, shape?: [number, number, number], dtype?: DataType): Tensor3D;

/** @doclink Tensor */
declare type Tensor4D = Tensor<Rank.R4>;

/**
 * Creates rank-4 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor4d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor4d(values: TensorLike4D, shape?: [number, number, number, number], dtype?: DataType): Tensor4D;

/** @doclink Tensor */
declare type Tensor5D = Tensor<Rank.R5>;

/**
 * A mutable object, similar to `tf.Tensor`, that allows users to set values
 * at locations before converting to an immutable `tf.Tensor`.
 *
 * See `tf.buffer` for creating a tensor buffer.
 *
 * @doc {heading: 'Tensors', subheading: 'Classes'}
 */
declare class TensorBuffer<R extends Rank, D extends DataType = 'float32'> {
    dtype: D;
    size: number;
    shape: ShapeMap[R];
    strides: number[];
    values: DataTypeMap[D];
    constructor(shape: ShapeMap[R], dtype: D, values?: DataTypeMap[D]);
    /**
     * Sets a value in the buffer at a given location.
     *
     * @param value The value to set.
     * @param locs  The location indices.
     *
     * @doc {heading: 'Tensors', subheading: 'Creation'}
     */
    set(value: SingleValueMap[D], ...locs: number[]): void;
    /**
     * Returns the value in the buffer at the provided location.
     *
     * @param locs The location indices.
     *
     * @doc {heading: 'Tensors', subheading: 'Creation'}
     */
    get(...locs: number[]): SingleValueMap[D];
    locToIndex(locs: number[]): number;
    indexToLoc(index: number): number[];
    readonly rank: number;
    /**
     * Creates an immutable `tf.Tensor` object from the buffer.
     *
     * @doc {heading: 'Tensors', subheading: 'Creation'}
     */
    toTensor(): Tensor<R>;
}

/**
 * @docalias void|number|string|TypedArray|Tensor|Tensor[]|{[key:
 * string]:Tensor|number|string}
 */
declare type TensorContainer = void | Tensor | string | number | boolean | TensorContainerObject | TensorContainerArray | Float32Array | Int32Array | Uint8Array;

declare interface TensorContainerArray extends Array<TensorContainer> {
}

declare interface TensorContainerObject {
    [x: string]: TensorContainer;
}

/** @docalias TypedArray|Array */
declare type TensorLike = TypedArray | number | boolean | string | RecursiveArray<number | number[] | TypedArray> | RecursiveArray<boolean> | RecursiveArray<string> | Uint8Array[];

/** @docalias TypedArray|Array */
declare type TensorLike1D = TypedArray | number[] | boolean[] | string[] | Uint8Array[];

/** @docalias TypedArray|Array */
declare type TensorLike2D = TypedArray | number[] | number[][] | boolean[] | boolean[][] | string[] | string[][] | Uint8Array[] | Uint8Array[][];

/** @docalias TypedArray|Array */
declare type TensorLike3D = TypedArray | number[] | number[][][] | boolean[] | boolean[][][] | string[] | string[][][] | Uint8Array[] | Uint8Array[][][];

/** @docalias TypedArray|Array */
declare type TensorLike4D = TypedArray | number[] | number[][][][] | boolean[] | boolean[][][][] | string[] | string[][][][] | Uint8Array[] | Uint8Array[][][][];

declare namespace tf {
    export {
        version_2 as version,
        tensor,
        tidy,
        softmax,
        unstack,
        relu,
        add,
        conv2d,
        cast,
        zeros,
        concat,
        avgPool,
        stack,
        fill,
        transpose,
        tensor1d,
        tensor2d,
        tensor3d,
        tensor4d,
        maxPool,
        matMul,
        mul,
        sub,
        scalar,
        div,
        pad,
        slice,
        reshape,
        slice3d,
        expandDims,
        depthwiseConv2d,
        separableConv2d,
        sigmoid_2 as sigmoid,
        exp,
        tile,
        batchNorm,
        clipByValue,
        ENV,
        Variable,
        Tensor,
        TensorLike,
        Rank,
        Tensor1D,
        Tensor2D,
        Tensor3D,
        Tensor4D,
        Tensor5D,
        NamedTensorMap
    }
}
export { tf }

/**
 * Executes the provided function `fn` and after it is executed, cleans up all
 * intermediate tensors allocated by `fn` except those returned by `fn`.
 * `fn` must not return a Promise (async functions not allowed). The returned
 * result can be a complex object.
 *
 * Using this method helps avoid memory leaks. In general, wrap calls to
 * operations in `tf.tidy` for automatic memory cleanup.
 *
 * NOTE: Variables do *not* get cleaned up when inside a tidy(). If you want to
 * dispose variables, please use `tf.disposeVariables` or call dispose()
 * directly on variables.
 *
 * ```js
 * // y = 2 ^ 2 + 1
 * const y = tf.tidy(() => {
 *   // a, b, and one will be cleaned up when the tidy ends.
 *   const one = tf.scalar(1);
 *   const a = tf.scalar(2);
 *   const b = a.square();
 *
 *   console.log('numTensors (in tidy): ' + tf.memory().numTensors);
 *
 *   // The value returned inside the tidy function will return
 *   // through the tidy, in this case to the variable y.
 *   return b.add(one);
 * });
 *
 * console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
 * y.print();
 * ```
 *
 * @param nameOrFn The name of the closure, or the function to execute.
 *     If a name is provided, the 2nd argument should be the function.
 *     If debug mode is on, the timing and the memory usage of the function
 *     will be tracked and displayed on the console using the provided name.
 * @param fn The function to execute.
 *
 * @doc {heading: 'Performance', subheading: 'Memory'}
 */
declare function tidy<T extends TensorContainer>(nameOrFn: string | ScopeFn<T>, fn?: ScopeFn<T>): T;

declare const tile: typeof tile_;

/**
 * Construct a tensor by repeating it the number of times given by reps.
 *
 * This operation creates a new tensor by replicating `input` `reps`
 * times. The output tensor's i'th dimension has `input.shape[i] *
 * reps[i]` elements, and the values of `input` are replicated
 * `reps[i]` times along the i'th dimension. For example, tiling
 * `[a, b, c, d]` by `[2]` produces `[a, b, c, d, a, b, c, d]`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 *
 * a.tile([2]).print();    // or a.tile([2])
 * ```
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.tile([1, 2]).print();  // or a.tile([1, 2])
 * ```
 * @param x The tensor to tile.
 * @param reps Determines the number of replications per dimension.
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function tile_<T extends Tensor>(x: T | TensorLike, reps: number[]): T;

export declare class TinyFaceDetector extends TinyYolov2Base {
    constructor();
    get anchors(): Point[];
    locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}

/**
 * Attempts to detect all faces in an image using the Tiny Face Detector.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyFaceDetectorOptions constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export declare const tinyFaceDetector: (input: TNetInput, options: TinyFaceDetectorOptions) => Promise<FaceDetection[]>;

export declare class TinyFaceDetectorOptions extends TinyYolov2Options {
    protected _name: string;
}

declare class TinyFaceFeatureExtractor extends NeuralNetwork<TinyFaceFeatureExtractorParams> implements IFaceFeatureExtractor<TinyFaceFeatureExtractorParams> {
    constructor();
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyFaceFeatureExtractorParams;
        paramMappings: ParamMapping[];
    };
}

declare type TinyFaceFeatureExtractorParams = {
    dense0: DenseBlock3Params;
    dense1: DenseBlock3Params;
    dense2: DenseBlock3Params;
};

declare class TinyXception extends NeuralNetwork<TinyXceptionParams> {
    private _numMainBlocks;
    constructor(numMainBlocks: number);
    forwardInput(input: NetInput): tf.Tensor4D;
    forward(input: TNetInput): Promise<tf.Tensor4D>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyXceptionParams;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyXceptionParams;
        paramMappings: ParamMapping[];
    };
}

declare type TinyXceptionParams = {
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

export declare class TinyYolov2 extends TinyYolov2Base {
    constructor(withSeparableConvs?: boolean);
    get withSeparableConvs(): boolean;
    get anchors(): Point[];
    locateFaces(input: TNetInput, forwardParams: ITinyYolov2Options): Promise<FaceDetection[]>;
    protected getDefaultModelName(): string;
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
}

/**
 * Attempts to detect all faces in an image using the Tiny Yolov2 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyYolov2Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
export declare const tinyYolov2: (input: TNetInput, options: ITinyYolov2Options) => Promise<FaceDetection[]>;

declare class TinyYolov2Base extends NeuralNetwork<TinyYolov2NetParams> {
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
    protected extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
    protected extractParams(weights: Float32Array): {
        params: TinyYolov2NetParams;
        paramMappings: ParamMapping[];
    };
    protected extractBoxes(outputTensor: tf.Tensor4D, inputBlobDimensions: Dimensions, scoreThreshold?: number): Promise<any>;
    private extractPredictedClass;
}

export declare type TinyYolov2Config = {
    withSeparableConvs: boolean;
    iouThreshold: number;
    anchors: Point[];
    classes: string[];
    meanRgb?: [number, number, number];
    withClassScores?: boolean;
    filterSizes?: number[];
    isFirstLayerConv2d?: boolean;
};

export declare type TinyYolov2NetParams = DefaultTinyYolov2NetParams | MobilenetParams;

export declare class TinyYolov2Options {
    protected _name: string;
    private _inputSize;
    private _scoreThreshold;
    constructor({ inputSize, scoreThreshold }?: ITinyYolov2Options);
    get inputSize(): number;
    get scoreThreshold(): number;
}

export declare type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;

export declare type TNetInput = TNetInputArg | Array<TNetInputArg> | NetInput | tf.Tensor4D;

export declare type TNetInputArg = string | TResolvedNetInput;

/**
 * Validates the input to make sure, they are valid net inputs and awaits all media elements
 * to be finished loading.
 *
 * @param input The input, which can be a media element or an array of different media elements.
 * @returns A NetInput instance, which can be passed into one of the neural networks.
 */
export declare function toNetInput(inputs: TNetInput): Promise<NetInput>;

declare const transpose: typeof transpose_;

/**
 * Transposes the `tf.Tensor`. Permutes the dimensions according to `perm`.
 *
 * The returned `tf.Tensor`'s dimension `i` will correspond to the input
 * dimension `perm[i]`. If `perm` is not given, it is set to `[n-1...0]`,
 * where `n` is the rank of the input `tf.Tensor`. Hence by default, this
 * operation performs a regular matrix transpose on 2-D input `tf.Tensor`s.
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
 *
 * a.transpose().print();  // or tf.transpose(a)
 * ```
 *
 * @param x The tensor to transpose.
 * @param perm The permutation of the dimensions of a.
 *
 * @doc {heading: 'Operations', subheading: 'Matrices'}
 */
declare function transpose_<T extends Tensor>(x: T | TensorLike, perm?: number[]): T;

export declare type TResolvedNetInput = TMediaElement | tf.Tensor3D | tf.Tensor4D;

declare function tupleValuesAreOne(param: number | number[]): boolean;

declare type TypedArray = Float32Array | Int32Array | Uint8Array;

declare const unstack: typeof unstack_;

/**
 * Unstacks a `tf.Tensor` of rank-`R` into a list of rank-`(R-1)` `tf.Tensor`s.
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * tf.unstack(a).forEach(tensor => tensor.print());
 * ```
 *
 * @param x A tensor object.
 * @param axis The axis to unstack along. Defaults to 0 (the first dim).
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function unstack_(x: Tensor | TensorLike, axis?: number): Tensor[];

declare namespace utils {
    export {
        isTensor,
        isTensor1D,
        isTensor2D,
        isTensor3D,
        isTensor4D,
        isFloat,
        isEven,
        round,
        isDimensions,
        computeReshapedDimensions,
        getCenterPoint,
        range,
        isValidNumber,
        isValidProbablitiy
    }
}
export { utils }

export declare function validateConfig(config: any): void;

/**
 * A mutable `tf.Tensor`, useful for persisting state, e.g. for training.
 *
 * @doc {heading: 'Tensors', subheading: 'Classes'}
 */
declare class Variable<R extends Rank = Rank> extends Tensor<R> {
    trainable: boolean;
    name: string;
    constructor(initialValue: Tensor<R>, trainable: boolean, name: string, tensorId: number);
    /**
     * Assign a new `tf.Tensor` to this variable. The new `tf.Tensor` must have
     * the same shape and dtype as the old `tf.Tensor`.
     *
     * @param newValue New tensor to be assigned to this variable.
     *
     * @doc {heading: 'Tensors', subheading: 'Classes'}
     */
    assign(newValue: Tensor<R>): void;
    dispose(): void;
}

export declare const version: string;

declare const version_2: {
    'tfjs-core': string;
    'tfjs-backend-cpu': string;
    'tfjs-backend-webgl': string;
    'tfjs-data': string;
    'tfjs-layers': string;
    'tfjs-converter': string;
    tfjs: string;
};

export declare type WithAge<TSource> = TSource & {
    age: number;
};

export declare type WithFaceDescriptor<TSource> = TSource & {
    descriptor: Float32Array;
};

export declare type WithFaceDetection<TSource> = TSource & {
    detection: FaceDetection;
};

export declare type WithFaceExpressions<TSource> = TSource & {
    expressions: FaceExpressions;
};

export declare type WithFaceLandmarks<TSource extends WithFaceDetection<{}>, TFaceLandmarks extends FaceLandmarks = FaceLandmarks68> = TSource & {
    landmarks: TFaceLandmarks;
    unshiftedLandmarks: TFaceLandmarks;
    alignedRect: FaceDetection;
    angle: {
        roll: number | undefined;
        pitch: number | undefined;
        yaw: number | undefined;
    };
};

export declare type WithGender<TSource> = TSource & {
    gender: Gender;
    genderProbability: number;
};

/**
 * Creates a `tf.Tensor` with all elements set to 0.
 *
 * ```js
 * tf.zeros([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param dtype The type of an element in the resulting tensor. Can
 *     be 'float32', 'int32' or 'bool'. Defaults to 'float'.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function zeros<R extends Rank>(shape: ShapeMap[R], dtype?: DataType): Tensor<R>;

export { }
