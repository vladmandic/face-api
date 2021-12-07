import * as faceapi from '../dist/face-api.esm.js';

// configuration options
const modelPath = '../model/'; // path to model folder that will be loaded using http
// const modelPath = 'https://vladmandic.github.io/face-api/model/'; // path to model folder that will be loaded using http
const minScore = 0.2; // minimum score
const maxResults = 5; // maximum number of results to return
let optionsSSDMobileNet;

// helper function to pretty-print json object to string
function str(json) {
  let text = '<font color="lightblue">';
  text += json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
  text += '</font>';
  return text;
}

// helper function to print strings to html document as a log
function log(...txt) {
  // eslint-disable-next-line no-console
  console.log(...txt);
  const div = document.getElementById('log');
  if (div) div.innerHTML += `<br>${txt}`;
}

// helper function to draw detected faces
function drawFaces(canvas, data, fps) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw title
  ctx.font = 'small-caps 20px "Segoe UI"';
  ctx.fillStyle = 'white';
  ctx.fillText(`FPS: ${fps}`, 10, 25);
  for (const person of data) {
    // draw box around each face
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'deepskyblue';
    ctx.fillStyle = 'deepskyblue';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(person.detection.box.x, person.detection.box.y, person.detection.box.width, person.detection.box.height);
    ctx.stroke();
    ctx.globalAlpha = 1;
    // const expression = person.expressions.sort((a, b) => Object.values(a)[0] - Object.values(b)[0]);
    const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
    ctx.fillStyle = 'black';
    ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 59);
    ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 41);
    ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 23);
    ctx.fillText(`roll:${person.angle.roll.toFixed(3)} pitch:${person.angle.pitch.toFixed(3)} yaw:${person.angle.yaw.toFixed(3)}`, person.detection.box.x, person.detection.box.y - 5);
    ctx.fillStyle = 'lightblue';
    ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 60);
    ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 42);
    ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 24);
    ctx.fillText(`roll:${person.angle.roll.toFixed(3)} pitch:${person.angle.pitch.toFixed(3)} yaw:${person.angle.yaw.toFixed(3)}`, person.detection.box.x, person.detection.box.y - 6);
    // draw face points for each face
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'lightblue';
    const pointSize = 2;
    for (let i = 0; i < person.landmarks.positions.length; i++) {
      ctx.beginPath();
      ctx.arc(person.landmarks.positions[i].x, person.landmarks.positions[i].y, pointSize, 0, 2 * Math.PI);
      // ctx.fillText(`${i}`, person.landmarks.positions[i].x + 4, person.landmarks.positions[i].y + 4);
      ctx.fill();
    }
  }
}

async function detectVideo(video, canvas) {
  if (!video || video.paused) return false;
  const t0 = performance.now();
  faceapi
    .detectAllFaces(video, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    // .withFaceDescriptors()
    .withAgeAndGender()
    .then((result) => {
      const fps = 1000 / (performance.now() - t0);
      drawFaces(canvas, result, fps.toLocaleString());
      requestAnimationFrame(() => detectVideo(video, canvas));
      return true;
    })
    .catch((err) => {
      log(`Detect Error: ${str(err)}`);
      return false;
    });
  return false;
}

// just initialize everything and call main function
async function setupCamera() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  if (!video || !canvas) return null;

  let msg = '';
  log('Setting up camera');
  // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
  if (!navigator.mediaDevices) {
    log('Camera Error: access not supported');
    return null;
  }
  let stream;
  const constraints = {
    audio: false,
    video: { facingMode: 'user', resizeMode: 'crop-and-scale' },
  };
  if (window.innerWidth > window.innerHeight) constraints.video.width = { ideal: window.innerWidth };
  else constraints.video.height = { ideal: window.innerHeight };
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') msg = 'camera permission denied';
    else if (err.name === 'SourceUnavailableError') msg = 'camera not available';
    log(`Camera Error: ${msg}: ${err.message || err}`);
    return null;
  }
  // @ts-ignore
  if (stream) video.srcObject = stream;
  else {
    log('Camera Error: stream empty');
    return null;
  }
  const track = stream.getVideoTracks()[0];
  const settings = track.getSettings();
  if (settings.deviceId) delete settings.deviceId;
  if (settings.groupId) delete settings.groupId;
  if (settings.aspectRatio) settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;
  log(`Camera active: ${track.label}`); // ${str(constraints)}
  log(`Camera settings: ${str(settings)}`);
  canvas.addEventListener('click', () => {
    // @ts-ignore
    if (video && video.readyState >= 2) {
      // @ts-ignore
      if (video.paused) {
        // @ts-ignore
        video.play();
        detectVideo(video, canvas);
      } else {
        // @ts-ignore
        video.pause();
      }
    }
    // @ts-ignore
    log(`Camera state: ${video.paused ? 'paused' : 'playing'}`);
  });
  return new Promise((resolve) => {
    video.onloadeddata = async () => {
      // @ts-ignore
      canvas.width = video.videoWidth;
      // @ts-ignore
      canvas.height = video.videoHeight;
      // @ts-ignore
      video.play();
      detectVideo(video, canvas);
      resolve(true);
    };
  });
}

async function setupFaceAPI() {
  // load face-api models
  // log('Models loading');
  // await faceapi.nets.tinyFaceDetector.load(modelPath); // using ssdMobilenetv1
  await faceapi.nets.ssdMobilenetv1.load(modelPath);
  await faceapi.nets.ageGenderNet.load(modelPath);
  await faceapi.nets.faceLandmark68Net.load(modelPath);
  await faceapi.nets.faceRecognitionNet.load(modelPath);
  await faceapi.nets.faceExpressionNet.load(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: minScore, maxResults });

  // check tf engine state
  log(`Models loaded: ${str(faceapi.tf.engine().state.numTensors)} tensors`);
}

async function main() {
  // initialize tfjs
  log('FaceAPI WebCam Test');

  // if you want to use wasm backend location for wasm binaries must be specified
  // await faceapi.tf.setWasmPaths('../node_modules/@tensorflow/tfjs-backend-wasm/dist/');
  // await faceapi.tf.setBackend('wasm');

  // default is webgl backend
  await faceapi.tf.setBackend('webgl');

  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set('DEBUG', false);
  await faceapi.tf.ready();

  // check version
  log(`Version: FaceAPI ${str(faceapi?.version || '(not loaded)')} TensorFlow/JS ${str(faceapi?.tf?.version_core || '(not loaded)')} Backend: ${str(faceapi?.tf?.getBackend() || '(not loaded)')}`);
  // log(`Flags: ${JSON.stringify(faceapi?.tf?.ENV.flags || { tf: 'not loaded' })}`);

  await setupFaceAPI();
  await setupCamera();
}

// start processing as soon as page is loaded
window.onload = main;
