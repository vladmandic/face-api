const fs = require('fs');
const path = require('path');
const process = require('process');
const log = require('@vladmandic/pilogger');
const canvas = require('canvas');

// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars, @typescript-eslint/no-unused-vars
const tf = require('@tensorflow/tfjs-node'); // in nodejs environments tfjs-node is required to be loaded before face-api
// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode

const modelPathRoot = '../model';
const imgPathRoot = './demo'; // modify to include your sample images
const minConfidence = 0.15;
const maxResults = 5;
let optionsSSDMobileNet;

async function image(input) {
  const img = await canvas.loadImage(input);
  const c = canvas.createCanvas(img.width, img.height);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  // const out = fs.createWriteStream('test.jpg');
  // const stream = c.createJPEGStream({ quality: 0.6, progressive: true, chromaSubsampling: true });
  // stream.pipe(out);
  return c;
}

async function detect(tensor) {
  const result = await faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors()
    .withAgeAndGender();
  return result;
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

  faceapi.env.monkeyPatch({ Canvas: canvas.Canvas, Image: canvas.Image, ImageData: canvas.ImageData });

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

  if (process.argv.length !== 3) {
    const t0 = process.hrtime.bigint();
    const dir = fs.readdirSync(imgPathRoot);
    let numImages = 0;
    for (const img of dir) {
      if (!img.toLocaleLowerCase().endsWith('.jpg')) continue;
      numImages += 1;
      const c = await image(path.join(imgPathRoot, img));
      const result = await detect(c);
      log.data('Image:', img, 'Detected faces:', result.length);
      for (const face of result) print(face);
    }
    const t1 = process.hrtime.bigint();
    log.info('Processed', numImages, 'images in', Math.trunc(Number((t1 - t0).toString()) / 1000 / 1000), 'ms');
  } else {
    const param = process.argv[2];
    if (fs.existsSync(param) || param.startsWith('http:') || param.startsWith('https:')) {
      const c = await image(param);
      const result = await detect(c);
      log.data('Image:', param, 'Detected faces:', result.length);
      for (const face of result) print(face);
    }
  }
}

main();
