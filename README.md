# FaceAPI

Forked from **face-api.js** version **0.22.2** released on March 22nd, 2020  

- <https://github.com/justadudewhohacks/face-api.js>  
- <https://www.npmjs.com/package/face-api.js>  

## Note

I don't plan to maintain a separate distribution of **face-api.js**, this is only a temporary repository to use latest available face-api with latest available tensorflow/js as original face-api.js is not compatible with **tfjs 2.0+**.  
If original repository is updated, this one will become obsolete.

## Differences

- Removed tests, docs, examples  
- Updated all package dependencies  
- Modified to make compatible with TensorFlow/JS 2.0+  
- Trivial code changes for updated TypeScript type checking
- Removed unnecesary package dependencies (karma, jasmine, etc.)  
- Updated Typescript build process to target ES2018 instead of dual ES5/ES6  
- Changed browser bundle process to use ESBuild instead of Rollup
- Updated dependencies to @tensorflow/tfjs since backends were removed from @tensorflow/tfjs-core

- Removed following models as they are either obsolete or non-functional with tfjs 2.0+
  - mtcnn: Mostly obsolete
  - tinyYolov2: Non-functional since weights are missing

- Updated newer version for mobileNetv1 model from <https://github.com/yeephycho/tensorflow-face-detection>  
  Note that updated model was in TF Frozen format and needed to be converted to TFJS Graph format

Which means valid models are **tinyFaceDetector** and **mobileNetv1**  

Due to reduced code and changed build process, resulting bundle is about **2x smaller** than the original!  

## Weights

Pretrained models are includes in `./weights` and uplodaed using GIT LFS support.

## Build

Both `./build` and `./dist` folders are included by default, so no need for build during install.
However, if you want to rebuild use:

```shell
npm run build
```

Which will compile everything in `./src` into `./build` and create both standard and minified bundles as well as a sourcemap in `./dist`

## Documentation

For documentation refer to original project  
