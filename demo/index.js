import * as faceapi from '../dist/face-api.esm.js';

// configuration options
const modelPath = '../model/'; // path to model folder that will be loaded using http
// const modelPath = 'https://vladmandic.github.io/face-api/model/'; // path to model folder that will be loaded using http
const imgSize = 800; // maximum image size in pixels
const minScore = 0.3; // minimum score
const maxResults = 10; // maximum number of results to return
const samples = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg', 'sample5.jpg', 'sample6.jpg']; // sample images to be loaded using http

// helper function to pretty-print json object to string
const str = (json) => (json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '');

// helper function to print strings to html document as a log
function log(...txt) {
  // eslint-disable-next-line no-console
  console.log(...txt);
  const div = document.getElementById('log');
  if (div) div.innerHTML += `<br>${txt}`;
}

// helper function to draw detected faces
function faces(name, title, id, data) {
  // create canvas to draw on
  const img = document.getElementById(id);
  if (!img) return;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.left = `${img.offsetLeft}px`;
  canvas.style.top = `${img.offsetTop}px`;
  // @ts-ignore
  canvas.width = img.width;
  // @ts-ignore
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  // draw title
  ctx.font = '1rem sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(name, 2, 15);
  ctx.fillText(title, 2, 35);
  for (const person of data) {
    // draw box around each face
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'deepskyblue';
    ctx.fillStyle = 'deepskyblue';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.rect(person.detection.box.x, person.detection.box.y, person.detection.box.width, person.detection.box.height);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillText(`${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 18);
    ctx.fillText(`${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 2);
    // draw face points for each face
    ctx.fillStyle = 'lightblue';
    ctx.globalAlpha = 0.5;
    const pointSize = 2;
    for (const pt of person.landmarks.positions) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  // add canvas to document
  document.body.appendChild(canvas);
}

// helper function to draw processed image and its results
function print(title, img, data) {
  // eslint-disable-next-line no-console
  console.log('Results:', title, img, data);
  const el = new Image();
  el.id = Math.floor(Math.random() * 100000).toString();
  el.src = img;
  el.width = imgSize;
  el.onload = () => faces(img, title, el.id, data);
  document.body.appendChild(el);
}

// loads image and draws it on resized canvas so we alwys have correct image size regardless of source
async function image(url) {
  return new Promise((resolve) => {
    const img = new Image();
    // wait until image is actually loaded
    img.addEventListener('load', () => {
      // resize image so larger axis is not bigger than limit
      const ratio = 1.0 * img.height / img.width;
      img.width = ratio <= 1 ? imgSize : 1.0 * imgSize / ratio;
      img.height = ratio >= 1 ? imgSize : 1.0 * imgSize * ratio;
      // create canvas and draw loaded image
      const canvas = document.createElement('canvas');
      canvas.height = img.height;
      canvas.width = img.width;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0, img.width, img.height);
      // return generated canvas to be used by tfjs during detection
      resolve(canvas);
    });
    // load image
    img.src = url;
  });
}

async function main() {
  // initialize tfjs
  log('FaceAPI Test');

  const params = new URLSearchParams(location.search);
  if (params.has('backend')) {
    const backend = params.get('backend');
    await faceapi.tf.setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@3.13.0/dist/');
    log(`Chosen backend: ${backend}`);
    await faceapi.tf.setBackend(backend);
  } else {
    // default is webgl backend
    await faceapi.tf.setBackend('webgl');
  }

  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready();

  // check version
  log(`Version: FaceAPI ${str(faceapi?.version || '(not loaded)')} TensorFlow/JS ${str(faceapi?.tf?.version_core || '(not loaded)')} Backend: ${str(faceapi?.tf?.getBackend() || '(not loaded)')}`);
  log(`Flags: ${JSON.stringify(faceapi?.tf?.ENV.flags || { tf: 'not loaded' })}`);

  // load face-api models
  log('Loading FaceAPI models');
  await faceapi.nets.tinyFaceDetector.load(modelPath);
  await faceapi.nets.ssdMobilenetv1.load(modelPath);
  await faceapi.nets.ageGenderNet.load(modelPath);
  await faceapi.nets.faceLandmark68Net.load(modelPath);
  await faceapi.nets.faceRecognitionNet.load(modelPath);
  await faceapi.nets.faceExpressionNet.load(modelPath);
  const optionsTinyFace = new faceapi.TinyFaceDetectorOptions({ inputSize: imgSize, scoreThreshold: minScore });
  const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: minScore, maxResults });

  // check tf engine state
  const engine = await faceapi.tf.engine();
  log(`TF Engine State: ${str(engine.state)}`);

  // const testT = faceapi.tf.tensor([0]);
  // const testF = testT.toFloat();
  // console.log(testT.print(), testF.print());
  // testT.dispose();
  // testF.dispose();

  // loop through all images and try to process them
  log(`Start processing: ${samples.length} images ...<br>`);
  for (const img of samples) {
    // new line
    document.body.appendChild(document.createElement('br'));
    // load and resize image
    const canvas = await image(img);
    try {
      // actual model execution
      const dataTinyYolo = await faceapi
        // @ts-ignore
        .detectAllFaces(canvas, optionsTinyFace)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors()
        .withAgeAndGender();
      // print results to screen
      print('TinyFace:', img, dataTinyYolo);
      // actual model execution
      const dataSSDMobileNet = await faceapi
        .detectAllFaces(canvas, optionsSSDMobileNet)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors()
        .withAgeAndGender();
      // print results to screen
      print('SSDMobileNet:', img, dataSSDMobileNet);
    } catch (err) {
      log(`Image: ${img} Error during processing ${str(err)}`);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

// start processing as soon as page is loaded
window.onload = main;
