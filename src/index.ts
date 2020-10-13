// import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
import * as tf from '@tensorflow/tfjs/dist/tf.es2017.js';
// const tf = require('@tensorflow/tfjs-core/dist/tf-core.es2017.js');
// require('@tensorflow/tfjs-backend-cpu/dist/tf-backend-cpu.es2017.js');
// require('@tensorflow/tfjs-backend-webgl/dist/tf-backend-webgl.es2017.js');
import * as draw from './draw';
import * as utils from './utils';
export { tf, draw, utils };

export * from './ageGenderNet/index';
export * from './classes/index';
export * from './dom/index'
export * from './env/index';
export * from './faceExpressionNet/index';
export * from './faceLandmarkNet/index';
export * from './faceRecognitionNet/index';
export * from './factories/index';
export * from './globalApi/index';
export * from './ops/index';
export * from './ssdMobilenetv1/index';
export * from './tinyFaceDetector/index';
export * from './tinyYolov2/index';
export * from './euclideanDistance';
export * from './NeuralNetwork';
export * from './resizeResults';

import * as pkg from '../package.json';
const node = (typeof process !== 'undefined');
const browser = (typeof navigator !== 'undefined') && (typeof navigator.userAgent !== 'undefined');
export const version = { faceapi: pkg.version, node, browser };

// import { PlatformBrowser } from './Platform';
// if (!tf.env().platform && tf.env().get('IS_BROWSER')) tf.env().setPlatform('browser', new PlatformBrowser);
// tf.setBackend('cpu');

// import {MathBackendCPU} from '@tensorflow/tfjs-backend-cpu/dist/backend_cpu.js';
// export {MathBackendCPU};
// tf.registerBackend('cpu', () => new MathBackendCPU(), 1 /* priority */);
