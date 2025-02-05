/// <reference path="../src/types/webgpu.d.ts" />

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
 *
 * @doc {heading: 'Operations', subheading: 'Convolution'}
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
 *     the values would be a `tf.Tensor1D` of shape [depth].
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

declare namespace browser {
    export {
        fromPixelsAsync,
        toPixels,
        draw_2 as draw,
        fromPixels
    }
}

/**
 * Creates an IOHandler that loads model artifacts from user-selected files.
 *
 * This method can be used for loading from files such as user-selected files
 * in the browser.
 * When used in conjunction with `tf.loadLayersModel`, an instance of
 * `tf.LayersModel` (Keras-style) can be constructed from the loaded artifacts.
 *
 * ```js
 * // Note: This code snippet won't run properly without the actual file input
 * //   elements in the HTML DOM.
 *
 * // Suppose there are two HTML file input (`<input type="file" ...>`)
 * // elements.
 * const uploadJSONInput = document.getElementById('upload-json');
 * const uploadWeightsInput = document.getElementById('upload-weights');
 * const model = await tf.loadLayersModel(tf.io.browserFiles(
 *     [uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
 * ```
 *
 * @param files `File`s to load from. Currently, this function supports only
 *   loading from files that contain Keras-style models (i.e., `tf.Model`s), for
 *   which an `Array` of `File`s is expected (in that order):
 *   - A JSON file containing the model topology and weight manifest.
 *   - Optionally, one or more binary files containing the binary weights.
 *     These files must have names that match the paths in the `weightsManifest`
 *     contained by the aforementioned JSON file, or errors will be thrown
 *     during loading. These weights files have the same format as the ones
 *     generated by `tensorflowjs_converter` that comes with the `tensorflowjs`
 *     Python PIP package. If no weights files are provided, only the model
 *     topology will be loaded from the JSON file above.
 * @returns An instance of `Files` `IOHandler`.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function browserFiles(files: File[]): IOHandler;

/**
 * Deprecated. Use `tf.io.http`.
 * @param path
 * @param loadOptions
 */
declare function browserHTTPRequest(path: string, loadOptions?: LoadOptions): IOHandler;

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
 * @param clipValueMin Lower bound of range to be clipped to.
 * @param clipValueMax Upper bound of range to be clipped to.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function clipByValue_<T extends Tensor>(x: T | TensorLike, clipValueMin: number, clipValueMax: number): T;

export declare class ComposableTask<T> {
    then(onfulfilled: (value: T) => T | PromiseLike<T>): Promise<T>;
    run(): Promise<T>;
}

/**
 * Wraps a list of ArrayBuffers into a `slice()`-able object without allocating
 * a large ArrayBuffer.
 *
 * Allocating large ArrayBuffers (~2GB) can be unstable on Chrome. TFJS loads
 * its weights as a list of (usually) 4MB ArrayBuffers and then slices the
 * weight tensors out of them. For small models, it's safe to concatenate all
 * the weight buffers into a single ArrayBuffer and then slice the weight
 * tensors out of it, but for large models, a different approach is needed.
 */
