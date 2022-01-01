// @ts-nocheck

const fs = require('fs');
const path = require('path');
const log = require('@vladmandic/pilogger');

// workers actual import tfjs and faceapi modules
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars, @typescript-eslint/no-unused-vars
const tf = require('@tensorflow/tfjs-node'); // in nodejs environments tfjs-node is required to be loaded before face-api
// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode

// options used by faceapi
const modelPathRoot = '../model';
const minConfidence = 0.15;
const maxResults = 5;
let optionsSSDMobileNet;

// read image from a file and create tensor to be used by faceapi
// this way we don't need any monkey patches
// you can add any pre-proocessing here such as resizing, etc.
async function image(img) {
  const buffer = fs.readFileSync(img);
  const tensor = tf.tidy(() => tf.node.decodeImage(buffer).toFloat().expandDims());
  return tensor;
}

// actual faceapi detection
async function detect(img) {
  const tensor = await image(img);
  const result = await faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks();
    // .withFaceExpressions()
    // .withFaceDescriptors()
    // .withAgeAndGender();
  process.send({ image: img, detected: result }); // send results back to main
  process.send({ ready: true }); // send signal back to main that this worker is now idle and ready for next image
  tensor.dispose();
}

async function main() {
  // on worker start first initialize message handler so we don't miss any messages
  process.on('message', (msg) => {
    if (msg.exit) process.exit(); // if main told worker to exit
    if (msg.test) process.send({ test: true });
    if (msg.image) detect(msg.image); // if main told worker to process image
    log.data('Worker received message:', process.pid, msg); // generic log
  });

  // then initialize tfjs
  await faceapi.tf.setBackend('tensorflow');
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready();
  log.state('Worker: PID:', process.pid, `TensorFlow/JS ${faceapi.tf.version_core} FaceAPI ${faceapi.version} Backend: ${faceapi.tf.getBackend()}`);

  // and load and initialize facepi models
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults });

  // now we're ready, so send message back to main that it knows it can use this worker
  process.send({ ready: true });
}

main();
