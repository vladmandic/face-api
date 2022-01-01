const fs = require('fs');
const path = require('path');
const log = require('@vladmandic/pilogger');

// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars, @typescript-eslint/no-unused-vars
const tf = require('@tensorflow/tfjs-node'); // in nodejs environments tfjs-node is required to be loaded before face-api
// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode

let optionsSSDMobileNet;
const minConfidence = 0.1;
const distanceThreshold = 0.5;
const modelPath = 'model';
const labeledFaceDescriptors = [];

async function initFaceAPI() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults: 1 });
}

async function getDescriptors(imageFile) {
  const buffer = fs.readFileSync(imageFile);
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors();
  tf.dispose(tensor);
  return faces.map((face) => face.descriptor);
}

async function registerImage(inputFile) {
  const descriptors = await getDescriptors(inputFile);
  for (const descriptor of descriptors) {
    const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(inputFile, [descriptor]);
    labeledFaceDescriptors.push(labeledFaceDescriptor);
  }
}

async function findBestMatch(inputFile) {
  const matcher = new faceapi.FaceMatcher(labeledFaceDescriptors, distanceThreshold);
  const descriptors = await getDescriptors(inputFile);
  const matches = [];
  for (const descriptor of descriptors) {
    const match = await matcher.findBestMatch(descriptor);
    matches.push(match);
  }
  return matches;
}

async function main() {
  log.header();
  if (process.argv.length !== 4) {
    log.error(process.argv[1], 'Expected <source image or folder> <target image>');
    process.exit(1);
  }
  await initFaceAPI();
  log.info('Input:', process.argv[2]);
  if (fs.statSync(process.argv[2]).isFile()) {
    await registerImage(process.argv[2]);
  } else if (fs.statSync(process.argv[2]).isDirectory()) {
    const dir = fs.readdirSync(process.argv[2]);
    for (const f of dir) await registerImage(path.join(process.argv[2], f));
  }
  log.info('Descriptors:', labeledFaceDescriptors.length);
  const bestMatch = await findBestMatch(process.argv[3]);
  log.data('Match:', bestMatch);
}

main();
