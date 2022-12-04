/**
 * FaceAPI Demo for NodeJS using WASM
 * - Loads WASM binaries from external CDN
 * - Loads image
 * - Outputs results to console
 */

const fs = require('fs');
const image = require('@canvas/image'); // eslint-disable-line node/no-missing-require
const tf = require('@tensorflow/tfjs');
const wasm = require('@tensorflow/tfjs-backend-wasm');
const faceapi = require('../dist/face-api.node-wasm.js'); // use this when using face-api in dev mode

async function readImage(imageFile) {
  const buffer = fs.readFileSync(imageFile); // read image from disk
  const canvas = await image.imageFromBuffer(buffer); // decode to canvas
  const imageData = image.getImageData(canvas); // read decoded image data from canvas
  const tensor = tf.tidy(() => { // create tensor from image data
    const data = tf.tensor(Array.from(imageData?.data || []), [canvas.height, canvas.width, 4], 'int32'); // create rgba image tensor from flat array and flip to height x width
    const channels = tf.split(data, 4, 2); // split rgba to channels
    const rgb = tf.stack([channels[0], channels[1], channels[2]], 2); // stack channels back to rgb
    const squeeze = tf.squeeze(rgb); // move extra dim from the end of tensor and use it as batch number instead
    return squeeze;
  });
  console.log(`Image: ${imageFile} [${canvas.width} x ${canvas.height} Tensor: ${tensor.shape}, Size: ${tensor.size}`); // eslint-disable-line no-console
  return tensor;
}

async function main() {
  wasm.setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/', true);
  await tf.setBackend('wasm');
  await tf.ready();
  console.log(`Version: FaceAPI ${faceapi.version} TensorFlow/JS ${tf.version_core} Backend: ${faceapi.tf.getBackend()}`); // eslint-disable-line no-console
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('model'); // load models from a specific patch
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model');
  await faceapi.nets.ageGenderNet.loadFromDisk('model');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('model');
  await faceapi.nets.faceExpressionNet.loadFromDisk('model');
  const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.1, maxResults: 10 }); // set model options
  const tensor = await readImage('demo/sample1.jpg');
  const t0 = performance.now();
  const result = await faceapi.detectAllFaces(tensor, options) // run detection
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors()
    .withAgeAndGender();
  tf.dispose(tensor); // dispose tensors to avoid memory leaks
  const t1 = performance.now();
  console.log('Time', t1 - t0); // eslint-disable-line no-console
  console.log('Result', result); // eslint-disable-line no-console
}

main();
