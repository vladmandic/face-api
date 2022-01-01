const fs = require('fs');
const process = require('process');
const path = require('path');
const log = require('@vladmandic/pilogger');

// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars, @typescript-eslint/no-unused-vars
const tf = require('@tensorflow/tfjs-node'); // in nodejs environments tfjs-node is required to be loaded before face-api
// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode

const modelPathRoot = '../model';
const imgPathRoot = './demo'; // modify to include your sample images
const minConfidence = 0.15;
const maxResults = 5;
let optionsSSDMobileNet;
let fetch; // dynamically imported later

async function image(input) {
  // read input image file and create tensor to be used for processing
  let buffer;
  log.info('Loading image:', input);
  if (input.startsWith('http:') || input.startsWith('https:')) {
    const res = await fetch(input);
    if (res && res.ok) buffer = await res.buffer();
    else log.error('Invalid image URL:', input, res.status, res.statusText, res.headers.get('content-type'));
  } else {
    buffer = fs.readFileSync(input);
  }

  // decode image using tfjs-node so we don't need external depenencies
  // can also be done using canvas.js or some other 3rd party image library
  if (!buffer) return {};
  const tensor = tf.tidy(() => {
    const decode = faceapi.tf.node.decodeImage(buffer, 3);
    let expand;
    if (decode.shape[2] === 4) { // input is in rgba format, need to convert to rgb
      const channels = faceapi.tf.split(decode, 4, 2); // tf.split(tensor, 4, 2); // split rgba to channels
      const rgb = faceapi.tf.stack([channels[0], channels[1], channels[2]], 2); // stack channels back to rgb and ignore alpha
      expand = faceapi.tf.reshape(rgb, [1, decode.shape[0], decode.shape[1], 3]); // move extra dim from the end of tensor and use it as batch number instead
    } else {
      expand = faceapi.tf.expandDims(decode, 0);
    }
    const cast = faceapi.tf.cast(expand, 'float32');
    return cast;
  });
  return tensor;
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

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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

  fetch = (await import('node-fetch')).default;

  await faceapi.tf.setBackend('tensorflow');
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready();

  log.state(`Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${faceapi.version} Backend: ${faceapi.tf?.getBackend()}`);

  log.info('Loading FaceAPI models');
  const modelPath = path.join(__dirname, modelPathRoot);
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults });

  if (process.argv.length !== 4) {
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
    log.info('Processed', dir.length, 'images in', Math.trunc(Number((t1 - t0)) / 1000 / 1000), 'ms');
  } else {
    const param = process.argv[2];
    if (fs.existsSync(param) || param.startsWith('http:') || param.startsWith('https:')) {
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
