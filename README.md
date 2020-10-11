# FaceAPI

## Note

This is updated **face-api.js** with latest available TensorFlow/JS as the original face-api.js is not compatible with **tfjs 2.0+**.  

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

## Differences

- Removed tests, docs, examples  
- Updated all package dependencies  
- Compatible with TensorFlow/JS 2.0+  
- Updated type casting for TypeScript type checking
- Removed unnecesary package dependencies (karma, jasmine, etc.)  
- Typescript build process now targets ES2018 and instead of dual ES5/ES6  
- Browser bundle process uses ESBuild instead of Rollup
- New TensorFlow/JS dependencies since backends were removed from @tensorflow/tfjs-core
- Updated mobileNetv1 model due to batchNorm() dependency
- Fully tree shakable when imported as an ESM module
- Added `version` class that returns JSON object with version of FaceAPI as well as linked TFJS
- Added calls for `setPlatform` to automatically prepare TFJS in browser
- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - mtcnn: Mostly obsolete
  - tinyYolov2: Non-functional since weights are missing

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  
Due to reduced code and changed build process, resulting bundle is about **>5x smaller** than the original!  

## Installation

There are several ways to use Face-API: 

### IIFE script
  *Size: 936KB minified*

  This is simplest way for usage within Browser as it includes full version of TensorFlow/JS prepackaged with no external dependencies.  
  Simply download `dist/face-api.js`, include it in your `HTML` file & it's ready to use.

  ```html
  <script src="dist/face-api.js"><script>
  ``` 

  For a quick test, you can access the script directly from `gitpages`

  ```html
  <script src="https://vladmandic.github.io/face-api/dist/face-api.js"></script>
  ```

  IIFE script auto-registers global namespace `faceapi` within Window object.  
  And if you want to access `TensorFlow/JS` classes directly, they are exported as `faceapi.tf`

  Pre-packaged version of `TFJS` is **2.6.0**

### ESM module
  *Size: 164KB non-minified*

  If you're using bundler *(such as rollup, webpack, esbuild)* to package your client application, you can import ESM version of FaceAPI which supports full tree shaking  
  Note that this version does NOT pre-package `TFJS`, so you'll need to include it before you import `FaceAPI`  
  You can use any version of `TFJS` 2.0+  

  ```js
    import * as tf from 'https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.6.0/tf.min.js'; // load directly from CDN
    import * as faceapi from 'dist/face-api.esm.js';
  ```
  *Experimental*:  
  You could use same syntax within your main `JS` file if it's imported with `<script type="module">`  

  ```html
    <script src="tf.min.js">
    <script src="./index.js" type="module">
  ```
  and then in `index.js`

  ```js
    import * as tf from 'https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.6.0/tf.min.js'; // load directly from CDN
    import * as faceapi from 'dist/face-api.esm.js';
  ```

### NPM module
  *Size: 45,104KB unpacked (including sources and pre-trained model weights)*

  Simmilar to ESM module, but with full sources as it points to `build/src/index.js` instead  
  Recommended for NodeJS projects

  Install with:
  ```shell
    npm install @tensorflow/tfjs @vladmandic/face-api 
  ```
  And then use with:
  ```js
    import * as tf from '@tensorflow/tfjs';
    import * as faceapi from '@vladmandic/face-api';
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