declare class CompositeArrayBuffer {
    private shards;
    private previousShardIndex;
    private bufferUniformSize?;
    readonly byteLength: number;
    /**
     * Concatenate a number of ArrayBuffers into one.
     *
     * @param buffers An array of ArrayBuffers to concatenate, or a single
     *     ArrayBuffer.
     * @returns Result of concatenating `buffers` in order.
     */
    static join(buffers?: ArrayBuffer[] | ArrayBuffer): ArrayBuffer;
    constructor(buffers?: ArrayBuffer | ArrayBuffer[] | TypedArray | TypedArray[]);
    slice(start?: number, end?: number): ArrayBuffer;
    /**
     * Get the index of the shard that contains the byte at `byteIndex`.
     */
    private findShardForByte;
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
 * @param axis The axis to concatenate along. Defaults to 0 (the first dim).
 *
 * @doc {heading: 'Tensors', subheading: 'Slicing and Joining'}
 */
declare function concat_<T extends Tensor>(tensors: Array<T | TensorLike>, axis?: number): T;

/**
 * Concatenate a number of ArrayBuffers into one.
 *
 * @param buffers An array of ArrayBuffers to concatenate, or a single
 *     ArrayBuffer.
 * @returns Result of concatenating `buffers` in order.
 *
 * @deprecated Use tf.io.CompositeArrayBuffer.join() instead.
 */
declare function concatenateArrayBuffers(buffers: ArrayBuffer[] | ArrayBuffer): ArrayBuffer;

declare interface ContextOptions {
    /**
     * Optional.  If the canvas has created a context, it would not make effects.
     * If it is not set, it would be variable based on the current backend.
     */
    contextType?: string;
    /**
     * Optional. A WebGLContextAttributes configuration. If the canvas has created
     * a context, it would not make effects.
     */
    contextAttributes?: WebGLContextAttributes;
}

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
        stridesOrDilationsArePositive,
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

/**
 * Copy a model from one URL to another.
 *
 * This function supports:
 *
 * 1. Copying within a storage medium, e.g.,
 *    `tf.io.copyModel('localstorage://model-1', 'localstorage://model-2')`
 * 2. Copying between two storage mediums, e.g.,
 *    `tf.io.copyModel('localstorage://model-1', 'indexeddb://model-1')`
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Copy the model, from Local Storage to IndexedDB.
 * await tf.io.copyModel(
 *     'localstorage://demo/management/model1',
 *     'indexeddb://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Remove both models.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 * await tf.io.removeModel('indexeddb://demo/management/model1');
 * ```
 *
 * @param sourceURL Source URL of copying.
 * @param destURL Destination URL of copying.
 * @returns ModelArtifactsInfo of the copied model (if and only if copying
 *   is successful).
 * @throws Error if copying fails, e.g., if no model exists at `sourceURL`, or
 *   if `oldPath` and `newPath` are identical.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function copyModel(sourceURL: string, destURL: string): Promise<ModelArtifactsInfo>;

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

/**
 * Decode flat ArrayBuffer as weights.
 *
 * This function does not handle sharding.
 *
 * This function is the reverse of `encodeWeights`.
 *
 * @param weightData A flat ArrayBuffer or an array of ArrayBuffers carrying the
 *   binary values of the tensors concatenated in the order specified in
 *   `specs`.
 * @param specs Specifications of the names, dtypes and shapes of the tensors
 *   whose value are encoded by `buffer`.
 * @return A map from tensor name to tensor value, with the names corresponding
 *   to names in `specs`.
 * @throws Error, if any of the tensors has unsupported dtype.
 */
declare function decodeWeights(weightData: WeightData, specs: WeightsManifestEntry[]): NamedTensorMap;

declare function decodeWeightsStream(weightStream: ReadableStream<ArrayBuffer>, specs: WeightsManifestEntry[]): Promise<NamedTensorMap>;

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
    withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource>>;
    withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceLandmarks<TSource>>;
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
    withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithFaceLandmarks<TSource>>;
    withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceLandmarks<TSource>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceLandmarks<TSource>>;
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

/**
 * Draws a `tf.Tensor` to a canvas.
 *
 * When the dtype of the input is 'float32', we assume values in the range
 * [0-1]. Otherwise, when input is 'int32', we assume values in the range
 * [0-255].
 *
 * @param image The tensor to draw on the canvas. Must match one of
 * these shapes:
 *   - Rank-2 with shape `[height, width`]: Drawn as grayscale.
 *   - Rank-3 with shape `[height, width, 1]`: Drawn as grayscale.
 *   - Rank-3 with shape `[height, width, 3]`: Drawn as RGB with alpha set in
 *     `imageOptions` (defaults to 1, which is opaque).
 *   - Rank-3 with shape `[height, width, 4]`: Drawn as RGBA.
 * @param canvas The canvas to draw to.
 * @param options The configuration arguments for image to be drawn and the
 *     canvas to draw to.
 *
 * @doc {heading: 'Browser', namespace: 'browser'}
 */
declare function draw_2(image: Tensor2D | Tensor3D | TensorLike, canvas: HTMLCanvasElement, options?: DrawOptions): void;

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

declare interface DrawOptions {
    /**
     * Optional. An object of options to customize the values of image tensor.
     */
    imageOptions?: ImageOptions;
    /**
     * Optional. An object to configure the context of the canvas to draw to.
     */
    contextOptions?: ContextOptions;
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

/**
 * Encode a map from names to weight values as an ArrayBuffer, along with an
 * `Array` of `WeightsManifestEntry` as specification of the encoded weights.
 *
 * This function does not perform sharding.
 *
 * This function is the reverse of `decodeWeights`.
 *
 * @param tensors A map ("dict") from names to tensors.
 * @param group Group to which the weights belong (optional).
 * @returns A `Promise` of
 *   - A flat `ArrayBuffer` with all the binary values of the `Tensor`s
 *     concatenated.
 *   - An `Array` of `WeightManifestEntry`s, carrying information including
 *     tensor names, `dtype`s and shapes.
 * @throws Error: on unsupported tensor `dtype`.
 */
declare function encodeWeights(tensors: NamedTensorMap | NamedTensor[], group?: WeightGroup): Promise<{
    data: ArrayBuffer;
    specs: WeightsManifestEntry[];
}>;

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
    getString(flagName: string): string;
    getFlags(): Flags;
    get features(): Flags;
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
 * @param x The input tensor whose dimensions are to be expanded.
 * @param axis The dimension index at which to insert shape of `1`. Defaults
 *     to 0 (the first dimension).
 *
 * @doc {heading: 'Tensors', subheading: 'Transformations'}
 */
declare function expandDims_<T extends Tensor>(x: Tensor | TensorLike, axis?: number): T;

declare type ExplicitPadding = [
[number, number],
[number, number],
[number, number],
[number, number]
];

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

export declare const FACE_EXPRESSION_LABELS: readonly ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];

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
    predictExpressions(input: TNetInput): Promise<FaceExpressions | FaceExpressions[]>;
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
        expression: "neutral" | "happy" | "sad" | "angry" | "fearful" | "disgusted" | "surprised";
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
    readFile: (filePath: string) => Promise<string | Buffer>;
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
 *     'float32' if the given param value is a number, otherwise 'string'.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function fill<R extends Rank>(shape: ShapeMap[R], value: number | string, dtype?: DataType): Tensor<R>;

declare type FlagEvaluationFn = (() => FlagValue) | (() => Promise<FlagValue>);

declare type Flags = {
    [featureName: string]: FlagValue;
};

declare type FlagValue = number | boolean | string;

/**
 * Creates an IOHandler that loads model artifacts from memory.
 *
 * When used in conjunction with `tf.loadLayersModel`, an instance of
 * `tf.LayersModel` (Keras-style) can be constructed from the loaded artifacts.
 *
 * ```js
 * const model = await tf.loadLayersModel(tf.io.fromMemory(
 *     modelTopology, weightSpecs, weightData));
 * ```
 *
 * @param modelArtifacts a object containing model topology (i.e., parsed from
 *   the JSON format).
 * @param weightSpecs An array of `WeightsManifestEntry` objects describing the
 *   names, shapes, types, and quantization of the weight data. Optional.
 * @param weightData A single `ArrayBuffer` containing the weight data,
 *   concatenated in the order described by the weightSpecs. Optional.
 * @param trainingConfig Model training configuration. Optional.
 *
 * @returns A passthrough `IOHandler` that simply loads the provided data.
 */
declare function fromMemory(modelArtifacts: {} | ModelArtifacts, weightSpecs?: WeightsManifestEntry[], weightData?: WeightData, trainingConfig?: TrainingConfig): IOHandler;

/**
 * Creates an IOHandler that loads model artifacts from memory.
 *
 * When used in conjunction with `tf.loadLayersModel`, an instance of
 * `tf.LayersModel` (Keras-style) can be constructed from the loaded artifacts.
 *
 * ```js
 * const model = await tf.loadLayersModel(tf.io.fromMemory(
 *     modelTopology, weightSpecs, weightData));
 * ```
 *
 * @param modelArtifacts a object containing model topology (i.e., parsed from
 *   the JSON format).
 * @param weightSpecs An array of `WeightsManifestEntry` objects describing the
 *   names, shapes, types, and quantization of the weight data. Optional.
 * @param weightData A single `ArrayBuffer` containing the weight data,
 *   concatenated in the order described by the weightSpecs. Optional.
 * @param trainingConfig Model training configuration. Optional.
 *
 * @returns A passthrough `IOHandlerSync` that simply loads the provided data.
 */
declare function fromMemorySync(modelArtifacts: {} | ModelArtifacts, weightSpecs?: WeightsManifestEntry[], weightData?: WeightData, trainingConfig?: TrainingConfig): IOHandlerSync;

declare const fromPixels: typeof fromPixels_;

/**
 * Creates a `tf.Tensor` from an image.
 *
 * ```js
 * const image = new ImageData(1, 1);
 * image.data[0] = 100;
 * image.data[1] = 150;
 * image.data[2] = 200;
 * image.data[3] = 255;
 *
 * tf.browser.fromPixels(image).print();
 * ```
 *
 * @param pixels The input image to construct the tensor from. The
 * supported image types are all 4-channel. You can also pass in an image
 * object with following attributes:
 * `{data: Uint8Array; width: number; height: number}`
 * @param numChannels The number of channels of the output tensor. A
 * numChannels value less than 4 allows you to ignore channels. Defaults to
 * 3 (ignores alpha channel of input image).
 *
 * @returns A Tensor3D with the shape `[height, width, numChannels]`.
 *
 * Note: fromPixels can be lossy in some cases, same image may result in
 * slightly different tensor values, if rendered by different rendering
 * engines. This means that results from different browsers, or even same
 * browser with CPU and GPU rendering engines can be different. See discussion
 * in details:
 * https://github.com/tensorflow/tfjs/issues/5482
 *
 * @doc {heading: 'Browser', namespace: 'browser', ignoreCI: true}
 */
declare function fromPixels_(pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, numChannels?: number): Tensor3D;

/**
 * Creates a `tf.Tensor` from an image in async way.
 *
 * ```js
 * const image = new ImageData(1, 1);
 * image.data[0] = 100;
 * image.data[1] = 150;
 * image.data[2] = 200;
 * image.data[3] = 255;
 *
 * (await tf.browser.fromPixelsAsync(image)).print();
 * ```
 * This API is the async version of fromPixels. The API will first
 * check |WRAP_TO_IMAGEBITMAP| flag, and try to wrap the input to
 * imageBitmap if the flag is set to true.
 *
 * @param pixels The input image to construct the tensor from. The
 * supported image types are all 4-channel. You can also pass in an image
 * object with following attributes:
 * `{data: Uint8Array; width: number; height: number}`
 * @param numChannels The number of channels of the output tensor. A
 * numChannels value less than 4 allows you to ignore channels. Defaults to
 * 3 (ignores alpha channel of input image).
 *
 * @doc {heading: 'Browser', namespace: 'browser', ignoreCI: true}
 */
declare function fromPixelsAsync(pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, numChannels?: number): Promise<Tensor3D>;

export declare enum Gender {
    FEMALE = "female",
    MALE = "male"
}

declare function getCenterPoint(pts: Point[]): Point;

export declare function getContext2dOrThrow(canvasArg: string | HTMLCanvasElement | CanvasRenderingContext2D): CanvasRenderingContext2D;

declare function getEnv(): Environment;

declare const getLoadHandlers: (url: string | string[], loadOptions?: LoadOptions) => IOHandler[];

export declare function getMediaDimensions(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | IDimensions): Dimensions;

/**
 * Create `ModelArtifacts` from a JSON file.
 *
 * @param modelJSON Object containing the parsed JSON of `model.json`
 * @param loadWeights Function that takes the JSON file's weights manifest,
 *     reads weights from the listed path(s), and returns a Promise of the
 *     weight manifest entries along with the weights data.
 * @returns A Promise of the `ModelArtifacts`, as described by the JSON file.
 */
declare function getModelArtifactsForJSON(modelJSON: ModelJSON, loadWeights: (weightsManifest: WeightsManifestConfig) => Promise<[
WeightsManifestEntry[],
WeightData
]>): Promise<ModelArtifacts>;

/**
 * Create `ModelArtifacts` from a JSON file and weights.
 *
 * @param modelJSON Object containing the parsed JSON of `model.json`
 * @param weightSpecs The list of WeightsManifestEntry for the model. Must be
 *     passed if the modelJSON has a weightsManifest.
 * @param weightData An ArrayBuffer or array of ArrayBuffers of weight data for
 *     the model corresponding to the weights in weightSpecs. Must be passed if
 *     the modelJSON has a weightsManifest.
 * @returns A Promise of the `ModelArtifacts`, as described by the JSON file.
 */
declare function getModelArtifactsForJSONSync(modelJSON: ModelJSON, weightSpecs?: WeightsManifestEntry[], weightData?: WeightData): ModelArtifacts;

/**
 * Populate ModelArtifactsInfo fields for a model with JSON topology.
 * @param modelArtifacts
 * @returns A ModelArtifactsInfo object.
 */
declare function getModelArtifactsInfoForJSON(modelArtifacts: ModelArtifacts): ModelArtifactsInfo;

declare function getQueryParams(queryString: string): {
    [key: string]: string;
};

declare const getSaveHandlers: (url: string | string[]) => IOHandler[];

/**
 * Concatenate the weights stored in a WeightsManifestConfig into a list of
 * WeightsManifestEntry
 *
 * @param weightsManifest The WeightsManifestConfig to extract weights from.
 * @returns A list of WeightsManifestEntry of the weights in the weightsManifest
 */
declare function getWeightSpecs(weightsManifest: WeightsManifestConfig): WeightsManifestEntry[];

declare interface GPUData {
    tensorRef: Tensor;
    texture?: WebGLTexture;
    buffer?: GPUBuffer;
    texShape?: [number, number];
}

/**
 * Creates an IOHandler subtype that sends model artifacts to HTTP server.
 *
 * An HTTP request of the `multipart/form-data` mime type will be sent to the
 * `path` URL. The form data includes artifacts that represent the topology
 * and/or weights of the model. In the case of Keras-style `tf.Model`, two
 * blobs (files) exist in form-data:
 *   - A JSON file consisting of `modelTopology` and `weightsManifest`.
 *   - A binary weights file consisting of the concatenated weight values.
 * These files are in the same format as the one generated by
 * [tfjs_converter](https://js.tensorflow.org/tutorials/import-keras.html).
 *
 * The following code snippet exemplifies the client-side code that uses this
 * function:
 *
 * ```js
 * const model = tf.sequential();
 * model.add(
 *     tf.layers.dense({units: 1, inputShape: [100], activation: 'sigmoid'}));
 *
 * const saveResult = await model.save(tf.io.http(
 *     'http://model-server:5000/upload', {requestInit: {method: 'PUT'}}));
 * console.log(saveResult);
 * ```
 *
 * If the default `POST` method is to be used, without any custom parameters
 * such as headers, you can simply pass an HTTP or HTTPS URL to `model.save`:
 *
 * ```js
 * const saveResult = await model.save('http://model-server:5000/upload');
 * ```
 *
 * The following GitHub Gist
 * https://gist.github.com/dsmilkov/1b6046fd6132d7408d5257b0976f7864
 * implements a server based on [flask](https://github.com/pallets/flask) that
 * can receive the request. Upon receiving the model artifacts via the request,
 * this particular server reconstitutes instances of [Keras
 * Models](https://keras.io/models/model/) in memory.
 *
 *
 * @param path A URL path to the model.
 *   Can be an absolute HTTP path (e.g.,
 *   'http://localhost:8000/model-upload)') or a relative path (e.g.,
 *   './model-upload').
 * @param requestInit Request configurations to be used when sending
 *    HTTP request to server using `fetch`. It can contain fields such as
 *    `method`, `credentials`, `headers`, `mode`, etc. See
 *    https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 *    for more information. `requestInit` must not have a body, because the
 * body will be set by TensorFlow.js. File blobs representing the model
 * topology (filename: 'model.json') and the weights of the model (filename:
 * 'model.weights.bin') will be appended to the body. If `requestInit` has a
 * `body`, an Error will be thrown.
 * @param loadOptions Optional configuration for the loading. It includes the
 *   following fields:
 *   - weightPathPrefix Optional, this specifies the path prefix for weight
 *     files, by default this is calculated from the path param.
 *   - fetchFunc Optional, custom `fetch` function. E.g., in Node.js,
 *     the `fetch` from node-fetch can be used here.
 *   - onProgress Optional, progress callback function, fired periodically
 *     before the load is completed.
 * @returns An instance of `IOHandler`.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function http(path: string, loadOptions?: LoadOptions): IOHandler;

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

declare const image: {
    flipLeftRight: (image: TensorLike | Tensor4D) => Tensor4D;
    grayscaleToRGB: <T extends Tensor2D | Tensor3D | Tensor4D | Tensor5D | Tensor6D>(image: TensorLike | T) => T;
    resizeNearestNeighbor: <T_1 extends Tensor3D | Tensor4D>(images: TensorLike | T_1, size: [number, number], alignCorners?: boolean, halfPixelCenters?: boolean) => T_1;
    resizeBilinear: <T_2 extends Tensor3D | Tensor4D>(images: TensorLike | T_2, size: [number, number], alignCorners?: boolean, halfPixelCenters?: boolean) => T_2;
    rgbToGrayscale: <T_3 extends Tensor2D | Tensor3D | Tensor4D | Tensor5D | Tensor6D>(image: TensorLike | T_3) => T_3;
    rotateWithOffset: (image: TensorLike | Tensor4D, radians: number, fillValue?: number | [number, number, number], center?: number | [number, number]) => Tensor4D;
    cropAndResize: (image: TensorLike | Tensor4D, boxes: TensorLike | Tensor2D, boxInd: TensorLike | Tensor1D, cropSize: [number, number], method?: "bilinear" | "nearest", extrapolationValue?: number) => Tensor4D;
    nonMaxSuppression: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number) => Tensor1D;
    nonMaxSuppressionAsync: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number) => Promise<Tensor1D>;
    nonMaxSuppressionWithScore: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number, softNmsSigma?: number) => NamedTensorMap;
    nonMaxSuppressionWithScoreAsync: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number, softNmsSigma?: number) => Promise<NamedTensorMap>;
    nonMaxSuppressionPadded: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number, padToMaxOutputSize?: boolean) => NamedTensorMap;
    nonMaxSuppressionPaddedAsync: (boxes: TensorLike | Tensor2D, scores: TensorLike | Tensor1D, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number, padToMaxOutputSize?: boolean) => Promise<NamedTensorMap>;
    threshold: (image: TensorLike | Tensor3D, method?: string, inverted?: boolean, threshValue?: number) => Tensor3D;
    transform: (image: TensorLike | Tensor4D, transforms: TensorLike | Tensor2D, interpolation?: "bilinear" | "nearest", fillMode?: "reflect" | "nearest" | "constant" | "wrap", fillValue?: number, outputShape?: [number, number]) => Tensor4D;
};

declare interface ImageOptions {
    /**
     * Optional. A number in range [0-1]. If the image is a 2D tensor or a 3D
     * tensor with 1 or 3 channels, the alpha channels would set as its value;
     * otherwise, it would not make effects.
     */
    alpha?: number;
}

