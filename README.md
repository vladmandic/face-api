![Git Version](https://img.shields.io/github/package-json/v/vladmandic/face-api?style=flat-square&svg=true&label=git)
![NPM Version](https://img.shields.io/npm/v/@vladmandic/face-api.png?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/vladmandic/face-api?style=flat-square?svg=true)
![License](https://img.shields.io/github/license/vladmandic/face-api?style=flat-square?svg=true)
![GitHub Status Checks](https://img.shields.io/github/checks-status/vladmandic/face-api/master?style=flat-square?svg=true)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/vladmandic/face-api?style=flat-square?svg=true)

# FaceAPI

**AI-powered Face Detection & Rotation Tracking, Face Description & Recognition, Age & Gender & Emotion Prediction for Browser and NodeJS using TensorFlow/JS**

<br>

**Live Demo**: <https://vladmandic.github.io/face-api/demo/webcam.html>

<br>

## Additional Documentation

- [**Tutorial**](TUTORIAL.md)
- [**TypeDoc API Specification**](https://vladmandic.github.io/face-api/typedoc/index.html)

<br><hr><br>

## Examples

<br>

### Browser

Browser example that uses static images and showcases both models  
as well as all of the extensions is included in `/demo/index.html`  
Example can be accessed directly using Git pages using URL:  
<https://vladmandic.github.io/face-api/demo/index.html>  

Browser example that uses live webcam is included in `/demo/webcam.html`  
Example can be accessed directly using Git pages using URL:  
<https://vladmandic.github.io/face-api/demo/webcam.html>  


<br>

**Demo using FaceAPI to process images**  
*Note: Photos shown below are taken by me*

![screenshot](demo/screenshot-images.png)

**Demo using FaceAPI to process live webcam**  

![screenshot](demo/screenshot-webcam.png)

<br>

### NodeJS

Three NodeJS examples are:

- `/demo/node.js`:  
  Regular usage of `FaceAPI` from `NodeJS`  
  Using `TFJS` native methods to load images without external dependencies
- `/demo/node-canvas.js`:  
  Regular usage of `FaceAPI` from `NodeJS`  
  Using external `canvas` module to load images  
  Which also allows for image drawing and saving inside `NodeJS` environment
- `/demo/node-wasm.js`:
  Same as `node-canvas`, but using `WASM` backend in `NodeJS` environment  
  Because why not :)
- `/demo/node-multiprocess.js`:  
  Multiprocessing showcase that uses pool of worker processes  
  (`node-multiprocess-worker.js`)  
  Main starts fixed pool of worker processes with each worker having  
  it's instance of `FaceAPI`  
  Workers communicate with main when they are ready and main dispaches  
  job to each ready worker until job queue is empty  

```json
2021-03-14 08:42:03 INFO:  @vladmandic/face-api version 1.0.2
2021-03-14 08:42:03 INFO:  User: vlado Platform: linux Arch: x64 Node: v15.7.0
2021-03-14 08:42:03 INFO:  FaceAPI multi-process test
2021-03-14 08:42:03 STATE:  Main: started worker: 1888019
2021-03-14 08:42:03 STATE:  Main: started worker: 1888025
2021-03-14 08:42:04 STATE:  Worker: PID: 1888025 TensorFlow/JS 3.3.0 FaceAPI 1.0.2 Backend: tensorflow
2021-03-14 08:42:04 STATE:  Worker: PID: 1888019 TensorFlow/JS 3.3.0 FaceAPI 1.0.2 Backend: tensorflow
2021-03-14 08:42:04 STATE:  Main: dispatching to worker: 1888019
2021-03-14 08:42:04 STATE:  Main: dispatching to worker: 1888025
2021-03-14 08:42:04 DATA:  Worker received message: 1888019 { image: 'demo/sample1.jpg' }
2021-03-14 08:42:04 DATA:  Worker received message: 1888025 { image: 'demo/sample2.jpg' }
2021-03-14 08:42:06 DATA:  Main: worker finished: 1888025 detected faces: 3
2021-03-14 08:42:06 STATE:  Main: dispatching to worker: 1888025
2021-03-14 08:42:06 DATA:  Worker received message: 1888025 { image: 'demo/sample3.jpg' }
2021-03-14 08:42:06 DATA:  Main: worker finished: 1888019 detected faces: 3
2021-03-14 08:42:06 STATE:  Main: dispatching to worker: 1888019
2021-03-14 08:42:06 DATA:  Worker received message: 1888019 { image: 'demo/sample4.jpg' }
2021-03-14 08:42:07 DATA:  Main: worker finished: 1888025 detected faces: 3
2021-03-14 08:42:07 STATE:  Main: dispatching to worker: 1888025
2021-03-14 08:42:07 DATA:  Worker received message: 1888025 { image: 'demo/sample5.jpg' }
2021-03-14 08:42:08 DATA:  Main: worker finished: 1888019 detected faces: 4
2021-03-14 08:42:08 STATE:  Main: dispatching to worker: 1888019
2021-03-14 08:42:08 DATA:  Worker received message: 1888019 { image: 'demo/sample6.jpg' }
2021-03-14 08:42:09 DATA:  Main: worker finished: 1888025 detected faces: 5
2021-03-14 08:42:09 STATE:  Main: worker exit: 1888025 0
2021-03-14 08:42:09 DATA:  Main: worker finished: 1888019 detected faces: 4
2021-03-14 08:42:09 INFO:  Processed 15 images in 5944 ms
2021-03-14 08:42:09 STATE:  Main: worker exit: 1888019 0
```

Note that `@tensorflow/tfjs-node` or `@tensorflow/tfjs-node-gpu`  
must be installed before using NodeJS example

<br><hr><br>

## Quick Start

Simply include latest version of `FaceAPI` directly from a CDN in your HTML:  
(pick one, `jsdelivr` or `unpkg`)

```html
<script src="https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.js"></script>
<script src="https://unpkg.dev/@vladmandic/face-api/dist/face-api.js"></script>
```

## Installation

`FaceAPI` ships with several pre-build versions of the library:

- `dist/face-api.js`: IIFE format for client-side Browser execution  
   *with* TFJS pre-bundled
- `dist/face-api.esm.js`: ESM format for client-side Browser execution  
   *with* TFJS pre-bundled
- `dist/face-api.esm-nobundle.js`: ESM format for client-side Browser execution  
   *without* TFJS pre-bundled
- `dist/face-api.node.js`: CommonJS format for server-side NodeJS execution  
   *without* TFJS pre-bundled
- `dist/face-api.node-gpu.js`: CommonJS format for server-side NodeJS execution  
   *without* TFJS pre-bundled and optimized for CUDA GPU acceleration
- `dist/face-api.node-cpu.js`: CommonJS format for server-side NodeJS execution  
   *without* TFJS pre-bundled and using JS engine for platforms where tensorflow binary library version is not available

Defaults are:

```json
{
  "main": "dist/face-api.node-js",
  "module": "dist/face-api.esm.js",
  "browser": "dist/face-api.esm.js",
}
```

Bundled `TFJS` can be used directly via export: `faceapi.tf`

Reason for additional `nobundle` version is if you want to  
include a specific version of TFJS and not rely on  pre-packaged one  

`FaceAPI` is compatible with TFJS 2.0+  

All versions include `sourcemap`

<br><hr><br>

There are several ways to use FaceAPI:

### 1. IIFE script

*Recommened for quick tests and backward compatibility with older Browsers that do not support ESM such as IE*

This is simplest way for usage within Browser  
Simply download `dist/face-api.js`, include it in your `HTML` file & it's ready to use:

```html
<script src="dist/face-api.js"><script>
```

Or skip the download and include it directly from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.js"></script>
```

IIFE script bundles TFJS and auto-registers global namespace `faceapi` within Window object which can be accessed directly from a `<script>` tag or from your JS file.  

<br>

### 2. ESM module

*Recommended for usage within Browser*

#### 2.1. Direct Import

To use ESM import directly in a Browser, you must import your script (e.g. `index.js`) with a `type="module"`  

```html
  <script src="./index.js" type="module">
```

and then in your `index.js`

```js
  import * as faceapi from 'dist/face-api.esm.js';
```

#### 2.2. With Bundler

Same as above, but expectation is that you've installed `@vladmandic/faceapi` package:

```shell
  npm install @vladmandic/face-api 
```

and that you'll package your application using a bundler such as `webpack`, `rollup` or `esbuild`  
in which case, you do not need to import a script as module - that depends on your bundler configuration  

```js
  import * as faceapi from '@vladmandic/face-api';
```

or if your bundler doesn't recognize `recommended` type, force usage with:

```js
  import * as faceapi from '@vladmandic/face-api/dist/face-api.esm.js';
```

or to use non-bundled version

```js
  import * as tf from `@tensorflow/tfjs`;
  import * as faceapi from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
```

<br>

### 3. NPM module

#### 3.1. Import CommonJS

*Recommended for NodeJS projects*

*Node: FaceAPI for NodeJS does not bundle TFJS due to binary dependencies that are installed during TFJS installation*

Install with:

```shell
  npm install @tensorflow/tfjs-node
  npm install @vladmandic/face-api 
```

And then use with:

```js
  const tf = require('@tensorflow/tfjs-node')
  const faceapi = require('@vladmandic/face-api');
```

If you want to force CommonJS module instead of relying on `recommended` field:

```js
  const faceapi = require('@vladmandic/face-api/dist/face-api.node.js');
```

If you want to GPU Accelerated execution in NodeJS, you must have CUDA libraries already installed and working  
Then install appropriate version of `FaceAPI`:

```shell
  npm install @tensorflow/tfjs-node
  npm install @vladmandic/face-api 
```

And then use with:

```js
  const tf = require('@tensorflow/tfjs-node-gpu')
  const faceapi = require('@vladmandic/face-api/dist/face-api.node-gpu.js'); // this loads face-api version with correct bindings for tfjs-node-gpu
```

If you want to use `FaceAPI` in a NodeJS on platforms where NodeJS binary libraries are not supported, you can use JavaScript CPU backend.  

```shell
  npm install @tensorflow/tfjs
  npm install @vladmandic/face-api 
```

And then use with:

```js
  const tf = require('@tensorflow/tfjs')
  const faceapi = require('@vladmandic/face-api/dist/face-api.node-cpu.js');
```

If you want to use graphical functions inside NodeJS,  
you must provide appropriate graphical library as  
NodeJS does not include implementation for DOM elements  
such as HTMLImageElement or HTMLCanvasElement:

Install `Canvas` for NodeJS:

```shell
npm install canvas
```

Patch NodeJS environment to use newly installed `Canvas` library:

```js
const canvas = require('canvas');
const faceapi = require('@vladmandic/face-api');

const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
```

<br><hr><br>

## Weights

Pretrained models and their weights are includes in `./model`.

<br><hr><br>

## Test & Dev Web Server

Built-in test&dev web server can be started using

```shell
npm run dev
```

By default it starts HTTP server on port 8000 and HTTPS server on port 8001 and can be accessed as:  

- <https://localhost:8001/demo/index.html>
- <https://localhost:8001/demo/webcam.html>

```json
2021-06-04 09:15:08 INFO:  @vladmandic/face-api version 1.3.0
2021-06-04 09:15:08 INFO:  User: vlado Platform: linux Arch: x64 Node: v16.0.0
2021-06-04 09:15:08 INFO:  Build: file startup all target: es2018
2021-06-04 09:15:08 STATE: HTTP server listening: 8000
2021-06-04 09:15:08 STATE: HTTP2 server listening: 8001
2021-06-04 09:15:08 STATE: Build for: node type: tfjs: { imports: 1, importBytes: 143, outputBytes: 1327, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:15:08 STATE: Monitoring: [ 'package.json', 'demo', 'src', [length]: 3 ]
2021-06-04 09:15:08 STATE: Build for: node type: node: { imports: 162, importBytes: 234251, outputBytes: 175089, outputFiles: 'dist/face-api.node.js' }
2021-06-04 09:15:09 STATE: Build for: nodeGPU type: tfjs: { imports: 1, importBytes: 147, outputBytes: 1335, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:15:09 STATE: Build for: nodeGPU type: node: { imports: 162, importBytes: 234259, outputBytes: 175097, outputFiles: 'dist/face-api.node-gpu.js' }
2021-06-04 09:15:09 STATE: Build for: nodeCPU type: tfjs: { imports: 1, importBytes: 138, outputBytes: 1326, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:15:09 STATE: Build for: nodeCPU type: node: { imports: 162, importBytes: 234250, outputBytes: 175088, outputFiles: 'dist/face-api.node-cpu.js' }
2021-06-04 09:15:09 STATE: Build for: browserNoBundle type: tfjs: { imports: 1, importBytes: 276, outputBytes: 277, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:15:09 STATE: Build for: browserNoBundle type: esm: { imports: 162, importBytes: 233201, outputBytes: 168707, outputFiles: 'dist/face-api.esm-nobundle.js' }
2021-06-04 09:15:09 STATE: Build for: browserBundle type: tfjs: { modules: 1348, moduleBytes: 4323957, imports: 7, importBytes: 276, outputBytes: 2328203, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:15:10 STATE: Build for: browserBundle type: iife: { imports: 162, importBytes: 2561127, outputBytes: 2448241, outputFiles: 'dist/face-api.js' }
2021-06-04 09:15:11 STATE: Build for: browserBundle type: esm: { imports: 162, importBytes: 2561127, outputBytes: 2327046, outputFiles: 'dist/face-api.esm.js' }
```

<br><hr><br>

## Build

If you want to do a full rebuild, either download npm module

```shell
npm install @vladmandic/face-api
cd node_modules/@vladmandic/face-api
```

or clone a git project

```shell
git clone https://github.com/vladmandic/face-api
cd face-api
```

Then install all dependencies and run rebuild:

```shell
npm install
npm run build
```

Build process uses script `build.js` that creates optimized build for each target:

```text
> @vladmandic/face-api@1.0.2 build
> rimraf dist/* types/* typedoc/* && node server/build.js
```

```json
2021-06-04 09:13:42 INFO:  @vladmandic/face-api version 1.3.0
2021-06-04 09:13:42 INFO:  User: vlado Platform: linux Arch: x64 Node: v16.0.0
2021-06-04 09:13:42 INFO:  Toolchain: tfjs: 3.7.0 esbuild 0.12.6; typescript 4.2.4; typedoc: 0.20.36 eslint: 7.27.0
2021-06-04 09:13:42 INFO:  Build: file startup all target: es2018
2021-06-04 09:13:42 STATE: Build for: node type: tfjs: { imports: 1, importBytes: 143, outputBytes: 1327, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:13:42 STATE: Build for: node type: node: { imports: 162, importBytes: 234251, outputBytes: 175089, outputFiles: 'dist/face-api.node.js' }
2021-06-04 09:13:42 STATE: Build for: nodeGPU type: tfjs: { imports: 1, importBytes: 147, outputBytes: 1335, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:13:42 STATE: Build for: nodeGPU type: node: { imports: 162, importBytes: 234259, outputBytes: 175097, outputFiles: 'dist/face-api.node-gpu.js' }
2021-06-04 09:13:42 STATE: Build for: nodeCPU type: tfjs: { imports: 1, importBytes: 138, outputBytes: 1326, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:13:42 STATE: Build for: nodeCPU type: node: { imports: 162, importBytes: 234250, outputBytes: 175088, outputFiles: 'dist/face-api.node-cpu.js' }
2021-06-04 09:13:42 STATE: Build for: browserNoBundle type: tfjs: { imports: 1, importBytes: 276, outputBytes: 277, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:13:42 STATE: Build for: browserNoBundle type: esm: { imports: 162, importBytes: 233201, outputBytes: 168707, outputFiles: 'dist/face-api.esm-nobundle.js' }
2021-06-04 09:13:43 STATE: Build for: browserBundle type: tfjs: { modules: 1348, moduleBytes: 4323957, imports: 7, importBytes: 276, outputBytes: 2328203, outputFiles: 'dist/tfjs.esm.js' }
2021-06-04 09:13:44 STATE: Build for: browserBundle type: iife: { imports: 162, importBytes: 2561127, outputBytes: 2448241, outputFiles: 'dist/face-api.js' }
2021-06-04 09:13:45 STATE: Build for: browserBundle type: esm: { imports: 162, importBytes: 2561127, outputBytes: 2327046, outputFiles: 'dist/face-api.esm.js' }
2021-06-04 09:13:45 INFO:  Running Linter: [ 'server/', 'demo/', 'src/', 'test/', [length]: 4 ]
2021-06-04 09:14:10 INFO:  Linter complete: files: 183 errors: 0 warnings: 0
2021-06-04 09:14:10 INFO:  Compile typings: [ 'src/index.ts', [length]: 1 ]
2021-06-04 09:14:15 INFO:  Update Change log: [ '/home/vlado/dev/face-api/CHANGELOG.md', [length]: 1 ]
2021-06-04 09:14:15 INFO:  Generate TypeDocs: [ 'src/index.ts', [length]: 1 ]
```

<br><hr><br>

## Face Mesh

`FaceAPI` landmark model returns 68-point face mesh as detailed in the image below:

![facemesh](demo/facemesh.png)

<br><hr><br>

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original is not compatible with **tfjs 2.0+**.  
Forked from [face-api.js](https://github.com/justadudewhohacks/face-api.js) version **0.22.2** which was released on March 22nd, 2020  

Currently based on **`TensorFlow/JS` 3.6.1**  

*Why?* I needed FaceAPI that does not cause version conflict with newer versions of TensorFlow  
And since original FaceAPI was open-source, I've released this version as well  

Changes ended up being too large for a simple pull request  
and it ended up being a full-fledged version on its own  

Plus many features were added since original inception  

Although a lot of work has gone into this version of `FaceAPI` and it will continue to be maintained,  
at this time it is completely superseded by my newer library `Human` which covers the same use cases,  
but extends it with newer AI models, additional detection details, compatibility with latest web standard and more

- [Human NPM](https://www.npmjs.com/package/@vladmandic/human)
- [Human Git Repository](https://github.com/vladmandic/human)

<br>

## Differences

Compared to [face-api.js](https://github.com/justadudewhohacks/face-api.js) version **0.22.2**:

- Compatible with `TensorFlow/JS 2.0+ & 3.0+`
- Compatible with `WebGL`, `CPU` and `WASM` TFJS Browser backends
- Compatible with both `tfjs-node` and `tfjs-node-gpu` TFJS NodeJS backends
- Updated all type castings for TypeScript type checking to `TypeScript 4.2`
- Switched bundling from `UMD` to `ESM` + `CommonJS` with fallback to `IIFE`
  Resulting code is optimized per-platform instead of being universal
  Fully tree shakable when imported as an `ESM` module
  Browser bundle process uses `ESBuild` instead of `Rollup`
- Typescript build process now targets `ES2018` and instead of dual `ES5`/`ES6`
  Resulting code is clean ES2018 JavaScript without polyfills
- Removed old tests, docs, examples
- Removed old package dependencies (`karma`, `jasmine`, `babel`, etc.)
- Updated all package dependencies
- Updated TensorFlow/JS dependencies since backends were removed from `@tensorflow/tfjs-core`
- Updated `mobileNetv1` model due to `batchNorm()` dependency
- Added `version` class that returns JSON object with version of FaceAPI as well as linked TFJS
- Added test/dev built-in HTTP & HTTPS Web server
- Removed `mtcnn` and `tinyYolov2` models as they were non-functional in latest public version of `FaceAPI`
  Which means valid models are **tinyFaceDetector** and **mobileNetv1**
  *If there is a demand, I can re-implement them back.*
- Added `face angle` calculations that returns `roll`, `yaw` and `pitch`
- Added `typdoc` automatic API specification generation during build
- Added `changelog` automatic generation during build

<br>

## Credits

- Original project: [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- Original model weighs: [face-api.js-models](https://github.com/justadudewhohacks/face-api.js-models)
- ML API Documentation: [Tensorflow/JS](https://js.tensorflow.org/api/latest/)

<br>

![Stars](https://img.shields.io/github/stars/vladmandic/face-api?style=flat-square?svg=true)
![Forks](https://badgen.net/github/forks/vladmandic/face-api)
![Code Size](https://img.shields.io/github/languages/code-size/vladmandic/face-api?style=flat-square?svg=true)
![CDN](https://data.jsdelivr.com/v1/package/npm/@vladmandic/face-api/badge)<br>
![Downloads](https://img.shields.io/npm/dw/@vladmandic/face-api.png?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@vladmandic/face-api.png?style=flat-square)
![Downloads](https://img.shields.io/npm/dy/@vladmandic/face-api.png?style=flat-square)
