/**
 * FaceAPI demo that loads two images and finds similarity most prominant face in each image
 */

const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('../dist/face-api.node');

let optionsSSDMobileNet;

const getDescriptors = async (imageFile) => {
  const buffer = fs.readFileSync(imageFile);
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptors();
  tf.dispose(tensor);
  return faces.map((face) => face.descriptor);
};

const main = async (file1, file2) => {
  console.log('input images:', file1, file2); // eslint-disable-line no-console
  await tf.ready();
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('model');
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5, maxResults: 1 });
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('model');
  const desc1 = await getDescriptors(file1);
  const desc2 = await getDescriptors(file2);
  const distance = faceapi.euclideanDistance(desc1[0], desc2[0]); // only compare first found face in each image
  console.log('distance between most prominant detected faces:', distance); // eslint-disable-line no-console
  console.log('similarity between most prominant detected faces:', 1 - distance); // eslint-disable-line no-console
};

main('demo/sample1.jpg', 'demo/sample2.jpg');