export declare function imageTensorToCanvas(imgTensor: tf.Tensor, canvas?: HTMLCanvasElement): Promise<HTMLCanvasElement>;

export declare function imageToSquare(input: HTMLImageElement | HTMLCanvasElement, inputSize: number, centerImage?: boolean): HTMLCanvasElement;

declare function initialize(): void | null;

export declare function inverseSigmoid(x: number): number;

declare namespace io {
    export {
        copyModel,
        listModels,
        moveModel,
        removeModel,
        browserFiles,
        browserHTTPRequest,
        CompositeArrayBuffer,
        concatenateArrayBuffers,
        decodeWeights,
        decodeWeightsStream,
        encodeWeights,
        fromMemory,
        fromMemorySync,
        getLoadHandlers,
        getModelArtifactsForJSON,
        getModelArtifactsForJSONSync,
        getModelArtifactsInfoForJSON,
        getSaveHandlers,
        getWeightSpecs,
        http,
        IOHandler,
        IOHandlerSync,
        isHTTPScheme,
        LoadHandler,
        LoadOptions,
        loadWeights,
        ModelArtifacts,
        ModelArtifactsInfo,
        ModelJSON,
        ModelStoreManager,
        OnProgressCallback,
        registerLoadRouter,
        registerSaveRouter,
        RequestDetails,
        SaveConfig,
        SaveHandler,
        SaveResult,
        TrainingConfig,
        WeightData,
        WeightGroup,
        weightsLoaderFactory,
        WeightsManifestConfig,
        WeightsManifestEntry,
        withSaveHandler,
        withSaveHandlerSync
    }
}

