import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-core/dist/types';
import '@tensorflow/tfjs-core/dist/register_all_gradients';
import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';
import '@tensorflow/tfjs-data';
import '@tensorflow/tfjs-layers';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgpu';

export declare const version: {
  'tfjs-core': string;
  'tfjs-backend-cpu': string;
  'tfjs-backend-webgl': string;
  'tfjs-data': string;
  'tfjs-layers': string;
  'tfjs-converter': string;
  tfjs: string;
};

// export { io, browser, image } from '@tensorflow/tfjs-core';
export { tensor, tidy, softmax, unstack, relu, add, conv2d, cast, zeros, concat, avgPool, stack, fill, transpose, tensor1d, tensor2d, tensor3d, tensor4d, maxPool, matMul, mul, sub, scalar } from '@tensorflow/tfjs-core';
export { div, pad, slice, reshape, slice3d, expandDims, depthwiseConv2d, separableConv2d, sigmoid, exp, tile, batchNorm, clipByValue } from '@tensorflow/tfjs-core';
export { ENV, Variable, Tensor, TensorLike, Rank, Tensor1D, Tensor2D, Tensor3D, Tensor4D, Tensor5D, NamedTensorMap } from '@tensorflow/tfjs-core';
