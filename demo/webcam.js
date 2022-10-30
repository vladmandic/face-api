/**
 * FaceAPI Demo for Browsers
 * Loaded via `webcam.html`
 */

import * as faceapi from '../dist/face-api.esm.js'; // use when in dev mode
// import * as faceapi from '@vladmandic/face-api'; // use when downloading face-api as npm

// configuration options
const modelPath = '../model/'; // path to model folder that will be loaded using http
// const modelPath = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/'; // path to model folder that will be loaded using http
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
  console.log(...txt); // eslint-disable-line no-console
  const div = document.getElementById('log');
  if (div) div.innerHTML += `<br>${txt}`;
}



// helper function to draw detected faces
function drawFaces(canvas, data, fps) {
  console.log(data);
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
    // draw text labels
    const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
    ctx.fillStyle = 'black';
    ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 59);
    ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 41);
    ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 23);
    ctx.fillText(`roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`, person.detection.box.x, person.detection.box.y - 5);
    ctx.fillStyle = 'lightblue';
    ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 60);
    ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 42);
    ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 24);
    ctx.fillText(`roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`, person.detection.box.x, person.detection.box.y - 6);
    // draw person's name - M.S. 30/10/2022 
    ctx.fillText(`${person.label}`, person.landmarks.positions[person.landmarks.positions.length - 1].x, person.landmarks.positions[person.landmarks.positions.length - 1].y + 95);
    // draw face points for each face
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'red';
    const pointSize = 2;
    for (let i = 0; i < person.landmarks.positions.length; i++) {
      ctx.beginPath();
      ctx.arc(person.landmarks.positions[i].x, person.landmarks.positions[i].y, pointSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}



const labels = ['Matan', 'Yehuda', 'Yoni_Open'];

/**
 * 
 * @param {*} labels names of people that their photos exists 
 * @returns encoding version of photos of the given labels array
 */
async function getLabelFaceDescriptions(labels = ['Matan', 'Yehuda', 'Yoni_Open']) {
  return await Promise.all(
    labels.map(async label => {
      // fetch image data from urls and convert blob to HTMLImage element
      const imgUrl = `${label}.jpg`
      const img = await faceapi.fetchImage(imgUrl)

      // detect the face with the highest score in the image and compute it's landmarks and face descriptor
      const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

      if (!fullFaceDescription) {
        throw new Error(`no faces detected for ${label}`)
      }

      const faceDescriptors = [fullFaceDescription.descriptor]
      return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
    })
  )
}


async function detectVideo(video, canvas, facesLables) {
  if (!video || video.paused) return false;
  const t0 = performance.now();


  const fullFaceDescriptions = faceapi
    .detectAllFaces(video, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender().withFaceDescriptors();

  console.log(fullFaceDescriptions);

  fullFaceDescriptions.then(async result => {
    console.log(result);
    // log(fullFaceDescriptions); // TODO function to write entering person table per one

    try {
      // const fps = 1000 / (performance.now() - t0);
      // 0.6 is a good distance threshold value to judge
      // whether the descriptors match or not
      const maxDescriptorDistance = 0.6;
      const faceMatcher = new faceapi.FaceMatcher(facesLables, maxDescriptorDistance);
      const recognitionResults = (await result).map(fd => faceMatcher.findBestMatch(fd.descriptor));


      recognitionResults.forEach((bestMatch, i) => {
        const text = bestMatch.toString();
        // log(fullFaceDescriptions); // TODO function to write entering person table per one
        console.log(text);
        const fps = 1000 / (performance.now() - t0);
        result[i]['label'] = text; // attached label to recognized person
        drawFaces(canvas, result, fps.toLocaleString());
        requestAnimationFrame(() => detectVideo(video, canvas, facesLables));

        return true;
      });
    } catch (error) {
      log(`Detect Error: ${str(error)}`);
      console.error(error);
      return false;
    }
  })
}

// just initialize everything and call main function
async function setupCamera(facesLables) {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  if (!video || !canvas) return null;

  log('Setting up camera');
  // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
  if (!navigator.mediaDevices) {
    log('Camera Error: access not supported');
    return null;
  }
  let stream;
  const constraints = { audio: false, video: { facingMode: 'user', resizeMode: 'crop-and-scale' } };
  if (window.innerWidth > window.innerHeight) constraints.video.width = { ideal: window.innerWidth };
  else constraints.video.height = { ideal: window.innerHeight };
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') log(`Camera Error: camera permission denied: ${err.message || err}`);
    if (err.name === 'SourceUnavailableError') log(`Camera Error: camera not available: ${err.message || err}`);
    return null;
  }
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
  log(`Camera active: ${track.label}`);
  log(`Camera settings: ${str(settings)}`);
  canvas.addEventListener('click', () => {
    if (video && video.readyState >= 2) {
      if (video.paused) {
        video.play();
        detectVideo(video, canvas, facesLables);
      } else {
        video.pause();
      }
    }
    log(`Camera state: ${video.paused ? 'paused' : 'playing'}`);
  });
  return new Promise((resolve) => {
    video.onloadeddata = async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play();
      detectVideo(video, canvas, facesLables);
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
  // await faceapi.tf.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${faceapi.tf.version_core}/dist/`);
  // await faceapi.tf.setBackend('wasm');

  // default is webgl backend
  await faceapi.tf.setBackend('webgl'); //TODO check webgl in tensorflow
  await faceapi.tf.ready();
  await setupFaceAPI();
  let facesLables = await getLabelFaceDescriptions(labels);

  // check version
  log(`Version: FaceAPI ${str(faceapi?.version || '(not loaded)')} TensorFlow/JS ${str(faceapi?.tf?.version_core || '(not loaded)')} Backend: ${str(faceapi?.tf?.getBackend() || '(not loaded)')}`);

  await setupCamera(facesLables);

}

// start processing as soon as page is loaded
window.onload = main;