/**
 * Interface for a model import/export handler.
 *
 * The `save` and `load` handlers are both optional, in order to allow handlers
 * that support only saving or loading.
 */
declare interface IOHandler {
    save?: SaveHandler;
    load?: LoadHandler;
}

/**
 * Interface for a synchronous model import/export handler.
 *
 * The `save` and `load` handlers are both optional, in order to allow handlers
 * that support only saving or loading.
 */
declare type IOHandlerSync = {
    save?: SaveHandlerSync;
    load?: LoadHandlerSync;
};

declare type IORouter = (url: string | string[], loadOptions?: LoadOptions) => IOHandler;

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

declare function isHTTPScheme(url: string): boolean;

export declare function isMediaElement(input: any): input is HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;

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

/**
 * List all models stored in registered storage mediums.
 *
 * For a web browser environment, the registered mediums are Local Storage and
 * IndexedDB.
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Delete the model.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 * ```
 *
 * @returns A `Promise` of a dictionary mapping URLs of existing models to
 * their model artifacts info. URLs include medium-specific schemes, e.g.,
 *   'indexeddb://my/model/1'. Model artifacts info include type of the
 * model's topology, byte sizes of the topology, weights, etc.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function listModels(): Promise<{
    [url: string]: ModelArtifactsInfo;
}>;

export declare const loadAgeGenderModel: (url: string) => Promise<void>;

export declare const loadFaceDetectionModel: (url: string) => Promise<void>;

export declare const loadFaceExpressionModel: (url: string) => Promise<void>;

export declare const loadFaceLandmarkModel: (url: string) => Promise<void>;

export declare const loadFaceLandmarkTinyModel: (url: string) => Promise<void>;

export declare const loadFaceRecognitionModel: (url: string) => Promise<void>;

/**
 * Type definition for handlers of loading operations.
 */
declare type LoadHandler = () => Promise<ModelArtifacts>;

/**
 * Type definition for handlers of synchronous loading operations.
 */
declare type LoadHandlerSync = () => ModelArtifacts;

/** @innamespace io */
declare interface LoadOptions {
    /**
     * RequestInit (options) for HTTP requests.
     *
     * For detailed information on the supported fields, see
     * [https://developer.mozilla.org/en-US/docs/Web/API/Request/Request](
     *     https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)
     */
    requestInit?: RequestInit;
    /**
     * Progress callback.
     */
    onProgress?: OnProgressCallback;
    /**
     * A function used to override the `window.fetch` function.
     */
    fetchFunc?: typeof fetch;
    /**
     * Strict loading model: whether extraneous weights or missing
     * weights should trigger an `Error`.
     *
     * If `true`, require that the provided weights exactly match those
     * required by the layers. `false` means that both extra weights
     * and missing weights will be silently ignored.
     *
     * Default: `true`.
     */
    strict?: boolean;
    /**
     * Path prefix for weight files, by default this is calculated from the
     * path of the model JSON file.
     *
     * For instance, if the path to the model JSON file is
     * `http://localhost/foo/model.json`, then the default path prefix will be
     * `http://localhost/foo/`. If a weight file has the path value
     * `group1-shard1of2` in the weight manifest, then the weight file will be
     * loaded from `http://localhost/foo/group1-shard1of2` by default. However,
     * if you provide a `weightPathPrefix` value of
     * `http://localhost/foo/alt-weights`, then the weight file will be loaded
     * from the path `http://localhost/foo/alt-weights/group1-shard1of2` instead.
     */
    weightPathPrefix?: string;
    /**
     * Whether the module or model is to be loaded from TF Hub.
     *
     * Setting this to `true` allows passing a TF-Hub module URL, omitting the
     * standard model file name and the query parameters.
     *
     * Default: `false`.
     */
    fromTFHub?: boolean;
    /**
     * An async function to convert weight file name to URL. The weight file
     * names are stored in model.json's weightsManifest.paths field. By default we
     * consider weight files are colocated with the model.json file. For example:
     *     model.json URL: https://www.google.com/models/1/model.json
     *     group1-shard1of1.bin url:
     *        https://www.google.com/models/1/group1-shard1of1.bin
     *
     * With this func you can convert the weight file name to any URL.
     */
    weightUrlConverter?: (weightFileName: string) => Promise<string>;
    /**
     * Whether to stream the model directly to the backend or cache all its
     * weights on CPU first. Useful for large models.
     */
    streamWeights?: boolean;
}

export declare const loadSsdMobilenetv1Model: (url: string) => Promise<void>;

export declare const loadTinyFaceDetectorModel: (url: string) => Promise<void>;

export declare const loadTinyYolov2Model: (url: string) => Promise<void>;

export declare function loadWeightMap(uri: string | undefined, defaultModelName: string): Promise<tf.NamedTensorMap>;

/**
 * Reads a weights manifest JSON configuration, fetches the weights and
 * returns them as `Tensor`s.
 *
 * @param manifest The weights manifest JSON.
 * @param filePathPrefix The path prefix for filenames given in the manifest.
 *     Defaults to the empty string.
 * @param weightNames The names of the weights to be fetched.
 */
