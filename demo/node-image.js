const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const image = require('@canvas/image'); // @canvas/image can decode jpeg, png, webp
const faceapi = require('../dist/face-api.node.js'); // this is equivalent to '@vladmandic/faceapi'

const modelPath = 'model/';
const imageFile = 'demo/sample1.jpg';
const ssdOptions = { minConfidence: 0.1, maxResults: 10 };

async function main() {
  const buffer = fs.readFileSync(imageFile); // read image from disk
  const canvas = await image.imageFromBuffer(buffer); // decode to canvas
  const imageData = image.getImageData(canvas); // read decoded image data from canvas
  console.log('image:', imageFile, canvas.width, canvas.height);

  const tensor = tf.tidy(() => { // create tensor from image data
    const data = tf.tensor(Array.from(imageData.data), [canvas.height, canvas.width, 4], 'int32'); // create rgba image tensor from flat array and flip to height x width
    const channels = tf.split(data, 4, 2); // split rgba to channels
    const rgb = tf.stack([channels[0], channels[1], channels[2]], 2); // stack channels back to rgb
    const reshape = tf.reshape(rgb, [1, canvas.height, canvas.width, 3]); // move extra dim from the end of tensor and use it as batch number instead
    return reshape;
  });
  console.log('tensor:', tensor.shape, tensor.size);

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath); // load basic model only
  const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options(ssdOptions); // create options object
  const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet); // run detection
  console.log('results:', result);
}

main();
