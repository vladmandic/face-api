# FaceAPI

## Branch Point

Forked from face-api.js version **0.22.2** released on March 22nd, 2020  
<https://github.com/justadudewhohacks/face-api.js>  
<https://www.npmjs.com/package/face-api.js>  

## Note

I don't plan to maintain a separate distribution of **face-api.js**, this is only a temporary repository to use latest available face-api with latest available tensorflow/js as original face-api.js is not compatible with **tfjs 2.0+**.  
If original repository is updated, this one will become obsolete.

## Differences

- Removed tests, docs, examples  
- Updated all package dependencies  
- Removed unnecesary package dependencies (karma, jasmine, etc.)  
- Updated Typescript build process to target ES2020 instead of dual ES5/ES6  
- Modified to make compatible with TensorFlow/JS 2.0+  
- Trivial code changes for updated Typescript type checking
- Changed browser bundle process to use ESBuild instead of Rollup
- Updated tfjs dependencies since backends were removed from tfjs-core

- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - ssdMobilenetv1: Relies on batchNorm() function which is made obsolete in tfjs 2.0
  - mtcnn: Mostly obsolete
  - tinyYolov2: Non-functional since weights are missing

Which means the only valid model is **tinyFaceDetector**  

However, due to reduced code and changed build process, resulting bundle is about **2.5x smaller** than the original!  

## Build

Both ./build and ./dist folders are included by default, so no need for build during install.
However, if you want to rebuild use:

```shell
npm run build
```

Which will compile everything in ./src into ./build and create standard and minified bundles and sourcemap in ./dist

## Documentation

For documentation refer to original project  