declare function loadWeights(manifest: WeightsManifestConfig, filePathPrefix?: string, weightNames?: string[], requestInit?: RequestInit): Promise<NamedTensorMap>;

export declare const locateFaces: (input: TNetInput, options: SsdMobilenetv1Options) => Promise<FaceDetection[]>;

declare type MainBlockParams = {
    separable_conv0: SeparableConvParams;
    separable_conv1: SeparableConvParams;
    separable_conv2: SeparableConvParams;
};

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

/**
 * The serialized artifacts of a model, including topology and weights.
 *
 * The `modelTopology`, `trainingConfig`, `weightSpecs` and `weightData` fields
 * of this interface are optional, in order to support topology- or weights-only
 * saving and loading.
 *
 * Note this interface is used internally in IOHandlers.  For the file format
 * written to disk as `model.json`, see `ModelJSON`.
 */
declare interface ModelArtifacts {
    /**
     * Model topology.
     *
     * For Keras-style `tf.Model`s, this is a JSON object.
     * For TensorFlow-style models (e.g., `SavedModel`), this is the JSON
     * encoding of the `GraphDef` protocol buffer.
     */
    modelTopology?: {} | ArrayBuffer;
    /**
     * Serialized configuration for the model's training.
     */
    trainingConfig?: TrainingConfig;
    /**
     * Weight specifications.
     *
     * This corresponds to the weightsData below.
     */
    weightSpecs?: WeightsManifestEntry[];
    /**
     * Binary buffer(s) for all weight values in the order specified by
     * `weightSpecs`. This may be a single ArrayBuffer of all the weights
     * concatenated together or an Array of ArrayBuffers containing the weights
     * (weights may be sharded across multiple ArrayBuffers).
     */
    weightData?: WeightData;
    /**
     * Returns a stream of the weights. Some models are too large to fit in
     * V8's memory heap, and `getWeightStream` loads their weights without storing
     * them all in memory at the same time.
     */
    getWeightStream?: () => ReadableStream<ArrayBuffer>;
    /**
     * Hard-coded format name for models saved from TensorFlow.js or converted
     * by TensorFlow.js Converter.
     */
    format?: string;
    /**
     * What library is responsible for originally generating this artifact.
     *
     * Used for debugging purposes. E.g., 'TensorFlow.js v1.0.0'.
     */
    generatedBy?: string;
    /**
     * What library or tool is responsible for converting the original model
     * to this format, applicable only if the model is output by a converter.
     *
     * Used for debugging purposes.  E.g., 'TensorFlow.js Converter v1.0.0'.
     *
     * A value of `null` means the model artifacts are generated without any
     * conversion process (e.g., saved directly from a TensorFlow.js
     * `tf.LayersModel` instance.)
     */
    convertedBy?: string | null;
    /**
     * Inputs and outputs signature for saved model.
     */
    signature?: {};
    /**
     * User-defined metadata about the model.
     */
    userDefinedMetadata?: {
        [key: string]: {};
    };
    /**
     * Initializer for the model.
     */
    modelInitializer?: {};
    /**
     * Inputs and outputs signature for model initializer.
     */
    initializerSignature?: {};
}

declare interface ModelArtifactsInfo {
    /**
     * Timestamp for when the model is saved.
     */
    dateSaved: Date;
    /**
     * TODO (cais,yassogba) consider removing GraphDef as GraphDefs now
     * come in a JSON format and none of our IOHandlers support a non json
     * format. We could conder replacing this with 'Binary' if we want to
     * allow future handlers to save to non json formats (though they will
     * probably want more information than 'Binary').
     * Type of the model topology
     *
     * Type of the model topology
     *
     * Possible values:
     *   - JSON: JSON config (human-readable, e.g., Keras JSON).
     *   - GraphDef: TensorFlow
     *     [GraphDef](https://www.tensorflow.org/extend/tool_developers/#graphdef)
     *     protocol buffer (binary).
     */
    modelTopologyType: 'JSON' | 'GraphDef';
    /**
     * Size of model topology (Keras JSON or GraphDef), in bytes.
     */
    modelTopologyBytes?: number;
    /**
     * Size of weight specification or manifest, in bytes.
     */
    weightSpecsBytes?: number;
    /**
     * Size of weight value data, in bytes.
     */
    weightDataBytes?: number;
}

/**
 * The on-disk format of the `model.json` file.
 *
 * TF.js 1.0 always populates the optional fields when writing model.json.
 * Prior versions did not provide those fields.
 */
declare interface ModelJSON {
    /**
     * Model topology.
     *
     * For Keras-style `tf.Model`s, this is a JSON object.
     * For TensorFlow-style models (e.g., `SavedModel`), this is the JSON
     * encoding of the `GraphDef` protocol buffer.
     */
    modelTopology: {};
    /** Model training configuration. */
    trainingConfig?: TrainingConfig;
    /**
     * Weights manifest.
     *
     * The weights manifest consists of an ordered list of weight-manifest
     * groups. Each weight-manifest group consists of a number of weight values
     * stored in a number of paths. See the documentation of
     * `WeightsManifestConfig` for more details.
     */
    weightsManifest: WeightsManifestConfig;
    /**
     * Hard-coded format name for models saved from TensorFlow.js or converted
     * by TensorFlow.js Converter.
     */
    format?: string;
    /**
     * What library is responsible for originally generating this artifact.
     *
     * Used for debugging purposes. E.g., 'TensorFlow.js v1.0.0'.
     */
    generatedBy?: string;
    /**
     * What library or tool is responsible for converting the original model
     * to this format, applicable only if the model is output by a converter.
     *
     * Used for debugging purposes.  E.g., 'TensorFlow.js Converter v1.0.0'.
     *
     * A value of `null` means the model artifacts are generated without any
     * conversion process (e.g., saved directly from a TensorFlow.js
     * `tf.LayersModel` instance.)
     */
    convertedBy?: string | null;
    /**
     * Inputs and outputs signature for saved model.
     */
    signature?: {};
    /**
     * User-defined metadata about the model.
     */
    userDefinedMetadata?: {
        [key: string]: {};
    };
    /**
     * Initializer for the model.
     */
    modelInitializer?: {};
    /**
     * Inputs and outputs signature for model initializer.
     */
    initializerSignature?: {};
}

/**
 * An interface for the manager of a model store.
 *
 * A model store is defined as a storage medium on which multiple models can
 * be stored. Each stored model has a unique `path` as its identifier.
 * A `ModelStoreManager` for the store allows actions including
 *
 * - Listing the models stored in the store.
 * - Deleting a model from the store.
 */
declare interface ModelStoreManager {
    /**
     * List all models in the model store.
     *
     * @returns A dictionary mapping paths of existing models to their
     *   model artifacts info. Model artifacts info include type of the model's
     *   topology, byte sizes of the topology, weights, etc.
     */
    listModels(): Promise<{
        [path: string]: ModelArtifactsInfo;
    }>;
    /**
     * Remove a model specified by `path`.
     *
     * @param path
     * @returns ModelArtifactsInfo of the deleted model (if and only if deletion
     *   is successful).
     * @throws Error if deletion fails, e.g., if no model exists at `path`.
     */
    removeModel(path: string): Promise<ModelArtifactsInfo>;
}

declare function monkeyPatch(env: Partial<Environment>): void;

