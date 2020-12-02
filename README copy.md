# FaceAPI

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original face-api.js is not compatible with **tfjs 2.0+**.  

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

Currently based on **`TensorFlow/JS` 2.7.0**  
If you want to access `TFJS` classes and methods directly, they are exported as `faceapi.tf`

### Why?

Because I needed FaceAPI that does not cause version conflict with newer TFJS 2.0 that I use accross my projects  
And since original FaceAPI was open-source, I've released this version as well  
Unfortunately, changes ended up being too large for a simple pull request on original FaceaPI and it ended up being a full-fledged version on its own  

### Differences

- Compatible with `TensorFlow/JS 2.0+`  
- Compatible with `WebGL`, `CPU` and `WASM` TFJS backends
- Updated all type castings for TypeScript type checking to `TypeScript 4.1`  
- Switched bundling from `UMD` to `ESM` + `CommonJS`  
  This does require separate process for usage in NodeJS vs Browser, but resulting code is much lighter  
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
- `dist/face-api.esm.nobundle.js`: ESM format for client-side Browser execution *without* TFJS pre-bundled
- `dist/face-api.node.js`: CommonJS format for server-side NodeJS execution *without* TFJS pre-bundled

Defaults are:
```json
{
  "main": "dist/face-api.cjs",
  "module": "dist/face-api.esm.js",
  "browser": "dist/face-api.esm.js",
}
```

Reason for additional `nobundle` version is if you want to include a specific version of TFJS and not rely on pre-packaged one  
`FaceAPI` is compatible with TFJS 2.0+  

Bundled versions are ~1.1MB minified and non-bundled versions are ~169KB non-minified  
All versions include `sourcemap`

There are several ways to use Face-API: 

### 1. IIFE script

*Recommened for quick tests and backward compatibility with older Browsers that do not support ESM such as IE*

This is simplest way for usage within Browser  
Simply download `dist/face-api.js`, include it in your `HTML` file & it's ready to use

```html
<script src="dist/face-api.js"><script>
``` 

IIFE script bundles TFJS and auto-registers global namespace `faceapi` within Window object which can be accessed directly from a `<script>` tag or from your JS file.  

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
  import * as tf from `https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.7.0/tf.es2017.min.js`; // load tfjs directly from CDN link
  import * as faceapi from 'dist/face-api.nobundle.js';
```

#### 2.2. With Bundler

Same as above, but expectation is that you've installed `@vladmandic/faceapi` package  
and that you'll package your script using a bundler such as `webpack`, `rollup` or `esbuild`  
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
  import * as faceapi from '@vladmandic/face-api/dist/face-api.nobundle.js';
```

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
- if you want to CUDA GPU Accelerated NodeJS, import `tfjs-node-gpu` instead of `tfjs-node`  
  This requires that system is CUDA enabled and has CUDA libraries already installed.
- If you want to force CommonJS module instead of relying on `recommended` field:
```js
  const faceapi = require('@vladmandic/face-api/dist/face-api.node.js');
```

### 4. Import Sources

*Recommended for complex NodeJS projects that use TFJS for other purposes and not just FaceaPI*

This way you're importing FaceAPI sources directly and not a bundle, so you have to import `@tensorflow/tfjs` explicitly  

#### 4.1. For Browser with Bundler

##### 4.1.1. For JavaScript projects
```js
  import * as tf from '@tensorflow/tfjs';
  import * as faceapi from '@vladmandic/face-api/build/index.js';
```

##### 4.1.2. For TypeScript projects
```js
  import * as tf from '@tensorflow/tfjs';
  import * as faceapi from '@vladmandic/face-api/src/index.ts';
```

#### 4.2. For NodeJS

##### 4.2.1. For JavaScript projects
```js
  const tf = require('@tensorflow/tfjs');
  const faceapi = require('@vladmandic/face-api/build/index.js');
```

##### 4.1.2. For TypeScript projects
```js
  const tf = require('@tensorflow/tfjs');
  const faceapi = require('@vladmandic/face-api/src/index.ts');
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

Which will compile everything in `./src` into `./build` and create both ESM (standard) and IIFE (minified) bundles as well as sourcemaps in `./dist`

## Credits & Documentation

- Original documentation: [Face-API](https://github.com/justadudewhohacks/face-api.js)  
- Original model weighs: [Face-API](https://github.com/justadudewhohacks/face-api.js-models)
- ML API Documentation: [Tensorflow/JS](https://js.tensorflow.org/api/latest/)

## Example

### Browser

Example that uses both models as well as all of the extensions is included in `/example/index.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/>  

### NodeJS

Example is included in `/example/node.js`  
Note that it does not require any other other 3rd party libraries  

*Note: Photos shown below are taken by me*

![alt text](example/screenshot.png)
