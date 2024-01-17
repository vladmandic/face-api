/*
  Face-API
  homepage: <https://github.com/vladmandic/face-api>
  author: <https://github.com/vladmandic>'
*/


// node_modules/.pnpm/@tensorflow+tfjs-core@4.16.0/node_modules/@tensorflow/tfjs-core/package.json
var version = "4.16.0";

// node_modules/.pnpm/@tensorflow+tfjs-converter@4.16.0_@tensorflow+tfjs-core@4.16.0/node_modules/@tensorflow/tfjs-converter/package.json
var version2 = "4.16.0";

// node_modules/.pnpm/@tensorflow+tfjs-backend-cpu@4.16.0_@tensorflow+tfjs-core@4.16.0/node_modules/@tensorflow/tfjs-backend-cpu/package.json
var version3 = "4.16.0";

// node_modules/.pnpm/@tensorflow+tfjs-backend-webgl@4.16.0_@tensorflow+tfjs-core@4.16.0/node_modules/@tensorflow/tfjs-backend-webgl/package.json
var version4 = "4.16.0";

// node_modules/.pnpm/@tensorflow+tfjs-backend-wasm@4.16.0_@tensorflow+tfjs-core@4.16.0/node_modules/@tensorflow/tfjs-backend-wasm/package.json
var version5 = "4.16.0";

// src/tfjs/tf-version.ts
var version6 = {
  // tfjs: tfjsVersion,
  tfjs: version,
  "tfjs-core": version,
  // 'tfjs-data': tfjsDataVersion,
  // 'tfjs-layers': tfjsLayersVersion,
  "tfjs-converter": version2,
  "tfjs-backend-cpu": version3,
  "tfjs-backend-webgl": version4,
  "tfjs-backend-wasm": version5
};
export {
  version6 as version
};
