# FaceAPI

## Note

This is updated **face-api.js** with latest available tensorflow/js as original face-api.js is not compatible with **tfjs 2.0+**.  
If original repository is updated, this one will become obsolete.

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

## Differences

- Removed tests, docs, examples  
- Updated all package dependencies  
- Modified to make compatible with TensorFlow/JS 2.0+  
- Trivial code changes for updated TypeScript type checking
- Removed unnecesary package dependencies (karma, jasmine, etc.)  
- Updated Typescript build process to target ES2018 instead of dual ES5/ES6  
- Changed browser bundle process to use ESBuild instead of Rollup
- Updated TensorFlow/JS dependencies since backends were removed from @tensorflow/tfjs-core
- Updated mobileNetv1 model due to batchNorm() dependency
- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - mtcnn: Mostly obsolete
  - tinyYolov2: Non-functional since weights are missing

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  
Due to reduced code and changed build process, resulting bundle is about **>5x smaller** than the original!  

## Installation

**Imporant!**: This version of **face-api** does not embedd full version of **TensorFlow/JS (tfjs)** to keep package as small as possible (322KB minified), enable dynamic loading of different tfjs backends as well as to enable reusability of tfjs for different purposes.  

*Load tfjs explicitly before loading face-api.*  
*Note: package `@tensorflow/tfjs` is bundle, if you want to keep your project small, import `@tensorflow/tfjs-core` plus a specific backend such as `@tensorflow/tfjs-backend-cpu`, `@tensorflow/tfjs-backend-webgl` or `@tensorflow/tfjs-node`*

For example as a script:

```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.3.0/tf.es2017.js"></script>
  <script src="/dist/face-api.js"></script> <!-- full version / 960KB -->
  or
  <script src="/dist/face-api.min.js"></script> <!-- minified version / 320KB -->
```

Or install a module:

```bash
  npm install @tensorflow/tfjs @vladmandic/face-api
```

Use module using `require` (recommended for VanillaJS):

```js
  const tf = require('@tensorflow/tfjs');
  const faceapi = require('@vladmandic/face-api');
```

Use module in a JavaScript project using `import`:  
(NodeJS requires `"type": "module"` inside `package.json` to support `import` statements)

```js
import tf from '@tensorflow/tfjs';
import faceapi from '@vladmandic/face-api';
```

Use module in a TypeScript project:  
(TSC will compile this to `require` statements)

```js
import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';
```

## Weights

Pretrained models and their weights are includes in `./model`.

## Build

Included in `./dist` are:

- face-api.cjs: CJS format, used by NodeJS import/require (default for node and browser require/import)
- face-api.ejs: ESM format, used by Browser (provided as an alternative)
- face-api.js:  IIFE format, used by Browser (default for browser script)
- face-api.min.js:  Minified IIFE format, used by Browser

If you want to do a full rebuild use:

```shell
npm run build
```

Which will compile everything in `./src` into `./build` and create both standard and minified bundles as well as a sourcemap in `./dist`

## Documentation

For documentation refer to original project at <https://github.com/justadudewhohacks/face-api.js>  

## Example

Single new example that uses both models as well as all of the extensions is included in `/example/index.html`  
Example can be accessed directly using Git pages using URL: <https://vladmandic.github.io/face-api/example/>

*Note: Photos shown below are taken by me*

![alt text](example/screenshot.png)
