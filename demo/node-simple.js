const fs = require('fs');

// const faceapi = require('@vladmandic/face-api'); // use this when face-api is installed as module (majority of use cases)
const faceapi = require('../dist/face-api.node.js'); // use this when using face-api in dev mode

async function main() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('model'); // load models from a specific patch
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model');
  await faceapi.nets.ageGenderNet.loadFromDisk('model');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('model');
  await faceapi.nets.faceExpressionNet.loadFromDisk('model');
  const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.1, maxResults: 10 }); // set model options
  const buffer = fs.readFileSync('demo/sample1.jpg'); // load jpg image as binary
  const decodeT = faceapi.tf.node.decodeImage(buffer, 3); // decode binary buffer to rgb tensor
  const expandT = faceapi.tf.expandDims(decodeT, 0); // add batch dimension to tensor
  const result = await faceapi.detectAllFaces(expandT, options) // run detection
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors()
    .withAgeAndGender();
  faceapi.tf.dispose([decodeT, expandT]); // dispose tensors to avoid memory leaks
  // eslint-disable-next-line no-console
  console.log({ result }); // print results
}

main();
