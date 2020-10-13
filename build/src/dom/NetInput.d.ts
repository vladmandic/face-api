import * as tf from '@tensorflow/tfjs-core';
import { Dimensions } from '../classes/Dimensions';
import { TResolvedNetInput } from './types';
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
