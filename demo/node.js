// @ts-nocheck

const fs = require('fs');
const process = require('process');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const log = require('@vladmandic/pilogger');
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('../dist/face-api.node.js'); // this is equivalent to '@vladmandic/faceapi'

const modelPathRoot = '../model';
const imgPathRoot = './demo'; // modify to include your sample images
const minConfidence = 0.15;
const maxResults = 5;
let optionsSSDMobileNet;

async function image(img) {
  const buffer = fs.readFileSync(img);
  const decoded = tf.node.decodeImage(buffer);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function detect(tensor) {
  try {
    const result = await faceapi
      .detectAllFaces(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptors()
      .withAgeAndGender();
    return result;
  } catch (err) {
    log.error('Caught error', err.message);
    return [];
  }
}

// eslint-disable-next-line no-unused-vars
function detectPromise(tensor) {
  return new Promise((resolve) => faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors()
    .withAgeAndGender()
    .then((res) => resolve(res))
    .catch((err) => {
      log.error('Caught error', err.message);
      resolve([]);
    }));
}

function print(face) {
  const expression = Object.entries(face.expressions).reduce((acc, val) => ((val[1] > acc[1]) ? val : acc), ['', 0]);
  const box = [face.alignedRect._box._x, face.alignedRect._box._y, face.alignedRect._box._width, face.alignedRect._box._height];
  const gender = `Gender: ${Math.round(100 * face.genderProbability)}% ${face.gender}`;
  log.data(`Detection confidence: ${Math.round(100 * face.detection._score)}% ${gender} Age: ${Math.round(10 * face.age) / 10} Expression: ${Math.round(100 * expression[1])}% ${expression[0]} Box: ${box.map((a) => Math.round(a))}`);
}

async function main() {
  log.header();
  log.info('FaceAPI single-process test');

  await faceapi.tf.setBackend('tensorflow');
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready();

  log.state(`Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${faceapi.version.faceapi} Backend: ${faceapi.tf?.getBackend()}`);

  log.info('Loading FaceAPI models');
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults });

  if (process.argv.length !== 3) {
    const t0 = process.hrtime.bigint();
    const dir = fs.readdirSync(imgPathRoot);
    for (const img of dir) {
      if (!img.toLocaleLowerCase().endsWith('.jpg')) continue;
      const tensor = await image(path.join(imgPathRoot, img));
      const result = await detect(tensor);
      log.data('Image:', img, 'Detected faces:', result.length);
      for (const face of result) print(face);
      tensor.dispose();
    }
    const t1 = process.hrtime.bigint();
    log.info('Processed', dir.length, 'images in', Math.trunc(parseInt(t1 - t0) / 1000 / 1000), 'ms');
  } else {
    const param = process.argv[2];
    if (fs.existsSync(param)) {
      const tensor = await image(param);
      const result = await detect(tensor);
      // const result = await detectPromise(null);
      log.data('Image:', param, 'Detected faces:', result.length);
      for (const face of result) print(face);
      tensor.dispose();
    }
  }
}

main();
