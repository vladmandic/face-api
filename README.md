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
- Updated TFJS dependencies since backends were removed from @tensorflow/tfjs-core
- Updated mobileNetv1 model due to batchNorm() dependency
- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - mtcnn: Mostly obsolete
  - tinyYolov2: Non-functional since weights are missing

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  
Due to reduced code and changed build process, resulting bundle is about **>5x smaller** than the original!  

## Installation

**Imporant!**: This version of **face-api** does not embedd full version of **tfjs** to enable dynamic loading of different versions of tfjs as well as to enable reusability of tfjs for different purposes. *Load tfjs explicitly before loading face-api.*  

For example as ESM script:

```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/2.3.0/tf.es2017.js"></script>
  <script src="/dist/face-api.js"></script> <!-- full version / 960KB -->
  <script src="/dist/face-api.min.js"></script> <!-- minified version / 320KB -->
```

or as NPM module:

```js
  # npm install @tensorflow/tfjs @vladmandic/face-api
  
  const tf = require('@tensorflow/tfjs');
  const faceapi = require('@vladmandic/face-api');
```

## Weights

Pretrained models are includes in `./weights`.

## Build

Both **`./build`** (used by `import` or `require`) and **`./dist`** (used by `<script src...>`) folders are included by default, so no need for build during install.
However, if you want to rebuild use:

```shell
npm run build
```

Which will compile everything in `./src` into `./build` and create both standard and minified bundles as well as a sourcemap in `./dist`

## Documentation

For documentation refer to original project at <https://github.com/justadudewhohacks/face-api.js>  

## Example

Single new example that uses both models as well as all of the extensions is included in `/example/index.html`  

![alt text](example/screenshot.png)
