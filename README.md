# FaceAPI

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original face-api.js is not compatible with **tfjs 2.0+**.  

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

Currently based on **`TensorFlow/JS` 2.6.0**  
If you want to access `TFJS` classes and methods directly, they are exported as `faceapi.tf`

## Differences

- Updated all type castings for TypeScript type checking to TypeScript 4.1
- Typescript build process now targets ES2018 and instead of dual ES5/ES6  
- Compatible with TensorFlow/JS 2.0+  
- Removed old tests, docs, examples  
- Removed unnecesary package dependencies (karma, jasmine, etc.)  
- Updated all package dependencies  
- Browser bundle process uses ESBuild instead of Rollup
- New TensorFlow/JS dependencies since backends were removed from @tensorflow/tfjs-core
- Updated mobileNetv1 model due to batchNorm() dependency
- Fully tree shakable when imported as an ESM module
- Added `version` class that returns JSON object with version of FaceAPI as well as linked TFJS
- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - mtcnn: Obsolete
  - tinyYolov2: Non-functional since weights are missing

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  

## Installation

There are several ways to use Face-API: 

### 1. IIFE script

*Recommened for quick tests and backward compatibility with older Browsers that do not support ESM such as IE*

This is simplest way for usage within Browser  
Simply download `dist/face-api.js`, include it in your `HTML` file & it's ready to use

```html
<script src="dist/face-api.js"><script>
``` 

IIFE script auto-registers global namespace `faceapi` within Window object which can be accessed directly from a `<script>` tag or from your JS file.  

### 2. ESM module

*Recommended for usage within Browser*

#### 2.1 Directly

To use ESM import directly in a Browser, you must import your script (e.g. `index.js`) with a `type="module"`  

```html
  <script src="./index.js" type="module">
```
and then in your `index.js`

```js
  import * as faceapi from 'dist/face-api.esm.js';
```

#### 2.2 With Bundler

Same as above, but expectation is that you'll package your script using a bundler such as `webpack`, `rollup` or `esbuild` in which case, you do not need to import a script as module - that depends on your bundler configuration  

```js
  import * as faceapi from 'dist/face-api.esm.js';
```

### 3. NPM module

#### 3.1 Import ESM

*Recommended for NodeJS projects*

Install with:
```shell
  npm install @vladmandic/face-api 
```
And then use with:
```js
  import * as faceapi from '@vladmandic/face-api';
```
Alternatively, if you have issues, force ESM import using 
```js
  import * as faceapi from '@vladmandic/face-api/dist/face-api.esm.js';
```

#### 3.2. Import Sources

*Recommended for complex NodeJS projects that use TFJS for other purposes and not just FaceaPI*

This way you're importing FaceAPI sources directly and not a bundle, so you have to import `@tensorflow/tfjs` explicitly  

3.2.1 For JavaScript projects
```js
  import * as tf from '@tensorflow/tfjs';
  import * as faceapi from '@vladmandic/face-api/build/index.js';
```

3.2.2 For TypeScript projects
```js
  import * as tf from '@tensorflow/tfjs';
  import * as faceapi from '@vladmandic/face-api/src/index.ts';
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

## Documentation

For documentation refer to original project at <https://github.com/justadudewhohacks/face-api.js>  

## Example

Single new example that uses both models as well as all of the extensions is included in `/example/index.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/>

*Note: Photos shown below are taken by me*

![alt text](example/screenshot.png)
