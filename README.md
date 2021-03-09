![Version](https://img.shields.io/github/package-json/v/vladmandic/face-api?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/vladmandic/face-api?style=flat-square)
![License](https://img.shields.io/github/license/vladmandic/face-api?style=flat-square)
![GitHub Status Checks](https://img.shields.io/github/checks-status/vladmandic/face-api/master?style=flat-square])
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/vladmandic/face-api?style=flat-square)

# FaceAPI

**Face detection and recognition libary for Browser and NodeJS implemented on top of TensorFlow/JS**

<br>

**Live Demo**: <https://vladmandic.github.io/face-api/example/webcam.html>

<br>

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original face-api.js is not compatible with **tfjs 2.0+**.  

Forked from [face-api.js](https://github.com/justadudewhohacks/face-api.js) version **0.22.2** which was released on March 22nd, 2020  

Currently based on **`TensorFlow/JS` 3.2.0**  

### Why?

Because I needed Face-API that does not cause version conflict with newer TFJS 2.0 that I use accross my projects  
And since original Face-API was open-source, I've released this version as well  

Unfortunately, changes ended up being too large for a simple pull request on original Face-API and it ended up being a full-fledged version on its own  

### Differences

- Compatible with `TensorFlow/JS 2.0+ & 3.0+`  
- Compatible with `WebGL`, `CPU` and `WASM` TFJS Browser backends
- Compatible with both `tfjs-node` and `tfjs-node-gpu` TFJS NodeJS backends
- Updated all type castings for TypeScript type checking to `TypeScript 4.1`  
- Switched bundling from `UMD` to `ESM` + `CommonJS` with fallback to `IIFE`  
  Resulting code is optimized per-platform instead of being universal  
  Fully tree shakable when imported as an `ESM` module  
  Browser bundle process uses `ESBuild` instead of `Rollup`  
- Typescript build process now targets `ES2018` and instead of dual ES5/ES6  
  Resulting code is clean ES2018 JavaScript without polyfills  
- Removed old tests, docs, examples  
- Removed old package dependencies (`karma`, `jasmine`, `babel`, etc.)  
- Updated all package dependencies  
- Updated TensorFlow/JS dependencies since backends were removed from `@tensorflow/tfjs-core`  
- Updated mobileNetv1 model due to `batchNorm()` dependency  
- Added `version` class that returns JSON object with version of FaceAPI as well as linked TFJS  
- Added test/dev built-in HTTP & HTTPS Web server
- Removed `mtcnn` and `tinyYolov2` models as they were non-functional in latest public version of `Face-API`  
  *If there is a demand, I can re-implement them back.*  
- Added `face angle` calculations that returns `roll`, `yaw` and `pitch`  

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  

<br>
<hr>
<br>

## Examples

<br>

### Browser

Browser example that uses static images and showcases both models as well as all of the extensions is included in `/example/index.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/index.html>  

Browser example that uses live webcam is included in `/example/webcam.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/webcam.html>  


<br>

*Note: Photos shown below are taken by me*

![screenshot](example/screenshot.png)

<br>

### NodeJS

Two NodeJS examples are:

- `/example/node-singleprocess.js`: Regular usage of `FaceAPI` from `NodeJS`  
- `/example/node-multiprocess.js`: Multiprocessing showcase that uses pool of worker processes (`node-multiprocess-worker.js`
  Main starts fixed pool of worker processes with each worker having it's instance of `FaceAPI`  
  Workers communicate with main when they are ready and main dispaches job to each ready worker until job queue is empty  

```json
2020-12-08 08:30:01 INFO:  @vladmandic/face-api version 0.9.1
2020-12-08 08:30:01 INFO:  User: vlado Platform: linux Arch: x64 Node: v15.0.1
2020-12-08 08:30:01 INFO:  FaceAPI multi-process test
2020-12-08 08:30:01 STATE:  Main: started worker: 265238
2020-12-08 08:30:01 STATE:  Main: started worker: 265244
2020-12-08 08:30:02 STATE:  Worker: PID: 265238 TensorFlow/JS 2.7.0 FaceAPI 0.9.1 Backend: tensorflow
2020-12-08 08:30:02 STATE:  Worker: PID: 265244 TensorFlow/JS 2.7.0 FaceAPI 0.9.1 Backend: tensorflow
2020-12-08 08:30:02 STATE:  Main: dispatching to worker: 265238
2020-12-08 08:30:02 STATE:  Main: dispatching to worker: 265244
2020-12-08 08:30:02 DATA:  Worker received message: 265238 { image: 'example/sample (1).jpg' }
2020-12-08 08:30:02 DATA:  Worker received message: 265244 { image: 'example/sample (2).jpg' }
2020-12-08 08:30:04 DATA:  Main: worker finished: 265238 detected faces: 3
2020-12-08 08:30:04 STATE:  Main: dispatching to worker: 265238
2020-12-08 08:30:04 DATA:  Main: worker finished: 265244 detected faces: 3
2020-12-08 08:30:04 STATE:  Main: dispatching to worker: 265244
2020-12-08 08:30:04 DATA:  Worker received message: 265238 { image: 'example/sample (3).jpg' }
2020-12-08 08:30:04 DATA:  Worker received message: 265244 { image: 'example/sample (4).jpg' }
2020-12-08 08:30:06 DATA:  Main: worker finished: 265238 detected faces: 3
2020-12-08 08:30:06 STATE:  Main: dispatching to worker: 265238
2020-12-08 08:30:06 DATA:  Worker received message: 265238 { image: 'example/sample (5).jpg' }
2020-12-08 08:30:06 DATA:  Main: worker finished: 265244 detected faces: 4
2020-12-08 08:30:06 STATE:  Main: dispatching to worker: 265244
2020-12-08 08:30:06 DATA:  Worker received message: 265244 { image: 'example/sample (6).jpg' }
2020-12-08 08:30:07 DATA:  Main: worker finished: 265238 detected faces: 5
2020-12-08 08:30:07 STATE:  Main: worker exit: 265238 0
2020-12-08 08:30:08 DATA:  Main: worker finished: 265244 detected faces: 4
2020-12-08 08:30:08 INFO:  Processed 12 images in 6826 ms
2020-12-08 08:30:08 STATE:  Main: worker exit: 265244 0
```

Note that `@tensorflow/tfjs-node` or `@tensorflow/tfjs-node-gpu` must be installed before using NodeJS example

<br>
<hr>
<br>

## Installation

Face-API ships with several pre-build versions of the library:

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

Reason for additional `nobundle` version is if you want to include a specific version of TFJS and not rely on  pre-packaged one  

`FaceAPI` is compatible with TFJS 2.0+  

All versions include `sourcemap` and `asset manifest`

<br>
<hr>
<br>

There are several ways to use Face-API:

### 1. IIFE script

*Recommened for quick tests and backward compatibility with older Browsers that do not support ESM such as IE*

This is simplest way for usage within Browser  
Simply download `dist/face-api.js`, include it in your `HTML` file & it's ready to use

```html
<script src="dist/face-api.js"><script>
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

*Node: Face-API for NodeJS does not bundle TFJS due to binary dependencies that are installed during TFJS installation*

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
Then install appropriate version of `Face-API`:

```shell
  npm install @tensorflow/tfjs-node
  npm install @vladmandic/face-api 
```

And then use with:

```js
  const tf = require('@tensorflow/tfjs-node-gpu')
  const faceapi = require('@vladmandic/face-api/dist/face-api.node-gpu.js'); // this loads face-api version with correct bindings for tfjs-node-gpu
```

If you want to use `Face-API` in a NodeJS on platforms where NodeJS binary libraries are not supported, you can use JavaScript CPU backend.  

```shell
  npm install @tensorflow/tfjs
  npm install @vladmandic/face-api 
```

And then use with:

```js
  const tf = require('@tensorflow/tfjs')
  const faceapi = require('@vladmandic/face-api/dist/face-api.node-cpu.js');
```

If you want to use graphical functions inside NodeJS, you must provide appropriate graphical library as NodeJS does not include implementation for DOM elements such as HTMLImageElement or HTMLCanvasElement:

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

<br>
<hr>
<br>

## Weights

Pretrained models and their weights are includes in `./model`.

<br>
<hr>
<br>

## Test & Dev Web Server

Built-in test&dev web server can be started using

```shell
npm run dev
```

By default it starts HTTP server on port 8000 and HTTPS server on port 8001 and can be accessed as:  

- <https://localhost:8001/example/index.html>
- <https://localhost:8001/example/webcam.html>

```json
2021-01-10 08:39:00 INFO:  @vladmandic/face-api version 0.10.2
2021-01-10 08:39:00 INFO:  User: vlado Platform: linux Arch: x64 Node: v15.4.0
2021-01-10 08:39:00 INFO:  Build: file startup all target: es2018
2021-01-10 08:39:00 STATE:  HTTP server listening: 8000
2021-01-10 08:39:00 STATE:  HTTP2 server listening: 8001
2021-01-10 08:39:00 STATE:  Monitoring: [ 'package.json', 'config.js', 'example', 'src', [length]: 4 ]
2021-01-10 08:39:00 STATE:  Monitoring: [ 'package.json', 'config.js', 'example', 'src', [length]: 4 ]
2021-01-10 08:39:01 STATE:  Build for: browserBundle type: tfjs: { modules: 1253, moduleBytes: 3997175, imports: 7, importBytes: 276, outputBytes: 1565414, outputFiles: 'dist/tfjs.esm.js' }
2021-01-10 08:39:01 STATE:  Build for: browserBundle type: iife: { imports: 160, importBytes: 1797487, outputBytes: 1699552, outputFiles: 'dist/face-api.js' }
2021-01-10 08:39:01 STATE:  Build for: browserBundle type: esm: { imports: 160, importBytes: 1797487, outputBytes: 1697086, outputFiles: 'dist/face-api.esm.js' }
2021-01-10 08:39:01 INFO:  Compile: [ 'src/index.ts', [length]: 1 ]
```

<br>
<hr>
<br>

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
npm run build

> @vladmandic/face-api@0.8.9 build /home/vlado/dev/face-api
> rimraf dist/* && node ./build.js
```

```json
2021-01-10 08:42:01 INFO:  @vladmandic/face-api version 0.10.2
2021-01-10 08:42:01 INFO:  User: vlado Platform: linux Arch: x64 Node: v15.4.0
2021-01-10 08:42:01 INFO:  Build: file startup all target: es2018
2021-01-10 08:42:01 STATE:  Build for: node type: tfjs: { imports: 1, importBytes: 143, outputBytes: 1042, outputFiles: 'dist/tfjs.esm.js' }
2021-01-10 08:42:01 STATE:  Build for: node type: node: { imports: 160, importBytes: 233115, outputBytes: 132266, outputFiles: 'dist/face-api.node.js' }
2021-01-10 08:42:01 STATE:  Build for: nodeGPU type: tfjs: { imports: 1, importBytes: 147, outputBytes: 1046, outputFiles: 'dist/tfjs.esm.js' }
2021-01-10 08:42:01 STATE:  Build for: nodeGPU type: node: { imports: 160, importBytes: 233119, outputBytes: 132274, outputFiles: 'dist/face-api.node-gpu.js' }
2021-01-10 08:42:01 STATE:  Build for: browserNoBundle type: tfjs: { imports: 1, importBytes: 276, outputBytes: 244, outputFiles: 'dist/tfjs.esm.js' }
2021-01-10 08:42:01 STATE:  Build for: browserNoBundle type: esm: { imports: 160, importBytes: 232317, outputBytes: 129069, outputFiles: 'dist/face-api.esm-nobundle.js' }
2021-01-10 08:42:01 STATE:  Build for: browserBundle type: tfjs: { modules: 1253, moduleBytes: 3997175, imports: 7, importBytes: 276, outputBytes: 1565414, outputFiles: 'dist/tfjs.esm.js' }
2021-01-10 08:42:02 STATE:  Build for: browserBundle type: iife: { imports: 160, importBytes: 1797487, outputBytes: 1699552, outputFiles: 'dist/face-api.js' }
2021-01-10 08:42:02 STATE:  Build for: browserBundle type: esm: { imports: 160, importBytes: 1797487, outputBytes: 1697086, outputFiles: 'dist/face-api.esm.js' }
2021-01-10 08:42:02 INFO:  Compile: [ 'src/index.ts', [length]: 1 ]```
```

<br>
<hr>
<br>

## Face Mesh

`FaceAPI` landmark model returns 68-point face mesh as detailed in the image below:

![facemesh](example/facemesh.png)

## Documentation

- [**Tutorial**](TUTORIAL.md)
- [**API Documentation**](https://justadudewhohacks.github.io/face-api.js/docs/globals.html)

## Credits

- Original project: [Face-API](https://github.com/justadudewhohacks/face-api.js)  
- Original model weighs: [Face-API](https://github.com/justadudewhohacks/face-api.js-models)
- ML API Documentation: [Tensorflow/JS](https://js.tensorflow.org/api/latest/)

<br>

![Downloads](https://img.shields.io/npm/dm/@vladmandic/face-api?style=flat-square)
![Stars](https://img.shields.io/github/stars/vladmandic/face-api?style=flat-square)
![Code Size](https://img.shields.io/github/languages/code-size/vladmandic/face-api?style=flat-square)
