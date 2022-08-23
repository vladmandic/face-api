/**
 * FaceAPI Demo for NodeJS
 * - Analyzes face descriptors from source (image file or folder containing multiple image files)
 * - Analyzes face descriptor from target
 * - Finds best match
 */

const fs = require('fs');
const path = require('path');
const log = require('@vladmandic/pilogger');
const tf = require('@tensorflow/tfjs-node'); // in nodejs environments tfjs-node is required to be loaded before face-api
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode
// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)

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
  if (!inputFile.toLowerCase().endsWith('jpg') && !inputFile.toLowerCase().endsWith('png') && !inputFile.toLowerCase().endsWith('gif')) return;
  log.data('Registered:', inputFile);
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
    await registerImage(process.argv[2]); // register image
  } else if (fs.statSync(process.argv[2]).isDirectory()) {
    const dir = fs.readdirSync(process.argv[2]);
    for (const f of dir) await registerImage(path.join(process.argv[2], f)); // register all images in a folder
  }
  log.info('Comparing:', process.argv[3], 'Descriptors:', labeledFaceDescriptors.length);
  if (labeledFaceDescriptors.length > 0) {
    const bestMatch = await findBestMatch(process.argv[3]); // find best match to all registered images
    log.data('Match:', bestMatch);
  } else {
    log.warn('No registered faces');
  }
}

main();