/**
 * Move a model from one URL to another.
 *
 * This function supports:
 *
 * 1. Moving within a storage medium, e.g.,
 *    `tf.io.moveModel('localstorage://model-1', 'localstorage://model-2')`
 * 2. Moving between two storage mediums, e.g.,
 *    `tf.io.moveModel('localstorage://model-1', 'indexeddb://model-1')`
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Move the model, from Local Storage to IndexedDB.
 * await tf.io.moveModel(
 *     'localstorage://demo/management/model1',
 *     'indexeddb://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Remove the moved model.
 * await tf.io.removeModel('indexeddb://demo/management/model1');
 * ```
 *
 * @param sourceURL Source URL of moving.
 * @param destURL Destination URL of moving.
 * @returns ModelArtifactsInfo of the copied model (if and only if copying
 *   is successful).
 * @throws Error if moving fails, e.g., if no model exists at `sourceURL`, or
 *   if `oldPath` and `newPath` are identical.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function moveModel(sourceURL: string, destURL: string): Promise<ModelArtifactsInfo>;

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

declare interface NamedTensor {
    name: string;
    tensor: Tensor;
}

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
        tensor: tf.Tensor<tf.Rank>;
    }[];
    getTrainableParams(): {
        path: string;
        tensor: tf.Tensor<tf.Rank>;
    }[];
    getFrozenParams(): {
        path: string;
        tensor: tf.Tensor<tf.Rank>;
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

/**
 * Callback for the progress of a long-running action such as an HTTP
 * request for a large binary object.
 *
 * `fraction` should be a number in the [0, 1] interval, indicating how
 * much of the action has completed.
 */
declare type OnProgressCallback = (fraction: number) => void;

declare type OutputLayerParams = {
    extra_dim: tf.Tensor3D;
};

declare const pad: typeof pad_;

/**
 * Pads a `tf.Tensor` with a given value and paddings.
 *
 * This operation implements `CONSTANT` mode. For `REFLECT` and `SYMMETRIC`,
 * refer to `tf.mirrorPad`.
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

/** Type for representing image data in Uint8Array type. */
declare interface PixelData {
    width: number;
    height: number;
    data: Uint8Array;
}

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
    setTimeoutCustom?(functionRef: Function, delay: number): void;
    isTypedArray(a: unknown): a is Float32Array | Int32Array | Uint8Array | Uint8ClampedArray;
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
    protected extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined);
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
    protected extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined);
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

declare const registerLoadRouter: (loudRouter: IORouter) => void;

declare const registerSaveRouter: (loudRouter: IORouter) => void;

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
 *     `int32`.
 *
 * @doc {heading: 'Operations', subheading: 'Basic math'}
 */
declare function relu_<T extends Tensor>(x: T | TensorLike): T;

/**
 * Remove a model specified by URL from a registered storage medium.
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Delete the model.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 * ```
 *
 * @param url A URL to a stored model, with a scheme prefix, e.g.,
 *   'localstorage://my-model-1', 'indexeddb://my/model/2'.
 * @returns ModelArtifactsInfo of the deleted model (if and only if deletion
 *   is successful).
 * @throws Error if deletion fails, e.g., if no model exists at `path`.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
declare function removeModel(url: string): Promise<ModelArtifactsInfo>;

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

/**
 * Options for saving a model.
 * @innamespace io
 */
declare interface SaveConfig {
    /**
     * Whether to save only the trainable weights of the model, ignoring the
     * non-trainable ones.
     */
    trainableOnly?: boolean;
    /**
     * Whether the optimizer will be saved (if exists).
     *
     * Default: `false`.
     */
    includeOptimizer?: boolean;
}

/**
 * Type definition for handlers of saving operations.
 */
declare type SaveHandler = (modelArtifact: ModelArtifacts) => Promise<SaveResult>;

/**
 * Type definition for handlers of synchronous saving operations.
 */
declare type SaveHandlerSync = (modelArtifact: ModelArtifacts) => SaveResult;

/**
 * Result of a saving operation.
 */
declare interface SaveResult {
    /**
     * Information about the model artifacts saved.
     */
    modelArtifactsInfo: ModelArtifactsInfo;
    /**
     * HTTP responses from the server that handled the model-saving request (if
     * any). This is applicable only to server-based saving routes.
     */
    responses?: Response[];
    /**
     * Error messages and related data (if any).
     */
    errors?: Array<{} | string>;
}

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
/// <reference path="../src/types/webgpu.d.ts" />
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
    forwardInput(input: NetInput): {
        boxes: tf.Tensor2D[];
        scores: tf.Tensor1D[];
    };
    forward(input: TNetInput): Promise<{
        boxes: tf.Tensor2D[];
        scores: tf.Tensor1D[];
    }>;
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

