process.stderr.write = null; // silly hack to stock tfjs logging too much to stderr

const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('../dist/face-api.node.js');
// if you have module installed, this would be 
// const faceapi = require('@vladmandic/face-api');

// configuration options
const modelPathRoot = '../model/'; // path to model folder that will be loaded
const imgSize = 512; // maximum image size in pixels
const minScore = 0.1; // minimum score
const maxResults = 5; // maximum number of results to return
const samples = ['sample (1).jpg', 'sample (2).jpg', 'sample (3).jpg', 'sample (4).jpg', 'sample (5).jpg', 'sample (6).jpg']; // sample images to be loaded

// helper function to pretty-print json object to string
function str(json) {
  const text = json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
  return text;
}

// helper function to print strings to html document as a log
function log(...txt) {
  // eslint-disable-next-line no-console
  console.log(...txt);
}

async function image(img) {
  const buffer = fs.readFileSync(img);
  const decoded = tf.node.decodeImage(buffer);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function main() {
  // initialize tfjs
  log('FaceAPI Test');
  await faceapi.tf.setBackend('tensorflow'); //Sets the backend (cpu, webgl, wasm, tensorflow, etc) responsible for creating tensors and executing operations on those tensors.
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready(); //Returns a promise that resolves when the currently selected backend (or the highest priority one) has initialized.

  // check version
  log(`Version: TensorFlow/JS ${str(faceapi.tf?.version_core || '(not loaded)')} FaceAPI ${str(faceapi?.version || '(not loaded)')} Backend: ${str(faceapi.tf?.getBackend() || '(not loaded)')}`);
  log(`Flags: ${JSON.stringify(faceapi.tf.ENV.flags)}`);

  // load face-api models
  log('Loading FaceAPI models');
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: minScore, maxResults: maxResults });

  // check tf engine state
  const engine = await faceapi.tf.engine();
  log(`TF Engine State: ${str(engine.state)}`);

  const dir = fs.readdirSync(__dirname);
  for (const img of dir) {
    if (!img.toLocaleLowerCase().endsWith('.jpg')) continue;
    // load image
    const tensor = await image(path.join(__dirname, img));
    // actual model execution
    const result = await faceapi
      .detectAllFaces(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptors()
      .withAgeAndGender();
    log('Image:', img, 'Detected faces:', result.length);
    // you can access entire result object
    // console.log(result);
    tensor.dispose();
  }
}

main();
