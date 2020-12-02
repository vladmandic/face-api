# FaceAPI

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original face-api.js is not compatible with **tfjs 2.0+**.  

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

Currently based on **`TensorFlow/JS` 2.7.0**  

### Why?

Because I needed Face-API that does not cause version conflict with newer TFJS 2.0 that I use accross my projects  
And since original Face-API was open-source, I've released this version as well  

Unfortunately, changes ended up being too large for a simple pull request on original Face-API and it ended up being a full-fledged version on its own  

### Differences

- Compatible with `TensorFlow/JS 2.0+`  
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
- Removed `mtcnn` and `tinyYolov2` models as they were non-functional in latest public version of `Face-API`  
  *If there is a demand, I can re-implement them back.*  

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  

## Installation

Face-API ships with several pre-build versions of the library:

- `dist/face-api.js`: IIFE format for client-side Browser execution *with* TFJS pre-bundled
- `dist/face-api.esm.js`: ESM format for client-side Browser execution *with* TFJS pre-bundled
- `dist/face-api.esm-nobundle.js`: ESM format for client-side Browser execution *without* TFJS pre-bundled
- `dist/face-api.node.js`: CommonJS format for server-side NodeJS execution *without* TFJS pre-bundled
- `dist/face-api.node-gpu.js`: CommonJS format for server-side NodeJS execution *without* TFJS pre-bundled and optimized for CUDA GPU acceleration

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
or to use non-bundled version:
```js
  import * as tf from `https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.7.0/tf.es2017.min.js`; // load tfjs directly from CDN link or your local system
  import * as faceapi from 'dist/face-api.esm-nobundle.js';
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

## Weights

Pretrained models and their weights are includes in `./model`.

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
2020-12-02 16:31:23 INFO:  @vladmandic/face-api version 0.8.9
2020-12-02 16:31:23 INFO:  User: vlado Platform: linux Arch: x64 Node: v15.0.1
2020-12-02 16:31:23 INFO:  Build: file startup all target: es2018
2020-12-02 16:31:23 STATE:  Build for: node type: tfjs: { imports: 1, importBytes: 39, outputBytes: 1042, outputFiles: 'dist/tfjs.esm.js' }
2020-12-02 16:31:23 STATE:  Build for: node type: node: { imports: 160, importBytes: 228038, outputBytes: 134190, outputFiles: 'dist/face-api.node.js' }
2020-12-02 16:31:23 STATE:  Build for: nodeGPU type: tfjs: { imports: 1, importBytes: 43, outputBytes: 1046, outputFiles: 'dist/tfjs.esm.js' }
2020-12-02 16:31:23 STATE:  Build for: nodeGPU type: node: { imports: 160, importBytes: 228042, outputBytes: 134198, outputFiles: 'dist/face-api.node-gpu.js' }
2020-12-02 16:31:23 STATE:  Build for: browserNoBundle type: tfjs: { imports: 1, importBytes: 1784, outputBytes: 244, outputFiles: 'dist/tfjs.esm.js' }
2020-12-02 16:31:23 STATE:  Build for: browserNoBundle type: esm: { imports: 160, importBytes: 227240, outputBytes: 131024, outputFiles: 'dist/face-api.esm-nobundle.js' }
2020-12-02 16:31:24 STATE:  Build for: browserBundle type: tfjs: { modules: 1045, moduleBytes: 3718721, imports: 7, importBytes: 1784, outputBytes: 1501677, outputFiles: 'dist/tfjs.esm.js' }
2020-12-02 16:31:24 STATE:  Build for: browserBundle type: iife: { imports: 162, importBytes: 1728673, modules: 576, moduleBytes: 1359851, outputBytes: 1903311, outputFiles: 'dist/face-api.js' }
2020-12-02 16:31:25 STATE:  Build for: browserBundle type: esm: { imports: 162, importBytes: 1728673, modules: 576, moduleBytes: 1359851, outputBytes: 1900836, outputFiles: 'dist/face-api.esm.js' }
```

<br>

## Credits & Documentation

- Original project and usage documentation: [Face-API](https://github.com/justadudewhohacks/face-api.js)  
- Original model weighs: [Face-API](https://github.com/justadudewhohacks/face-api.js-models)
- ML API Documentation: [Tensorflow/JS](https://js.tensorflow.org/api/latest/)

<br>

## Example

<br>

### Browser

Example that uses both models as well as all of the extensions is included in `/example/index.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/>  

<br>

### NodeJS

Example is included in `/example/node.js`  
Note that it does not require any other other 3rd party libraries  

*Note: Photos shown below are taken by me*

![alt text](example/screenshot.png)