declare function stridesOrDilationsArePositive(values: number | number[]): boolean;

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
declare class Tensor<R extends Rank = Rank> implements TensorInfo {
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
    /** The keras mask that some keras layers attach to the tensor */
    kerasMask?: Tensor;
    /**
     * Number of elements to skip in each dimension when indexing. See
     * https://docs.scipy.org/doc/numpy/reference/generated/\
     * numpy.ndarray.strides.html
     */
    readonly strides: number[];
    constructor(shape: ShapeMap[R], dtype: DataType, dataId: DataId, id: number);
    get rank(): number;
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
     * For WebGPU backend, the data will be stored on a buffer. There is no
     * parameter, so can not use a user-defined size to create the buffer.
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
     *
     *     For WebGPU backend, a GPUData contains the new buffer.
     *     {
     *        tensorRef: The tensor that is associated with this buffer,
     *        buffer: GPUBuffer,
     *     }
     *
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
    get isDisposed(): boolean;
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
 * ```js
 * // Pass a `WebGLData` object and specify a shape yourself.
 *
 * // This makes it possible for TF.js applications to avoid GPU / CPU sync.
 * // For example, if your application includes a preprocessing step on the GPU,
 * // you could upload the GPU output directly to TF.js, rather than first
 * // downloading the values.
 *
 * // Example for WebGL2:
 * if (tf.findBackend('custom-webgl') == null) {
 *   const customCanvas = document.createElement('canvas');
 *   const customBackend = new tf.MathBackendWebGL(customCanvas);
 *   tf.registerBackend('custom-webgl', () => customBackend);
 * }
 * const savedBackend = tf.getBackend();
 * await tf.setBackend('custom-webgl');
 * const gl = tf.backend().gpgpu.gl;
 * const texture = gl.createTexture();
 * const tex2d = gl.TEXTURE_2D;
 * const width = 2;
 * const height = 2;
 *
 * gl.bindTexture(tex2d, texture);
 * gl.texParameteri(tex2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 * gl.texParameteri(tex2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
 * gl.texParameteri(tex2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
 * gl.texParameteri(tex2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 * gl.texImage2D(
 *   tex2d, 0, gl.RGBA32F, // internalFormat
 *   width, height, 0,
 *   gl.RGBA, // textureFormat
 *   gl.FLOAT, // textureType
 *   new Float32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
 * );
 *
 * // Currently, the `texture` has 4 pixels:
 * // Pixel0 is {R:0, G:1, B:2, A:3}
 * // Pixel1 is {R:4, G:5, B:6, A:7}
 * // Pixel2 is {R:8, G:9, B:10, A:11}
 * // Pixel3 is {R:12, G:13, B:14, A:15}
 *
 * const logicalShape = [height * width * 2];
 * const a = tf.tensor({texture, height, width, channels: 'BR'}, logicalShape);
 * a.print();
 * // Tensor value will be [2, 0, 6, 4, 10, 8, 14, 12], since [2, 0] is the
 * // values of 'B' and 'R' channels of Pixel0, [6, 4] is the values of 'B' and
 * 'R'
 * // channels of Pixel1...
 *
 * // For postprocessing on the GPU, it's possible to retrieve the texture
 * // backing any tensor by calling the tensor's `dataToGPU` method like
 * // so:
 *
 * const tex = a.dataToGPU();
 * await tf.setBackend(savedBackend);
 * ```
 *
 * ```js
 * // Pass a `WebGPUData` object and specify a shape yourself.
 *
 * // This makes it possible for TF.js applications to avoid GPU / CPU sync.
 * // For example, if your application includes a preprocessing step on the GPU,
 * // you could upload the GPU output directly to TF.js, rather than first
 * // downloading the values. Unlike WebGL, this optionally supports zero copy
 * // by WebGPUData.zeroCopy. When zeroCopy is false or undefined(default), this
 * // passing GPUBuffer can be destroyed after tensor is created. When zeroCopy
 * // is true, this GPUBuffer is bound directly by the tensor, so do not destroy
 * // this GPUBuffer until all access is done.
 *
 * // Example for WebGPU:
 * function createGPUBufferFromData(device, data, dtype) {
 *   const bytesPerElement = 4;
 *   const sizeInBytes = data.length * bytesPerElement;
 *
 *   const gpuWriteBuffer = device.createBuffer({
 *     mappedAtCreation: true,
 *     size: sizeInBytes,
 *     usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
 *   });
 *   const arrayBuffer = gpuWriteBuffer.getMappedRange();
 *   if (dtype === 'float32') {
 *     new Float32Array(arrayBuffer).set(data);
 *   } else if (dtype === 'int32') {
 *     new Int32Array(arrayBuffer).set(data);
 *   } else {
 *     throw new Error(
 *         `Creating tensor from GPUBuffer only supports` +
 *         `'float32'|'int32' dtype, while the dtype is ${dtype}.`);
 *   }
 *   gpuWriteBuffer.unmap();
 *
 *   const gpuReadBuffer = device.createBuffer({
 *     mappedAtCreation: false,
 *     size: sizeInBytes,
 *     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE |
 *         GPUBufferUsage.COPY_SRC
 *   });
 *
 *   const copyEncoder = device.createCommandEncoder();
 *   copyEncoder.copyBufferToBuffer(
 *       gpuWriteBuffer, 0, gpuReadBuffer, 0, sizeInBytes);
 *   const copyCommands = copyEncoder.finish();
 *   device.queue.submit([copyCommands]);
 *   gpuWriteBuffer.destroy();
 *   return gpuReadBuffer;
 * }
 *
 * const savedBackend = tf.getBackend();
 * await tf.setBackend('webgpu').catch(
 *     () => {throw new Error(
 *         'Failed to use WebGPU backend. Please use Chrome Canary to run.')});
 * const dtype = 'float32';
 * const device = tf.backend().device;
 * const aData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
 * const bData = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
 * const expected = [2, 4, 6, 8, 6, 8, 10, 12, 10, 12, 14, 16, 14, 16, 18, 20];
 * const aBuffer = createGPUBufferFromData(device, aData, dtype);
 * const shape = [aData.length];
 * // To use zeroCopy, use {buffer: aBuffer, zeroCopy: true} instead and destroy
 * // aBuffer untill all access is done.
 * const a = tf.tensor({buffer: aBuffer}, shape, dtype);
 * const b = tf.tensor(bData, shape, dtype);
 * const result = tf.add(a, b);
 * result.print();
 * a.dispose();
 * b.dispose();
 * result.dispose();
 * aBuffer.destroy();
 * await tf.setBackend(savedBackend);
 * ```
 * @param values The values of the tensor. Can be nested array of numbers,
 * or a flat array, or a `TypedArray`(At the moment it supports Uint8Array,
 * Uint8ClampedArray, Int32Array, Float32Array) data types, or a `WebGLData`
 * object, or a `WebGPUData` object. If the values are strings, they will be
 * encoded as utf-8 and kept as `Uint8Array[]`. If the values is a `WebGLData`
 * object, the dtype could only be 'float32' or 'int32' and the object has to
 * have: 1. texture, a `WebGLTexture`, the texture must share the same
 * `WebGLRenderingContext` with TFJS's WebGL backend (you could create a custom
 * WebGL backend from your texture's canvas) and the internal texture format
 * for the input texture must be floating point or normalized integer; 2.
 * height, the height of the texture; 3. width, the width of the texture; 4.
 * channels, a non-empty subset of 'RGBA', indicating the values of which
 * channels will be passed to the tensor, such as 'R' or 'BR' (The order of the
 * channels affect the order of tensor values. ). (If the values passed from
 * texture is less than the tensor size, zeros will be padded at the rear.). If
 * the values is a `WebGPUData` object, the dtype could only be 'float32' or
 * 'int32 and the object has to have: buffer, a `GPUBuffer`. The buffer must:
 * 1. share the same `GPUDevice` with TFJS's WebGPU backend; 2. buffer.usage
 * should at least support GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC; 3.
 * buffer.size should not be smaller than the byte size of tensor shape.
 * WebGPUData optionally supports zero copy by flag zeroCopy. When zeroCopy is
 * false or undefined(default),this passing GPUBuffer can be destroyed after
 * tensor is created. When zeroCopy is true, this GPUBuffer is bound directly
 * by the tensor, so do not destroy this GPUBuffer until all access is done.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
declare function tensor<R extends Rank>(values: TensorLike | WebGLData | WebGPUData, shape?: ShapeMap[R], dtype?: DataType): Tensor<R>;

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

/** @doclink Tensor */
declare type Tensor6D = Tensor<Rank.R6>;

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
    get rank(): number;
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

/** Holds metadata for a given tensor. */
declare interface TensorInfo {
    dataId: DataId;
    shape: number[];
    dtype: DataType;
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
        io,
        browser,
        image,
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
 * times. The output tensor's `i`th dimension has `input.shape[i] *
 * reps[i]` elements, and the values of `input` are replicated
 * `reps[i]` times along the `i`th dimension. For example, tiling
 * `[a, b, c, d]` by `[2]` produces `[a, b, c, d, a, b, c, d]`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 *
 * a.tile([2]).print();    // or tf.tile(a, [2])
 * ```
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.tile([1, 2]).print();  // or tf.tile(a, [1,2])
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
    middle_flow: Record<`main_block_${number}`, MainBlockParams>;
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
    protected extractBoxes(outputTensor: tf.Tensor4D, inputBlobDimensions: Dimensions, scoreThreshold?: number): Promise<TinyYolov2ExtractBoxesResult[]>;
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

export declare type TinyYolov2ExtractBoxesResult = {
    box: BoundingBox;
    score: number;
    classScore: number;
    label: number;
    row: number;
    col: number;
    anchor: number;
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

export declare type TNetInput = string | TResolvedNetInput | Array<string | TResolvedNetInput> | NetInput;

/**
 * Validates the input to make sure, they are valid net inputs and awaits all media elements
 * to be finished loading.
 *
 * @param input The input, which can be a media element or an array of different media elements.
 * @returns A NetInput instance, which can be passed into one of the neural networks.
 */
export declare function toNetInput(inputs: TNetInput): Promise<NetInput>;

/**
 * Draws a `tf.Tensor` of pixel values to a byte array or optionally a
 * canvas.
 *
 * When the dtype of the input is 'float32', we assume values in the range
 * [0-1]. Otherwise, when input is 'int32', we assume values in the range
 * [0-255].
 *
 * Returns a promise that resolves when the canvas has been drawn to.
 *
 * @param img A rank-2 tensor with shape `[height, width]`, or a rank-3 tensor
 * of shape `[height, width, numChannels]`. If rank-2, draws grayscale. If
 * rank-3, must have depth of 1, 3 or 4. When depth of 1, draws
 * grayscale. When depth of 3, we draw with the first three components of
 * the depth dimension corresponding to r, g, b and alpha = 1. When depth of
 * 4, all four components of the depth dimension correspond to r, g, b, a.
 * @param canvas The canvas to draw to.
 *
 * @doc {heading: 'Browser', namespace: 'browser'}
 */
declare function toPixels(img: Tensor2D | Tensor3D | TensorLike, canvas?: HTMLCanvasElement): Promise<Uint8ClampedArray>;

/** Model training configuration. */
declare interface TrainingConfig {
    /** Optimizer used for the model training. */
    optimizer_config: {};
    /** Loss function(s) for the model's output(s). */
    loss: string | string[] | {
        [key: string]: string;
    };
    /** Metric function(s) for the model's output(s). */
    metrics?: string[] | {
        [key: string]: string;
    };
    weighted_metrics?: string[];
    sample_weight_mode?: string;
    loss_weights?: number[] | {
        [key: string]: number;
    };
}

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
 * @param conjugate Will conjugate complex input if true.
 *
 * @doc {heading: 'Operations', subheading: 'Matrices'}
 */
declare function transpose_<T extends Tensor>(x: T | TensorLike, perm?: number[], conjugate?: boolean): T;

export declare type TResolvedNetInput = TMediaElement | Tensor3D | Tensor4D;

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

/**
 * Type for representing all permutations and combinations of 'RGBA' channels.
 */
declare type WebGLChannels = 'A' | 'B' | 'G' | 'R' | 'AB' | 'AG' | 'AR' | 'BA' | 'BG' | 'BR' | 'GA' | 'GB' | 'GR' | 'RA' | 'RB' | 'RG' | 'ABG' | 'ABR' | 'AGB' | 'AGR' | 'ARB' | 'ARG' | 'BAG' | 'BAR' | 'BGA' | 'BGR' | 'BRA' | 'BRG' | 'GAB' | 'GAR' | 'GBA' | 'GBR' | 'GRA' | 'GRB' | 'RAB' | 'RAG' | 'RBA' | 'RBG' | 'RGA' | 'RGB' | 'ABGR' | 'ABRG' | 'AGBR' | 'AGRB' | 'ARBG' | 'ARGB' | 'BAGR' | 'BARG' | 'BGAR' | 'BGRA' | 'BRAG' | 'BRGA' | 'GABR' | 'GARB' | 'GBAR' | 'GBRA' | 'GRAB' | 'GRBA' | 'RABG' | 'RAGB' | 'RBAG' | 'RBGA' | 'RGAB' | 'RGBA';

/** Type for representing a texture data to create a tensor. */
declare interface WebGLData {
    texture: WebGLTexture;
    height: number;
    width: number;
    channels: WebGLChannels;
}

/**
 * Type for representing a buffer data to create a tensor. Buffer usage should
 * at least support GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC. When
 * zeroCopy is false or undefined (default), this GPUBuffer will be copied to
 * the tensor's resource buffer. When zeroCopy is true, tensor will use this
 * GPUBuffer as tensor's resource buffer, user should not destroy this GPUBuffer
 * until all access is done. If not specified at creating a tensor, tensor type
 * is float32.
 */
declare interface WebGPUData {
    buffer: GPUBuffer;
    zeroCopy?: boolean;
}

declare type WeightData = ArrayBuffer | ArrayBuffer[];

/**
 * Group to which the weight belongs.
 *
 * - 'optimizer': Weight from a stateful optimizer.
 */
declare type WeightGroup = 'model' | 'optimizer';

/**
 * Creates a function, which reads a weights manifest JSON configuration,
 * fetches the weight files using the specified function and returns them as
 * `Tensor`s.
 *
 * ```js
 * // example for creating a nodejs weight loader, which reads the weight files
 * // from disk using fs.readFileSync
 *
 * import * as fs from 'fs'
 *
 * const fetchWeightsFromDisk = (filePaths: string[]) =>
 *   filePaths.map(filePath => fs.readFileSync(filePath).buffer)
 *
 * const loadWeights = tf.io.weightsLoaderFactory(fetchWeightsFromDisk)
 *
 * const manifest = JSON.parse(
 *   fs.readFileSync('./my_model-weights_manifest').toString()
 * )
 * const weightMap = await loadWeights(manifest, './')
 * ```
 * @param fetchWeightsFunction The function used for fetching the weight files.
 * @returns Weight loading function.
 */
declare function weightsLoaderFactory(fetchWeightsFunction: (fetchUrls: string[]) => Promise<ArrayBuffer[]>): (manifest: WeightsManifestConfig, filePathPrefix?: string, weightNames?: string[]) => Promise<NamedTensorMap>;

/**
 * A weight manifest.
 *
 * The weight manifest consists of an ordered list of weight-manifest groups.
 * Each weight-manifest group ("group" for short hereafter) consists of a
 * number of weight values stored in a number of paths.
 * See the documentation of `WeightManifestGroupConfig` below for more details.
 */
declare type WeightsManifestConfig = WeightsManifestGroupConfig[];

/**
 * An entry in the weight manifest.
 *
 * The entry contains specification of a weight.
 */
declare interface WeightsManifestEntry {
    /**
     * Name of the weight, e.g., 'Dense_1/bias'
     */
    name: string;
    /**
     * Shape of the weight.
     */
    shape: number[];
    /**
     * Data type of the weight.
     */
    dtype: 'float32' | 'int32' | 'bool' | 'string' | 'complex64';
    /**
     * Type of the weight.
     *
     * Optional.
     *
     * The value 'optimizer' indicates the weight belongs to an optimizer
     * (i.e., used only during model training and not during inference).
     */
    group?: WeightGroup;
    /**
     * Information for dequantization of the weight.
     */
    quantization?: {
        scale?: number;
        min?: number;
        dtype: 'uint16' | 'uint8' | 'float16';
    };
}

/**
 * A weight-manifest group.
 *
 * Consists of an ordered list of weight values encoded in binary format,
 * stored in an ordered list of paths.
 */
declare interface WeightsManifestGroupConfig {
    /**
     * An ordered list of paths.
     *
     * Paths are intentionally abstract in order to be general. For example, they
     * can be relative URL paths or relative paths on the file system.
     */
    paths: string[];
    /**
     * Specifications of the weights stored in the paths.
     */
    weights: WeightsManifestEntry[];
}

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
 * Creates an IOHandler that passes saved model artifacts to a callback.
 *
 * ```js
 * function handleSave(artifacts) {
 *   // ... do something with the artifacts ...
 *   return {modelArtifactsInfo: {...}, ...};
 * }
 *
 * const saveResult = model.save(tf.io.withSaveHandler(handleSave));
 * ```
 *
 * @param saveHandler A function that accepts a `ModelArtifacts` and returns a
 *     promise that resolves to a `SaveResult`.
 */
declare function withSaveHandler(saveHandler: (artifacts: ModelArtifacts) => Promise<SaveResult>): IOHandler;

/**
 * Creates an IOHandlerSync that passes saved model artifacts to a callback.
 *
 * ```js
 * function handleSave(artifacts) {
 *   // ... do something with the artifacts ...
 *   return {modelArtifactsInfo: {...}, ...};
 * }
 *
 * const saveResult = model.save(tf.io.withSaveHandler(handleSave));
 * ```
 *
 * @param saveHandler A function that accepts a `ModelArtifacts` and returns a
 *     `SaveResult`.
 */
declare function withSaveHandlerSync(saveHandler: (artifacts: ModelArtifacts) => SaveResult): IOHandlerSync;

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
