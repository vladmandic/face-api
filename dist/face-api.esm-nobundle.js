/*
  Face-API
  homepage: <https://github.com/vladmandic/face-api>
  author: <https://github.com/vladmandic>'
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};

// dist/tfjs.esm.js
var tfjs_esm_exports = {};
__export(tfjs_esm_exports, {
  version: () => version9
});
__reExport(tfjs_esm_exports, dist_star);
__reExport(tfjs_esm_exports, dist_star2);
__reExport(tfjs_esm_exports, dist_star3);
import * as dist_star from "@tensorflow/tfjs/dist/index.js";
import * as dist_star2 from "@tensorflow/tfjs-backend-webgl/dist/index.js";
import * as dist_star3 from "@tensorflow/tfjs-backend-wasm/dist/index.js";
var version = "3.13.0";
var version2 = "3.13.0";
var version3 = "3.13.0";
var version4 = "3.13.0";
var version5 = "3.13.0";
var version6 = "3.13.0";
var version7 = "3.13.0";
var version8 = "3.13.0";
var version9 = {
  tfjs: version,
  "tfjs-core": version2,
  "tfjs-data": version3,
  "tfjs-layers": version4,
  "tfjs-converter": version5,
  "tfjs-backend-cpu": version6,
  "tfjs-backend-webgl": version7,
  "tfjs-backend-wasm": version8
};

// src/draw/index.ts
var draw_exports = {};
__export(draw_exports, {
  AnchorPosition: () => AnchorPosition,
  DrawBox: () => DrawBox,
  DrawBoxOptions: () => DrawBoxOptions,
  DrawFaceLandmarks: () => DrawFaceLandmarks,
  DrawFaceLandmarksOptions: () => DrawFaceLandmarksOptions,
  DrawTextField: () => DrawTextField,
  DrawTextFieldOptions: () => DrawTextFieldOptions,
  drawContour: () => drawContour,
  drawDetections: () => drawDetections,
  drawFaceExpressions: () => drawFaceExpressions,
  drawFaceLandmarks: () => drawFaceLandmarks
});

// src/draw/drawContour.ts
function drawContour(ctx, points, isClosed = false) {
  ctx.beginPath();
  points.slice(1).forEach(({ x, y }, prevIdx) => {
    const from = points[prevIdx];
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
  });
  if (isClosed) {
    const from = points[points.length - 1];
    const to = points[0];
    if (!from || !to) {
      return;
    }
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
  }
  ctx.stroke();
}

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  computeReshapedDimensions: () => computeReshapedDimensions,
  getCenterPoint: () => getCenterPoint,
  isDimensions: () => isDimensions,
  isEven: () => isEven,
  isFloat: () => isFloat,
  isTensor: () => isTensor,
  isTensor1D: () => isTensor1D,
  isTensor2D: () => isTensor2D,
  isTensor3D: () => isTensor3D,
  isTensor4D: () => isTensor4D,
  isValidNumber: () => isValidNumber,
  isValidProbablitiy: () => isValidProbablitiy,
  range: () => range,
  round: () => round
});

// src/classes/Dimensions.ts
var Dimensions = class {
  constructor(width, height) {
    if (!isValidNumber(width) || !isValidNumber(height)) {
      throw new Error(`Dimensions.constructor - expected width and height to be valid numbers, instead have ${JSON.stringify({ width, height })}`);
    }
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  reverse() {
    return new Dimensions(1 / this.width, 1 / this.height);
  }
};

// src/utils/index.ts
function isTensor(tensor2, dim) {
  return tensor2 instanceof tfjs_esm_exports.Tensor && tensor2.shape.length === dim;
}
function isTensor1D(tensor2) {
  return isTensor(tensor2, 1);
}
function isTensor2D(tensor2) {
  return isTensor(tensor2, 2);
}
function isTensor3D(tensor2) {
  return isTensor(tensor2, 3);
}
function isTensor4D(tensor2) {
  return isTensor(tensor2, 4);
}
function isFloat(num) {
  return num % 1 !== 0;
}
function isEven(num) {
  return num % 2 === 0;
}
function round(num, prec = 2) {
  const f = 10 ** prec;
  return Math.floor(num * f) / f;
}
function isDimensions(obj) {
  return obj && obj.width && obj.height;
}
function computeReshapedDimensions({ width, height }, inputSize) {
  const scale2 = inputSize / Math.max(height, width);
  return new Dimensions(Math.round(width * scale2), Math.round(height * scale2));
}
function getCenterPoint(pts) {
  return pts.reduce((sum, pt) => sum.add(pt), new Point(0, 0)).div(new Point(pts.length, pts.length));
}
function range(num, start, step) {
  return Array(num).fill(0).map((_, i) => start + i * step);
}
function isValidNumber(num) {
  return !!num && num !== Infinity && num !== -Infinity && !Number.isNaN(num) || num === 0;
}
function isValidProbablitiy(num) {
  return isValidNumber(num) && num >= 0 && num <= 1;
}

// src/classes/Point.ts
var Point = class {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  add(pt) {
    return new Point(this.x + pt.x, this.y + pt.y);
  }
  sub(pt) {
    return new Point(this.x - pt.x, this.y - pt.y);
  }
  mul(pt) {
    return new Point(this.x * pt.x, this.y * pt.y);
  }
  div(pt) {
    return new Point(this.x / pt.x, this.y / pt.y);
  }
  abs() {
    return new Point(Math.abs(this.x), Math.abs(this.y));
  }
  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  floor() {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }
};

// src/classes/Box.ts
var Box = class {
  static isRect(rect) {
    return !!rect && [rect.x, rect.y, rect.width, rect.height].every(isValidNumber);
  }
  static assertIsValidBox(box, callee, allowNegativeDimensions = false) {
    if (!Box.isRect(box)) {
      throw new Error(`${callee} - invalid box: ${JSON.stringify(box)}, expected object with properties x, y, width, height`);
    }
    if (!allowNegativeDimensions && (box.width < 0 || box.height < 0)) {
      throw new Error(`${callee} - width (${box.width}) and height (${box.height}) must be positive numbers`);
    }
  }
  constructor(_box, allowNegativeDimensions = true) {
    const box = _box || {};
    const isBbox = [box.left, box.top, box.right, box.bottom].every(isValidNumber);
    const isRect = [box.x, box.y, box.width, box.height].every(isValidNumber);
    if (!isRect && !isBbox) {
      throw new Error(`Box.constructor - expected box to be IBoundingBox | IRect, instead have ${JSON.stringify(box)}`);
    }
    const [x, y, width, height] = isRect ? [box.x, box.y, box.width, box.height] : [box.left, box.top, box.right - box.left, box.bottom - box.top];
    Box.assertIsValidBox({
      x,
      y,
      width,
      height
    }, "Box.constructor", allowNegativeDimensions);
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get left() {
    return this.x;
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.width;
  }
  get bottom() {
    return this.y + this.height;
  }
  get area() {
    return this.width * this.height;
  }
  get topLeft() {
    return new Point(this.left, this.top);
  }
  get topRight() {
    return new Point(this.right, this.top);
  }
  get bottomLeft() {
    return new Point(this.left, this.bottom);
  }
  get bottomRight() {
    return new Point(this.right, this.bottom);
  }
  round() {
    const [x, y, width, height] = [this.x, this.y, this.width, this.height].map((val) => Math.round(val));
    return new Box({
      x,
      y,
      width,
      height
    });
  }
  floor() {
    const [x, y, width, height] = [this.x, this.y, this.width, this.height].map((val) => Math.floor(val));
    return new Box({
      x,
      y,
      width,
      height
    });
  }
  toSquare() {
    let {
      x,
      y,
      width,
      height
    } = this;
    const diff = Math.abs(width - height);
    if (width < height) {
      x -= diff / 2;
      width += diff;
    }
    if (height < width) {
      y -= diff / 2;
      height += diff;
    }
    return new Box({ x, y, width, height });
  }
  rescale(s) {
    const scaleX = isDimensions(s) ? s.width : s;
    const scaleY = isDimensions(s) ? s.height : s;
    return new Box({
      x: this.x * scaleX,
      y: this.y * scaleY,
      width: this.width * scaleX,
      height: this.height * scaleY
    });
  }
  pad(padX, padY) {
    const [x, y, width, height] = [
      this.x - padX / 2,
      this.y - padY / 2,
      this.width + padX,
      this.height + padY
    ];
    return new Box({
      x,
      y,
      width,
      height
    });
  }
  clipAtImageBorders(imgWidth, imgHeight) {
    const { x, y, right, bottom } = this;
    const clippedX = Math.max(x, 0);
    const clippedY = Math.max(y, 0);
    const newWidth = right - clippedX;
    const newHeight = bottom - clippedY;
    const clippedWidth = Math.min(newWidth, imgWidth - clippedX);
    const clippedHeight = Math.min(newHeight, imgHeight - clippedY);
    return new Box({
      x: clippedX,
      y: clippedY,
      width: clippedWidth,
      height: clippedHeight
    }).floor();
  }
  shift(sx, sy) {
    const { width, height } = this;
    const x = this.x + sx;
    const y = this.y + sy;
    return new Box({
      x,
      y,
      width,
      height
    });
  }
  padAtBorders(imageHeight, imageWidth) {
    const w = this.width + 1;
    const h = this.height + 1;
    const dx = 1;
    const dy = 1;
    let edx = w;
    let edy = h;
    let x = this.left;
    let y = this.top;
    let ex = this.right;
    let ey = this.bottom;
    if (ex > imageWidth) {
      edx = -ex + imageWidth + w;
      ex = imageWidth;
    }
    if (ey > imageHeight) {
      edy = -ey + imageHeight + h;
      ey = imageHeight;
    }
    if (x < 1) {
      edy = 2 - x;
      x = 1;
    }
    if (y < 1) {
      edy = 2 - y;
      y = 1;
    }
    return {
      dy,
      edy,
      dx,
      edx,
      y,
      ey,
      x,
      ex,
      w,
      h
    };
  }
  calibrate(region) {
    return new Box({
      left: this.left + region.left * this.width,
      top: this.top + region.top * this.height,
      right: this.right + region.right * this.width,
      bottom: this.bottom + region.bottom * this.height
    }).toSquare().round();
  }
};

// src/classes/BoundingBox.ts
var BoundingBox = class extends Box {
  constructor(left, top, right, bottom, allowNegativeDimensions = false) {
    super({ left, top, right, bottom }, allowNegativeDimensions);
  }
};

// src/classes/ObjectDetection.ts
var ObjectDetection = class {
  constructor(score, classScore, className, relativeBox, imageDims) {
    this._imageDims = new Dimensions(imageDims.width, imageDims.height);
    this._score = score;
    this._classScore = classScore;
    this._className = className;
    this._box = new Box(relativeBox).rescale(this._imageDims);
  }
  get score() {
    return this._score;
  }
  get classScore() {
    return this._classScore;
  }
  get className() {
    return this._className;
  }
  get box() {
    return this._box;
  }
  get imageDims() {
    return this._imageDims;
  }
  get imageWidth() {
    return this.imageDims.width;
  }
  get imageHeight() {
    return this.imageDims.height;
  }
  get relativeBox() {
    return new Box(this._box).rescale(this.imageDims.reverse());
  }
  forSize(width, height) {
    return new ObjectDetection(this.score, this.classScore, this.className, this.relativeBox, { width, height });
  }
};

// src/classes/FaceDetection.ts
var FaceDetection = class extends ObjectDetection {
  constructor(score, relativeBox, imageDims) {
    super(score, score, "", relativeBox, imageDims);
  }
  forSize(width, height) {
    const { score, relativeBox, imageDims } = super.forSize(width, height);
    return new FaceDetection(score, relativeBox, imageDims);
  }
};

// src/ops/iou.ts
function iou(box1, box2, isIOU = true) {
  const width = Math.max(0, Math.min(box1.right, box2.right) - Math.max(box1.left, box2.left));
  const height = Math.max(0, Math.min(box1.bottom, box2.bottom) - Math.max(box1.top, box2.top));
  const interSection = width * height;
  return isIOU ? interSection / (box1.area + box2.area - interSection) : interSection / Math.min(box1.area, box2.area);
}

// src/ops/minBbox.ts
function minBbox(pts) {
  const xs = pts.map((pt) => pt.x);
  const ys = pts.map((pt) => pt.y);
  const minX = xs.reduce((min, x) => x < min ? x : min, Infinity);
  const minY = ys.reduce((min, y) => y < min ? y : min, Infinity);
  const maxX = xs.reduce((max, x) => max < x ? x : max, 0);
  const maxY = ys.reduce((max, y) => max < y ? y : max, 0);
  return new BoundingBox(minX, minY, maxX, maxY);
}

// src/ops/nonMaxSuppression.ts
function nonMaxSuppression(boxes, scores, iouThreshold, isIOU = true) {
  let indicesSortedByScore = scores.map((score, boxIndex) => ({ score, boxIndex })).sort((c1, c2) => c1.score - c2.score).map((c) => c.boxIndex);
  const pick = [];
  while (indicesSortedByScore.length > 0) {
    const curr = indicesSortedByScore.pop();
    pick.push(curr);
    const indices = indicesSortedByScore;
    const outputs = [];
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const currBox = boxes[curr];
      const idxBox = boxes[idx];
      outputs.push(iou(currBox, idxBox, isIOU));
    }
    indicesSortedByScore = indicesSortedByScore.filter((_, j) => outputs[j] <= iouThreshold);
  }
  return pick;
}

// src/ops/normalize.ts
function normalize(x, meanRgb) {
  return tfjs_esm_exports.tidy(() => {
    const [r, g, b] = meanRgb;
    const avg_r = tfjs_esm_exports.fill([...x.shape.slice(0, 3), 1], r, "float32");
    const avg_g = tfjs_esm_exports.fill([...x.shape.slice(0, 3), 1], g, "float32");
    const avg_b = tfjs_esm_exports.fill([...x.shape.slice(0, 3), 1], b, "float32");
    const avg_rgb = tfjs_esm_exports.concat([avg_r, avg_g, avg_b], 3);
    return tfjs_esm_exports.sub(x, avg_rgb);
  });
}

// src/ops/padToSquare.ts
function padToSquare(imgTensor, isCenterImage = false) {
  return tfjs_esm_exports.tidy(() => {
    const [height, width] = imgTensor.shape.slice(1);
    if (height === width)
      return imgTensor;
    const dimDiff = Math.abs(height - width);
    const paddingAmount = Math.round(dimDiff * (isCenterImage ? 0.5 : 1));
    const paddingAxis = height > width ? 2 : 1;
    const createPaddingTensor = (paddingAmountLocal) => {
      const paddingTensorShape = imgTensor.shape.slice();
      paddingTensorShape[paddingAxis] = paddingAmountLocal;
      return tfjs_esm_exports.fill(paddingTensorShape, 0, "float32");
    };
    const paddingTensorAppend = createPaddingTensor(paddingAmount);
    const remainingPaddingAmount = dimDiff - paddingTensorAppend.shape[paddingAxis];
    const paddingTensorPrepend = isCenterImage && remainingPaddingAmount ? createPaddingTensor(remainingPaddingAmount) : null;
    const tensorsToStack = [paddingTensorPrepend, imgTensor, paddingTensorAppend].filter((t) => !!t).map((t) => tfjs_esm_exports.cast(t, "float32"));
    return tfjs_esm_exports.concat(tensorsToStack, paddingAxis);
  });
}

// src/ops/shuffleArray.ts
function shuffleArray(inputArray) {
  const array = inputArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

// src/ops/index.ts
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function inverseSigmoid(x) {
  return Math.log(x / (1 - x));
}

// src/classes/Rect.ts
var Rect = class extends Box {
  constructor(x, y, width, height, allowNegativeDimensions = false) {
    super({ x, y, width, height }, allowNegativeDimensions);
  }
};

// src/classes/FaceLandmarks.ts
var relX = 0.5;
var relY = 0.43;
var relScale = 0.45;
var FaceLandmarks = class {
  constructor(relativeFaceLandmarkPositions, imgDims, shift = new Point(0, 0)) {
    const { width, height } = imgDims;
    this._imgDims = new Dimensions(width, height);
    this._shift = shift;
    this._positions = relativeFaceLandmarkPositions.map((pt) => pt.mul(new Point(width, height)).add(shift));
  }
  get shift() {
    return new Point(this._shift.x, this._shift.y);
  }
  get imageWidth() {
    return this._imgDims.width;
  }
  get imageHeight() {
    return this._imgDims.height;
  }
  get positions() {
    return this._positions;
  }
  get relativePositions() {
    return this._positions.map((pt) => pt.sub(this._shift).div(new Point(this.imageWidth, this.imageHeight)));
  }
  forSize(width, height) {
    return new this.constructor(this.relativePositions, { width, height });
  }
  shiftBy(x, y) {
    return new this.constructor(this.relativePositions, this._imgDims, new Point(x, y));
  }
  shiftByPoint(pt) {
    return this.shiftBy(pt.x, pt.y);
  }
  align(detection, options = {}) {
    if (detection) {
      const box = detection instanceof FaceDetection ? detection.box.floor() : new Box(detection);
      return this.shiftBy(box.x, box.y).align(null, options);
    }
    const { useDlibAlignment, minBoxPadding } = { useDlibAlignment: false, minBoxPadding: 0.2, ...options };
    if (useDlibAlignment) {
      return this.alignDlib();
    }
    return this.alignMinBbox(minBoxPadding);
  }
  alignDlib() {
    const centers = this.getRefPointsForAlignment();
    const [leftEyeCenter, rightEyeCenter, mouthCenter] = centers;
    const distToMouth = (pt) => mouthCenter.sub(pt).magnitude();
    const eyeToMouthDist = (distToMouth(leftEyeCenter) + distToMouth(rightEyeCenter)) / 2;
    const size = Math.floor(eyeToMouthDist / relScale);
    const refPoint = getCenterPoint(centers);
    const x = Math.floor(Math.max(0, refPoint.x - relX * size));
    const y = Math.floor(Math.max(0, refPoint.y - relY * size));
    return new Rect(x, y, Math.min(size, this.imageWidth + x), Math.min(size, this.imageHeight + y));
  }
  alignMinBbox(padding) {
    const box = minBbox(this.positions);
    return box.pad(box.width * padding, box.height * padding);
  }
  getRefPointsForAlignment() {
    throw new Error("getRefPointsForAlignment not implemented by base class");
  }
};

// src/classes/FaceLandmarks5.ts
var FaceLandmarks5 = class extends FaceLandmarks {
  getRefPointsForAlignment() {
    const pts = this.positions;
    return [
      pts[0],
      pts[1],
      getCenterPoint([pts[3], pts[4]])
    ];
  }
};

// src/classes/FaceLandmarks68.ts
var FaceLandmarks68 = class extends FaceLandmarks {
  getJawOutline() {
    return this.positions.slice(0, 17);
  }
  getLeftEyeBrow() {
    return this.positions.slice(17, 22);
  }
  getRightEyeBrow() {
    return this.positions.slice(22, 27);
  }
  getNose() {
    return this.positions.slice(27, 36);
  }
  getLeftEye() {
    return this.positions.slice(36, 42);
  }
  getRightEye() {
    return this.positions.slice(42, 48);
  }
  getMouth() {
    return this.positions.slice(48, 68);
  }
  getRefPointsForAlignment() {
    return [
      this.getLeftEye(),
      this.getRightEye(),
      this.getMouth()
    ].map(getCenterPoint);
  }
};

// src/classes/FaceMatch.ts
var FaceMatch = class {
  constructor(label, distance) {
    this._label = label;
    this._distance = distance;
  }
  get label() {
    return this._label;
  }
  get distance() {
    return this._distance;
  }
  toString(withDistance = true) {
    return `${this.label}${withDistance ? ` (${round(this.distance)})` : ""}`;
  }
};

// src/classes/LabeledBox.ts
var LabeledBox = class extends Box {
  static assertIsValidLabeledBox(box, callee) {
    Box.assertIsValidBox(box, callee);
    if (!isValidNumber(box.label)) {
      throw new Error(`${callee} - expected property label (${box.label}) to be a number`);
    }
  }
  constructor(box, label) {
    super(box);
    this._label = label;
  }
  get label() {
    return this._label;
  }
};

// src/classes/LabeledFaceDescriptors.ts
var LabeledFaceDescriptors = class {
  constructor(label, descriptors) {
    if (!(typeof label === "string")) {
      throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");
    }
    if (!Array.isArray(descriptors) || descriptors.some((desc) => !(desc instanceof Float32Array))) {
      throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");
    }
    this._label = label;
    this._descriptors = descriptors;
  }
  get label() {
    return this._label;
  }
  get descriptors() {
    return this._descriptors;
  }
  toJSON() {
    return {
      label: this.label,
      descriptors: this.descriptors.map((d) => Array.from(d))
    };
  }
  static fromJSON(json) {
    const descriptors = json.descriptors.map((d) => new Float32Array(d));
    return new LabeledFaceDescriptors(json.label, descriptors);
  }
};

// src/classes/PredictedBox.ts
var PredictedBox = class extends LabeledBox {
  static assertIsValidPredictedBox(box, callee) {
    LabeledBox.assertIsValidLabeledBox(box, callee);
    if (!isValidProbablitiy(box.score) || !isValidProbablitiy(box.classScore)) {
      throw new Error(`${callee} - expected properties score (${box.score}) and (${box.classScore}) to be a number between [0, 1]`);
    }
  }
  constructor(box, label, score, classScore) {
    super(box, label);
    this._score = score;
    this._classScore = classScore;
  }
  get score() {
    return this._score;
  }
  get classScore() {
    return this._classScore;
  }
};

// src/factories/WithFaceDetection.ts
function isWithFaceDetection(obj) {
  return obj.detection instanceof FaceDetection;
}
function extendWithFaceDetection(sourceObj, detection) {
  const extension = { detection };
  return { ...sourceObj, ...extension };
}

// src/env/createBrowserEnv.ts
function createBrowserEnv() {
  const fetch = window.fetch;
  if (!fetch)
    throw new Error("fetch - missing fetch implementation for browser environment");
  const readFile = () => {
    throw new Error("readFile - filesystem not available for browser environment");
  };
  return {
    Canvas: HTMLCanvasElement,
    CanvasRenderingContext2D,
    Image: HTMLImageElement,
    ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement("canvas"),
    createImageElement: () => document.createElement("img"),
    createVideoElement: () => document.createElement("video"),
    fetch,
    readFile
  };
}

// src/env/isNodejs.ts
function isNodejs() {
  return typeof global === "object" && typeof process !== "undefined" && process.versions != null && process.versions.node != null;
}

// src/env/createFileSystem.ts
function createFileSystem(fs) {
  let requireFsError = "";
  if (!fs && isNodejs()) {
    try {
      fs = __require("fs");
    } catch (err) {
      requireFsError = err.toString();
    }
  }
  const readFile = fs ? (filePath) => new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => err ? reject(err) : resolve(buffer));
  }) : () => {
    throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`);
  };
  return { readFile };
}

// src/env/createNodejsEnv.ts
function createNodejsEnv() {
  const Canvas = global["Canvas"] || global.HTMLCanvasElement;
  const Image = global.Image || global.HTMLImageElement;
  const Video = global["Video"] || global.HTMLVideoElement;
  const createCanvasElement = () => {
    if (Canvas)
      return new Canvas();
    throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment");
  };
  const createImageElement = () => {
    if (Image)
      return new Image();
    throw new Error("createImageElement - missing Image implementation for nodejs environment");
  };
  const createVideoElement = () => {
    if (Video)
      return new Video();
    throw new Error("createVideoElement - missing Video implementation for nodejs environment");
  };
  const fetch = global.fetch;
  const fileSystem = createFileSystem();
  return {
    Canvas: Canvas || class {
    },
    CanvasRenderingContext2D: global.CanvasRenderingContext2D || class {
    },
    Image: Image || class {
    },
    ImageData: global.ImageData || class {
    },
    Video: global.HTMLVideoElement || class {
    },
    createCanvasElement,
    createImageElement,
    createVideoElement,
    fetch,
    ...fileSystem
  };
}

// src/env/isBrowser.ts
function isBrowser() {
  return typeof window === "object" && typeof document !== "undefined" && typeof HTMLImageElement !== "undefined" && typeof HTMLCanvasElement !== "undefined" && typeof HTMLVideoElement !== "undefined" && typeof ImageData !== "undefined" && typeof CanvasRenderingContext2D !== "undefined";
}

// src/env/index.ts
var environment;
function getEnv() {
  if (!environment) {
    throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");
  }
  return environment;
}
function setEnv(env2) {
  environment = env2;
}
function initialize() {
  if (isBrowser())
    return setEnv(createBrowserEnv());
  if (isNodejs())
    return setEnv(createNodejsEnv());
  return null;
}
function monkeyPatch(env2) {
  if (!environment) {
    initialize();
  }
  if (!environment) {
    throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");
  }
  const { Canvas = environment.Canvas, Image = environment.Image } = env2;
  environment.Canvas = Canvas;
  environment.Image = Image;
  environment.createCanvasElement = env2.createCanvasElement || (() => new Canvas());
  environment.createImageElement = env2.createImageElement || (() => new Image());
  environment.ImageData = env2.ImageData || environment.ImageData;
  environment.Video = env2.Video || environment.Video;
  environment.fetch = env2.fetch || environment.fetch;
  environment.readFile = env2.readFile || environment.readFile;
}
var env = {
  getEnv,
  setEnv,
  initialize,
  createBrowserEnv,
  createFileSystem,
  createNodejsEnv,
  monkeyPatch,
  isBrowser,
  isNodejs
};
initialize();

// src/dom/resolveInput.ts
function resolveInput(arg) {
  if (!env.isNodejs() && typeof arg === "string") {
    return document.getElementById(arg);
  }
  return arg;
}

// src/dom/getContext2dOrThrow.ts
function getContext2dOrThrow(canvasArg) {
  const { Canvas, CanvasRenderingContext2D: CanvasRenderingContext2D2 } = env.getEnv();
  if (canvasArg instanceof CanvasRenderingContext2D2) {
    return canvasArg;
  }
  const canvas = resolveInput(canvasArg);
  if (!(canvas instanceof Canvas)) {
    throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("resolveContext2d - canvas 2d context is null");
  }
  return ctx;
}

// src/draw/DrawTextField.ts
var AnchorPosition = /* @__PURE__ */ ((AnchorPosition2) => {
  AnchorPosition2["TOP_LEFT"] = "TOP_LEFT";
  AnchorPosition2["TOP_RIGHT"] = "TOP_RIGHT";
  AnchorPosition2["BOTTOM_LEFT"] = "BOTTOM_LEFT";
  AnchorPosition2["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
  return AnchorPosition2;
})(AnchorPosition || {});
var DrawTextFieldOptions = class {
  constructor(options = {}) {
    const {
      anchorPosition,
      backgroundColor,
      fontColor,
      fontSize,
      fontStyle,
      padding
    } = options;
    this.anchorPosition = anchorPosition || "TOP_LEFT" /* TOP_LEFT */;
    this.backgroundColor = backgroundColor || "rgba(0, 0, 0, 0.5)";
    this.fontColor = fontColor || "rgba(255, 255, 255, 1)";
    this.fontSize = fontSize || 14;
    this.fontStyle = fontStyle || "Georgia";
    this.padding = padding || 4;
  }
};
var DrawTextField = class {
  constructor(text, anchor, options = {}) {
    this.text = typeof text === "string" ? [text] : text instanceof DrawTextField ? text.text : text;
    this.anchor = anchor;
    this.options = new DrawTextFieldOptions(options);
  }
  measureWidth(ctx) {
    const { padding } = this.options;
    return this.text.map((l) => ctx.measureText(l).width).reduce((w0, w1) => w0 < w1 ? w1 : w0, 0) + 2 * padding;
  }
  measureHeight() {
    const { fontSize, padding } = this.options;
    return this.text.length * fontSize + 2 * padding;
  }
  getUpperLeft(ctx, canvasDims) {
    const { anchorPosition } = this.options;
    const isShiftLeft = anchorPosition === "BOTTOM_RIGHT" /* BOTTOM_RIGHT */ || anchorPosition === "TOP_RIGHT" /* TOP_RIGHT */;
    const isShiftTop = anchorPosition === "BOTTOM_LEFT" /* BOTTOM_LEFT */ || anchorPosition === "BOTTOM_RIGHT" /* BOTTOM_RIGHT */;
    const textFieldWidth = this.measureWidth(ctx);
    const textFieldHeight = this.measureHeight();
    const x = isShiftLeft ? this.anchor.x - textFieldWidth : this.anchor.x;
    const y = isShiftTop ? this.anchor.y - textFieldHeight : this.anchor.y;
    if (canvasDims) {
      const { width, height } = canvasDims;
      const newX = Math.max(Math.min(x, width - textFieldWidth), 0);
      const newY = Math.max(Math.min(y, height - textFieldHeight), 0);
      return { x: newX, y: newY };
    }
    return { x, y };
  }
  draw(canvasArg) {
    const canvas = resolveInput(canvasArg);
    const ctx = getContext2dOrThrow(canvas);
    const {
      backgroundColor,
      fontColor,
      fontSize,
      fontStyle,
      padding
    } = this.options;
    ctx.font = `${fontSize}px ${fontStyle}`;
    const maxTextWidth = this.measureWidth(ctx);
    const textHeight = this.measureHeight();
    ctx.fillStyle = backgroundColor;
    const upperLeft = this.getUpperLeft(ctx, canvas);
    ctx.fillRect(upperLeft.x, upperLeft.y, maxTextWidth, textHeight);
    ctx.fillStyle = fontColor;
    this.text.forEach((textLine, i) => {
      const x = padding + upperLeft.x;
      const y = padding + upperLeft.y + (i + 1) * fontSize;
      ctx.fillText(textLine, x, y);
    });
  }
};

// src/draw/DrawBox.ts
var DrawBoxOptions = class {
  constructor(options = {}) {
    const {
      boxColor,
      lineWidth,
      label,
      drawLabelOptions
    } = options;
    this.boxColor = boxColor || "rgba(0, 0, 255, 1)";
    this.lineWidth = lineWidth || 2;
    this.label = label;
    const defaultDrawLabelOptions = {
      anchorPosition: "BOTTOM_LEFT" /* BOTTOM_LEFT */,
      backgroundColor: this.boxColor
    };
    this.drawLabelOptions = new DrawTextFieldOptions({ ...defaultDrawLabelOptions, ...drawLabelOptions });
  }
};
var DrawBox = class {
  constructor(box, options = {}) {
    this.box = new Box(box);
    this.options = new DrawBoxOptions(options);
  }
  draw(canvasArg) {
    const ctx = getContext2dOrThrow(canvasArg);
    const { boxColor, lineWidth } = this.options;
    const {
      x,
      y,
      width,
      height
    } = this.box;
    ctx.strokeStyle = boxColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
    const { label } = this.options;
    if (label) {
      new DrawTextField([label], { x: x - lineWidth / 2, y }, this.options.drawLabelOptions).draw(canvasArg);
    }
  }
};

// src/draw/drawDetections.ts
function drawDetections(canvasArg, detections) {
  const detectionsArray = Array.isArray(detections) ? detections : [detections];
  detectionsArray.forEach((det) => {
    const score = det instanceof FaceDetection ? det.score : isWithFaceDetection(det) ? det.detection.score : void 0;
    const box = det instanceof FaceDetection ? det.box : isWithFaceDetection(det) ? det.detection.box : new Box(det);
    const label = score ? `${round(score)}` : void 0;
    new DrawBox(box, { label }).draw(canvasArg);
  });
}

// src/dom/isMediaLoaded.ts
function isMediaLoaded(media) {
  const { Image, Video } = env.getEnv();
  return media instanceof Image && media.complete || media instanceof Video && media.readyState >= 3;
}

// src/dom/awaitMediaLoaded.ts
function awaitMediaLoaded(media) {
  return new Promise((resolve, reject) => {
    if (media instanceof env.getEnv().Canvas || isMediaLoaded(media))
      resolve(null);
    function onError(e) {
      if (!e.currentTarget)
        return;
      e.currentTarget.removeEventListener("load", onLoad);
      e.currentTarget.removeEventListener("error", onError);
      reject(e);
    }
    function onLoad(e) {
      if (!e.currentTarget)
        return;
      e.currentTarget.removeEventListener("load", onLoad);
      e.currentTarget.removeEventListener("error", onError);
      resolve(e);
    }
    media.addEventListener("load", onLoad);
    media.addEventListener("error", onError);
  });
}

// src/dom/bufferToImage.ts
function bufferToImage(buf) {
  return new Promise((resolve, reject) => {
    if (!(buf instanceof Blob))
      reject(new Error("bufferToImage - expected buf to be of type: Blob"));
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string")
        reject(new Error("bufferToImage - expected reader.result to be a string, in onload"));
      const img = env.getEnv().createImageElement();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(buf);
  });
}

// src/dom/getMediaDimensions.ts
function getMediaDimensions(input) {
  const { Image, Video } = env.getEnv();
  if (input instanceof Image) {
    return new Dimensions(input.naturalWidth, input.naturalHeight);
  }
  if (input instanceof Video) {
    return new Dimensions(input.videoWidth, input.videoHeight);
  }
  return new Dimensions(input.width, input.height);
}

// src/dom/createCanvas.ts
function createCanvas({ width, height }) {
  const { createCanvasElement } = env.getEnv();
  const canvas = createCanvasElement();
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function createCanvasFromMedia(media, dims) {
  const { ImageData: ImageData2 } = env.getEnv();
  if (!(media instanceof ImageData2) && !isMediaLoaded(media)) {
    throw new Error("createCanvasFromMedia - media has not finished loading yet");
  }
  const { width, height } = dims || getMediaDimensions(media);
  const canvas = createCanvas({ width, height });
  if (media instanceof ImageData2) {
    getContext2dOrThrow(canvas).putImageData(media, 0, 0);
  } else {
    getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
  }
  return canvas;
}

// src/dom/imageTensorToCanvas.ts
async function imageTensorToCanvas(imgTensor, canvas) {
  const targetCanvas = canvas || env.getEnv().createCanvasElement();
  const [height, width, numChannels] = imgTensor.shape.slice(isTensor4D(imgTensor) ? 1 : 0);
  const imgTensor3D = tfjs_esm_exports.tidy(() => imgTensor.as3D(height, width, numChannels).toInt());
  await tfjs_esm_exports.browser.toPixels(imgTensor3D, targetCanvas);
  imgTensor3D.dispose();
  return targetCanvas;
}

// src/dom/isMediaElement.ts
function isMediaElement(input) {
  const { Image, Canvas, Video } = env.getEnv();
  return input instanceof Image || input instanceof Canvas || input instanceof Video;
}

// src/dom/imageToSquare.ts
function imageToSquare(input, inputSize, centerImage = false) {
  const { Image, Canvas } = env.getEnv();
  if (!(input instanceof Image || input instanceof Canvas)) {
    throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");
  }
  if (inputSize <= 0)
    return createCanvas({ width: 1, height: 1 });
  const dims = getMediaDimensions(input);
  const scale2 = inputSize / Math.max(dims.height, dims.width);
  const width = scale2 * dims.width;
  const height = scale2 * dims.height;
  const targetCanvas = createCanvas({ width: inputSize, height: inputSize });
  const inputCanvas = input instanceof Canvas ? input : createCanvasFromMedia(input);
  const offset = Math.abs(width - height) / 2;
  const dx = centerImage && width < height ? offset : 0;
  const dy = centerImage && height < width ? offset : 0;
  if (inputCanvas.width > 0 && inputCanvas.height > 0)
    getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
  return targetCanvas;
}

// src/dom/NetInput.ts
var NetInput = class {
  constructor(inputs, treatAsBatchInput = false) {
    this._imageTensors = [];
    this._canvases = [];
    this._treatAsBatchInput = false;
    this._inputDimensions = [];
    this._inputSize = 0;
    if (!Array.isArray(inputs)) {
      throw new Error(`NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have ${inputs}`);
    }
    this._treatAsBatchInput = treatAsBatchInput;
    this._batchSize = inputs.length;
    inputs.forEach((input, idx) => {
      if (isTensor3D(input)) {
        this._imageTensors[idx] = input;
        this._inputDimensions[idx] = input.shape;
        return;
      }
      if (isTensor4D(input)) {
        const batchSize = input.shape[0];
        if (batchSize !== 1) {
          throw new Error(`NetInput - tf.Tensor4D with batchSize ${batchSize} passed, but not supported in input array`);
        }
        this._imageTensors[idx] = input;
        this._inputDimensions[idx] = input.shape.slice(1);
        return;
      }
      const canvas = input instanceof env.getEnv().Canvas ? input : createCanvasFromMedia(input);
      this._canvases[idx] = canvas;
      this._inputDimensions[idx] = [canvas.height, canvas.width, 3];
    });
  }
  get imageTensors() {
    return this._imageTensors;
  }
  get canvases() {
    return this._canvases;
  }
  get isBatchInput() {
    return this.batchSize > 1 || this._treatAsBatchInput;
  }
  get batchSize() {
    return this._batchSize;
  }
  get inputDimensions() {
    return this._inputDimensions;
  }
  get inputSize() {
    return this._inputSize;
  }
  get reshapedInputDimensions() {
    return range(this.batchSize, 0, 1).map((_, batchIdx) => this.getReshapedInputDimensions(batchIdx));
  }
  getInput(batchIdx) {
    return this.canvases[batchIdx] || this.imageTensors[batchIdx];
  }
  getInputDimensions(batchIdx) {
    return this._inputDimensions[batchIdx];
  }
  getInputHeight(batchIdx) {
    return this._inputDimensions[batchIdx][0];
  }
  getInputWidth(batchIdx) {
    return this._inputDimensions[batchIdx][1];
  }
  getReshapedInputDimensions(batchIdx) {
    if (typeof this.inputSize !== "number") {
      throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");
    }
    const width = this.getInputWidth(batchIdx);
    const height = this.getInputHeight(batchIdx);
    return computeReshapedDimensions({ width, height }, this.inputSize);
  }
  toBatchTensor(inputSize, isCenterInputs = true) {
    this._inputSize = inputSize;
    return tfjs_esm_exports.tidy(() => {
      const inputTensors = range(this.batchSize, 0, 1).map((batchIdx) => {
        const input = this.getInput(batchIdx);
        if (input instanceof tfjs_esm_exports.Tensor) {
          let imgTensor = isTensor4D(input) ? input : tfjs_esm_exports.expandDims(input);
          imgTensor = padToSquare(imgTensor, isCenterInputs);
          if (imgTensor.shape[1] !== inputSize || imgTensor.shape[2] !== inputSize) {
            imgTensor = tfjs_esm_exports.image.resizeBilinear(imgTensor, [inputSize, inputSize], false, false);
          }
          return imgTensor.as3D(inputSize, inputSize, 3);
        }
        if (input instanceof env.getEnv().Canvas) {
          return tfjs_esm_exports.browser.fromPixels(imageToSquare(input, inputSize, isCenterInputs));
        }
        throw new Error(`toBatchTensor - at batchIdx ${batchIdx}, expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have ${input}`);
      });
      const batchTensor = tfjs_esm_exports.stack(inputTensors.map((t) => tfjs_esm_exports.cast(t, "float32"))).as4D(this.batchSize, inputSize, inputSize, 3);
      return batchTensor;
    });
  }
};

// src/dom/toNetInput.ts
async function toNetInput(inputs) {
  if (inputs instanceof NetInput)
    return inputs;
  const inputArgArray = Array.isArray(inputs) ? inputs : [inputs];
  if (!inputArgArray.length)
    throw new Error("toNetInput - empty array passed as input");
  const getIdxHint = (idx) => Array.isArray(inputs) ? ` at input index ${idx}:` : "";
  const inputArray = inputArgArray.map(resolveInput);
  inputArray.forEach((input, i) => {
    if (!isMediaElement(input) && !isTensor3D(input) && !isTensor4D(input)) {
      if (typeof inputArgArray[i] === "string")
        throw new Error(`toNetInput -${getIdxHint(i)} string passed, but could not resolve HTMLElement for element id ${inputArgArray[i]}`);
      throw new Error(`toNetInput -${getIdxHint(i)} expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id`);
    }
    if (isTensor4D(input)) {
      const batchSize = input.shape[0];
      if (batchSize !== 1)
        throw new Error(`toNetInput -${getIdxHint(i)} tf.Tensor4D with batchSize ${batchSize} passed, but not supported in input array`);
    }
  });
  await Promise.all(inputArray.map((input) => isMediaElement(input) && awaitMediaLoaded(input)));
  return new NetInput(inputArray, Array.isArray(inputs));
}

// src/dom/extractFaces.ts
async function extractFaces(input, detections) {
  const { Canvas } = env.getEnv();
  let canvas = input;
  if (!(input instanceof Canvas)) {
    const netInput = await toNetInput(input);
    if (netInput.batchSize > 1)
      throw new Error("extractFaces - batchSize > 1 not supported");
    const tensorOrCanvas = netInput.getInput(0);
    canvas = tensorOrCanvas instanceof Canvas ? tensorOrCanvas : await imageTensorToCanvas(tensorOrCanvas);
  }
  const ctx = getContext2dOrThrow(canvas);
  const boxes = detections.map((det) => det instanceof FaceDetection ? det.forSize(canvas.width, canvas.height).box.floor() : det).map((box) => box.clipAtImageBorders(canvas.width, canvas.height));
  return boxes.map(({ x, y, width, height }) => {
    const faceImg = createCanvas({ width, height });
    if (width > 0 && height > 0)
      getContext2dOrThrow(faceImg).putImageData(ctx.getImageData(x, y, width, height), 0, 0);
    return faceImg;
  });
}

// src/dom/extractFaceTensors.ts
async function extractFaceTensors(imageTensor, detections) {
  if (!isTensor3D(imageTensor) && !isTensor4D(imageTensor)) {
    throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");
  }
  if (isTensor4D(imageTensor) && imageTensor.shape[0] > 1) {
    throw new Error("extractFaceTensors - batchSize > 1 not supported");
  }
  return tfjs_esm_exports.tidy(() => {
    const [imgHeight, imgWidth, numChannels] = imageTensor.shape.slice(isTensor4D(imageTensor) ? 1 : 0);
    const boxes = detections.map((det) => det instanceof FaceDetection ? det.forSize(imgWidth, imgHeight).box : det).map((box) => box.clipAtImageBorders(imgWidth, imgHeight));
    const faceTensors = boxes.map(({
      x,
      y,
      width,
      height
    }) => tfjs_esm_exports.slice3d(imageTensor.as3D(imgHeight, imgWidth, numChannels), [y, x, 0], [height, width, numChannels]));
    return faceTensors;
  });
}

// src/dom/fetchOrThrow.ts
async function fetchOrThrow(url, init) {
  const { fetch } = env.getEnv();
  const res = await fetch(url, init);
  if (!(res.status < 400)) {
    throw new Error(`failed to fetch: (${res.status}) ${res.statusText}, from url: ${res.url}`);
  }
  return res;
}

// src/dom/fetchImage.ts
async function fetchImage(uri) {
  const res = await fetchOrThrow(uri);
  const blob = await res.blob();
  if (!blob.type.startsWith("image/")) {
    throw new Error(`fetchImage - expected blob type to be of type image/*, instead have: ${blob.type}, for url: ${res.url}`);
  }
  return bufferToImage(blob);
}

// src/dom/fetchJson.ts
async function fetchJson(uri) {
  return (await fetchOrThrow(uri)).json();
}

// src/dom/fetchNetWeights.ts
async function fetchNetWeights(uri) {
  return new Float32Array(await (await fetchOrThrow(uri)).arrayBuffer());
}

// src/dom/bufferToVideo.ts
function bufferToVideo(buf) {
  return new Promise((resolve, reject) => {
    if (!(buf instanceof Blob))
      reject(new Error("bufferToVideo - expected buf to be of type: Blob"));
    const video = env.getEnv().createVideoElement();
    video.oncanplay = () => resolve(video);
    video.onerror = reject;
    video.playsInline = true;
    video.muted = true;
    video.src = URL.createObjectURL(buf);
    video.play();
  });
}

// src/dom/fetchVideo.ts
async function fetchVideo(uri) {
  const res = await fetchOrThrow(uri);
  const blob = await res.blob();
  if (!blob.type.startsWith("video/")) {
    throw new Error(`fetchVideo - expected blob type to be of type video/*, instead have: ${blob.type}, for url: ${res.url}`);
  }
  return bufferToVideo(blob);
}

// src/common/getModelUris.ts
function getModelUris(uri, defaultModelName) {
  const defaultManifestFilename = `${defaultModelName}-weights_manifest.json`;
  if (!uri) {
    return {
      modelBaseUri: "",
      manifestUri: defaultManifestFilename
    };
  }
  if (uri === "/") {
    return {
      modelBaseUri: "/",
      manifestUri: `/${defaultManifestFilename}`
    };
  }
  const protocol = uri.startsWith("http://") ? "http://" : uri.startsWith("https://") ? "https://" : "";
  uri = uri.replace(protocol, "");
  const parts = uri.split("/").filter((s) => s);
  const manifestFile = uri.endsWith(".json") ? parts[parts.length - 1] : defaultManifestFilename;
  let modelBaseUri = protocol + (uri.endsWith(".json") ? parts.slice(0, parts.length - 1) : parts).join("/");
  modelBaseUri = uri.startsWith("/") ? `/${modelBaseUri}` : modelBaseUri;
  return {
    modelBaseUri,
    manifestUri: modelBaseUri === "/" ? `/${manifestFile}` : `${modelBaseUri}/${manifestFile}`
  };
}

// src/dom/loadWeightMap.ts
async function loadWeightMap(uri, defaultModelName) {
  const { manifestUri, modelBaseUri } = getModelUris(uri, defaultModelName);
  const manifest = await fetchJson(manifestUri);
  return tfjs_esm_exports.io.loadWeights(manifest, modelBaseUri);
}

// src/dom/matchDimensions.ts
function matchDimensions(input, reference, useMediaDimensions = false) {
  const { width, height } = useMediaDimensions ? getMediaDimensions(reference) : reference;
  input.width = width;
  input.height = height;
  return { width, height };
}

// src/NeuralNetwork.ts
var NeuralNetwork = class {
  constructor(name) {
    this._params = void 0;
    this._paramMappings = [];
    this._name = name;
  }
  get params() {
    return this._params;
  }
  get paramMappings() {
    return this._paramMappings;
  }
  get isLoaded() {
    return !!this.params;
  }
  getParamFromPath(paramPath) {
    const { obj, objProp } = this.traversePropertyPath(paramPath);
    return obj[objProp];
  }
  reassignParamFromPath(paramPath, tensor2) {
    const { obj, objProp } = this.traversePropertyPath(paramPath);
    obj[objProp].dispose();
    obj[objProp] = tensor2;
  }
  getParamList() {
    return this._paramMappings.map(({ paramPath }) => ({
      path: paramPath,
      tensor: this.getParamFromPath(paramPath)
    }));
  }
  getTrainableParams() {
    return this.getParamList().filter((param) => param.tensor instanceof tfjs_esm_exports.Variable);
  }
  getFrozenParams() {
    return this.getParamList().filter((param) => !(param.tensor instanceof tfjs_esm_exports.Variable));
  }
  variable() {
    this.getFrozenParams().forEach(({ path, tensor: tensor2 }) => {
      this.reassignParamFromPath(path, tensor2.variable());
    });
  }
  freeze() {
    this.getTrainableParams().forEach(({ path, tensor: variable }) => {
      const tensor2 = tfjs_esm_exports.tensor(variable.dataSync());
      variable.dispose();
      this.reassignParamFromPath(path, tensor2);
    });
  }
  dispose(throwOnRedispose = true) {
    this.getParamList().forEach((param) => {
      if (throwOnRedispose && param.tensor.isDisposed) {
        throw new Error(`param tensor has already been disposed for path ${param.path}`);
      }
      param.tensor.dispose();
    });
    this._params = void 0;
  }
  serializeParams() {
    return new Float32Array(this.getParamList().map(({ tensor: tensor2 }) => Array.from(tensor2.dataSync())).reduce((flat, arr) => flat.concat(arr)));
  }
  async load(weightsOrUrl) {
    if (weightsOrUrl instanceof Float32Array) {
      this.extractWeights(weightsOrUrl);
      return;
    }
    await this.loadFromUri(weightsOrUrl);
  }
  async loadFromUri(uri) {
    if (uri && typeof uri !== "string") {
      throw new Error(`${this._name}.loadFromUri - expected model uri`);
    }
    const weightMap = await loadWeightMap(uri, this.getDefaultModelName());
    this.loadFromWeightMap(weightMap);
  }
  async loadFromDisk(filePath) {
    if (filePath && typeof filePath !== "string") {
      throw new Error(`${this._name}.loadFromDisk - expected model file path`);
    }
    const { readFile } = env.getEnv();
    const { manifestUri, modelBaseUri } = getModelUris(filePath, this.getDefaultModelName());
    const fetchWeightsFromDisk = (filePaths) => Promise.all(filePaths.map((fp) => readFile(fp).then((buf) => buf.buffer)));
    const loadWeights = tfjs_esm_exports.io.weightsLoaderFactory(fetchWeightsFromDisk);
    const manifest = JSON.parse((await readFile(manifestUri)).toString());
    const weightMap = await loadWeights(manifest, modelBaseUri);
    this.loadFromWeightMap(weightMap);
  }
  loadFromWeightMap(weightMap) {
    const { paramMappings, params } = this.extractParamsFromWeightMap(weightMap);
    this._paramMappings = paramMappings;
    this._params = params;
  }
  extractWeights(weights) {
    const { paramMappings, params } = this.extractParams(weights);
    this._paramMappings = paramMappings;
    this._params = params;
  }
  traversePropertyPath(paramPath) {
    if (!this.params) {
      throw new Error("traversePropertyPath - model has no loaded params");
    }
    const result = paramPath.split("/").reduce((res, objProp2) => {
      if (!res.nextObj.hasOwnProperty(objProp2)) {
        throw new Error(`traversePropertyPath - object does not have property ${objProp2}, for path ${paramPath}`);
      }
      return { obj: res.nextObj, objProp: objProp2, nextObj: res.nextObj[objProp2] };
    }, { nextObj: this.params });
    const { obj, objProp } = result;
    if (!obj || !objProp || !(obj[objProp] instanceof tfjs_esm_exports.Tensor)) {
      throw new Error(`traversePropertyPath - parameter is not a tensor, for path ${paramPath}`);
    }
    return { obj, objProp };
  }
};

// src/common/depthwiseSeparableConv.ts
function depthwiseSeparableConv(x, params, stride) {
  return tfjs_esm_exports.tidy(() => {
    let out = tfjs_esm_exports.separableConv2d(x, params.depthwise_filter, params.pointwise_filter, stride, "same");
    out = tfjs_esm_exports.add(out, params.bias);
    return out;
  });
}

// src/faceFeatureExtractor/denseBlock.ts
function denseBlock3(x, denseBlockParams, isFirstLayer = false) {
  return tfjs_esm_exports.tidy(() => {
    const out1 = tfjs_esm_exports.relu(isFirstLayer ? tfjs_esm_exports.add(tfjs_esm_exports.conv2d(x, denseBlockParams.conv0.filters, [2, 2], "same"), denseBlockParams.conv0.bias) : depthwiseSeparableConv(x, denseBlockParams.conv0, [2, 2]));
    const out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
    const in3 = tfjs_esm_exports.relu(tfjs_esm_exports.add(out1, out2));
    const out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
    return tfjs_esm_exports.relu(tfjs_esm_exports.add(out1, tfjs_esm_exports.add(out2, out3)));
  });
}
function denseBlock4(x, denseBlockParams, isFirstLayer = false, isScaleDown = true) {
  return tfjs_esm_exports.tidy(() => {
    const out1 = tfjs_esm_exports.relu(isFirstLayer ? tfjs_esm_exports.add(tfjs_esm_exports.conv2d(x, denseBlockParams.conv0.filters, isScaleDown ? [2, 2] : [1, 1], "same"), denseBlockParams.conv0.bias) : depthwiseSeparableConv(x, denseBlockParams.conv0, isScaleDown ? [2, 2] : [1, 1]));
    const out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
    const in3 = tfjs_esm_exports.relu(tfjs_esm_exports.add(out1, out2));
    const out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
    const in4 = tfjs_esm_exports.relu(tfjs_esm_exports.add(out1, tfjs_esm_exports.add(out2, out3)));
    const out4 = depthwiseSeparableConv(in4, denseBlockParams.conv3, [1, 1]);
    return tfjs_esm_exports.relu(tfjs_esm_exports.add(out1, tfjs_esm_exports.add(out2, tfjs_esm_exports.add(out3, out4))));
  });
}

// src/common/convLayer.ts
function convLayer(x, params, padding = "same", withRelu = false) {
  return tfjs_esm_exports.tidy(() => {
    const out = tfjs_esm_exports.add(tfjs_esm_exports.conv2d(x, params.filters, [1, 1], padding), params.bias);
    return withRelu ? tfjs_esm_exports.relu(out) : out;
  });
}

// src/common/disposeUnusedWeightTensors.ts
function disposeUnusedWeightTensors(weightMap, paramMappings) {
  Object.keys(weightMap).forEach((path) => {
    if (!paramMappings.some((pm) => pm.originalPath === path)) {
      weightMap[path].dispose();
    }
  });
}

// src/common/extractConvParamsFactory.ts
function extractConvParamsFactory(extractWeights, paramMappings) {
  return (channelsIn, channelsOut, filterSize, mappedPrefix) => {
    const filters = tfjs_esm_exports.tensor4d(extractWeights(channelsIn * channelsOut * filterSize * filterSize), [filterSize, filterSize, channelsIn, channelsOut]);
    const bias = tfjs_esm_exports.tensor1d(extractWeights(channelsOut));
    paramMappings.push({ paramPath: `${mappedPrefix}/filters` }, { paramPath: `${mappedPrefix}/bias` });
    return { filters, bias };
  };
}

// src/common/extractFCParamsFactory.ts
function extractFCParamsFactory(extractWeights, paramMappings) {
  return (channelsIn, channelsOut, mappedPrefix) => {
    const fc_weights = tfjs_esm_exports.tensor2d(extractWeights(channelsIn * channelsOut), [channelsIn, channelsOut]);
    const fc_bias = tfjs_esm_exports.tensor1d(extractWeights(channelsOut));
    paramMappings.push({ paramPath: `${mappedPrefix}/weights` }, { paramPath: `${mappedPrefix}/bias` });
    return {
      weights: fc_weights,
      bias: fc_bias
    };
  };
}

// src/common/types.ts
var SeparableConvParams = class {
  constructor(depthwise_filter, pointwise_filter, bias) {
    this.depthwise_filter = depthwise_filter;
    this.pointwise_filter = pointwise_filter;
    this.bias = bias;
  }
};

// src/common/extractSeparableConvParamsFactory.ts
function extractSeparableConvParamsFactory(extractWeights, paramMappings) {
  return (channelsIn, channelsOut, mappedPrefix) => {
    const depthwise_filter = tfjs_esm_exports.tensor4d(extractWeights(3 * 3 * channelsIn), [3, 3, channelsIn, 1]);
    const pointwise_filter = tfjs_esm_exports.tensor4d(extractWeights(channelsIn * channelsOut), [1, 1, channelsIn, channelsOut]);
    const bias = tfjs_esm_exports.tensor1d(extractWeights(channelsOut));
    paramMappings.push({ paramPath: `${mappedPrefix}/depthwise_filter` }, { paramPath: `${mappedPrefix}/pointwise_filter` }, { paramPath: `${mappedPrefix}/bias` });
    return new SeparableConvParams(depthwise_filter, pointwise_filter, bias);
  };
}
function loadSeparableConvParamsFactory(extractWeightEntry) {
  return (prefix) => {
    const depthwise_filter = extractWeightEntry(`${prefix}/depthwise_filter`, 4);
    const pointwise_filter = extractWeightEntry(`${prefix}/pointwise_filter`, 4);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return new SeparableConvParams(depthwise_filter, pointwise_filter, bias);
  };
}

// src/common/extractWeightEntryFactory.ts
function extractWeightEntryFactory(weightMap, paramMappings) {
  return (originalPath, paramRank, mappedPath) => {
    const tensor2 = weightMap[originalPath];
    if (!isTensor(tensor2, paramRank)) {
      throw new Error(`expected weightMap[${originalPath}] to be a Tensor${paramRank}D, instead have ${tensor2}`);
    }
    paramMappings.push({ originalPath, paramPath: mappedPath || originalPath });
    return tensor2;
  };
}

// src/common/extractWeightsFactory.ts
function extractWeightsFactory(weights) {
  let remainingWeights = weights;
  function extractWeights(numWeights) {
    const ret = remainingWeights.slice(0, numWeights);
    remainingWeights = remainingWeights.slice(numWeights);
    return ret;
  }
  function getRemainingWeights() {
    return remainingWeights;
  }
  return {
    extractWeights,
    getRemainingWeights
  };
}

// src/faceFeatureExtractor/extractorsFactory.ts
function extractorsFactory(extractWeights, paramMappings) {
  const extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
  const extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
  function extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer = false) {
    const conv0 = isFirstLayer ? extractConvParams(channelsIn, channelsOut, 3, `${mappedPrefix}/conv0`) : extractSeparableConvParams(channelsIn, channelsOut, `${mappedPrefix}/conv0`);
    const conv1 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv1`);
    const conv22 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv2`);
    return { conv0, conv1, conv2: conv22 };
  }
  function extractDenseBlock4Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer = false) {
    const { conv0, conv1, conv2: conv22 } = extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer);
    const conv3 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/conv3`);
    return {
      conv0,
      conv1,
      conv2: conv22,
      conv3
    };
  }
  return {
    extractDenseBlock3Params,
    extractDenseBlock4Params
  };
}

// src/faceFeatureExtractor/extractParams.ts
function extractParams(weights) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const {
    extractDenseBlock4Params
  } = extractorsFactory(extractWeights, paramMappings);
  const dense0 = extractDenseBlock4Params(3, 32, "dense0", true);
  const dense1 = extractDenseBlock4Params(32, 64, "dense1");
  const dense2 = extractDenseBlock4Params(64, 128, "dense2");
  const dense3 = extractDenseBlock4Params(128, 256, "dense3");
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    paramMappings,
    params: {
      dense0,
      dense1,
      dense2,
      dense3
    }
  };
}

// src/common/loadConvParamsFactory.ts
function loadConvParamsFactory(extractWeightEntry) {
  return (prefix) => {
    const filters = extractWeightEntry(`${prefix}/filters`, 4);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return { filters, bias };
  };
}

// src/faceFeatureExtractor/loadParamsFactory.ts
function loadParamsFactory(weightMap, paramMappings) {
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  const extractConvParams = loadConvParamsFactory(extractWeightEntry);
  const extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
  function extractDenseBlock3Params(prefix, isFirstLayer = false) {
    const conv0 = isFirstLayer ? extractConvParams(`${prefix}/conv0`) : extractSeparableConvParams(`${prefix}/conv0`);
    const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
    const conv22 = extractSeparableConvParams(`${prefix}/conv2`);
    return { conv0, conv1, conv2: conv22 };
  }
  function extractDenseBlock4Params(prefix, isFirstLayer = false) {
    const conv0 = isFirstLayer ? extractConvParams(`${prefix}/conv0`) : extractSeparableConvParams(`${prefix}/conv0`);
    const conv1 = extractSeparableConvParams(`${prefix}/conv1`);
    const conv22 = extractSeparableConvParams(`${prefix}/conv2`);
    const conv3 = extractSeparableConvParams(`${prefix}/conv3`);
    return {
      conv0,
      conv1,
      conv2: conv22,
      conv3
    };
  }
  return {
    extractDenseBlock3Params,
    extractDenseBlock4Params
  };
}

// src/faceFeatureExtractor/extractParamsFromWeightMap.ts
function extractParamsFromWeightMap(weightMap) {
  const paramMappings = [];
  const {
    extractDenseBlock4Params
  } = loadParamsFactory(weightMap, paramMappings);
  const params = {
    dense0: extractDenseBlock4Params("dense0", true),
    dense1: extractDenseBlock4Params("dense1"),
    dense2: extractDenseBlock4Params("dense2"),
    dense3: extractDenseBlock4Params("dense3")
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/faceFeatureExtractor/FaceFeatureExtractor.ts
var FaceFeatureExtractor = class extends NeuralNetwork {
  constructor() {
    super("FaceFeatureExtractor");
  }
  forwardInput(input) {
    const { params } = this;
    if (!params) {
      throw new Error("FaceFeatureExtractor - load model before inference");
    }
    return tfjs_esm_exports.tidy(() => {
      const batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(112, true), "float32");
      const meanRgb = [122.782, 117.001, 104.298];
      const normalized = normalize(batchTensor, meanRgb).div(255);
      let out = denseBlock4(normalized, params.dense0, true);
      out = denseBlock4(out, params.dense1);
      out = denseBlock4(out, params.dense2);
      out = denseBlock4(out, params.dense3);
      out = tfjs_esm_exports.avgPool(out, [7, 7], [2, 2], "valid");
      return out;
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  getDefaultModelName() {
    return "face_feature_extractor_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMap(weightMap);
  }
  extractParams(weights) {
    return extractParams(weights);
  }
};

// src/common/fullyConnectedLayer.ts
function fullyConnectedLayer(x, params) {
  return tfjs_esm_exports.tidy(() => tfjs_esm_exports.add(tfjs_esm_exports.matMul(x, params.weights), params.bias));
}

// src/faceProcessor/extractParams.ts
function extractParams2(weights, channelsIn, channelsOut) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
  const fc = extractFCParams(channelsIn, channelsOut, "fc");
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    paramMappings,
    params: { fc }
  };
}

// src/faceProcessor/extractParamsFromWeightMap.ts
function extractParamsFromWeightMap2(weightMap) {
  const paramMappings = [];
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  function extractFcParams(prefix) {
    const weights = extractWeightEntry(`${prefix}/weights`, 2);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return { weights, bias };
  }
  const params = {
    fc: extractFcParams("fc")
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/faceProcessor/util.ts
function seperateWeightMaps(weightMap) {
  const featureExtractorMap = {};
  const classifierMap = {};
  Object.keys(weightMap).forEach((key) => {
    const map = key.startsWith("fc") ? classifierMap : featureExtractorMap;
    map[key] = weightMap[key];
  });
  return { featureExtractorMap, classifierMap };
}

// src/faceProcessor/FaceProcessor.ts
var FaceProcessor = class extends NeuralNetwork {
  constructor(_name, faceFeatureExtractor) {
    super(_name);
    this._faceFeatureExtractor = faceFeatureExtractor;
  }
  get faceFeatureExtractor() {
    return this._faceFeatureExtractor;
  }
  runNet(input) {
    const { params } = this;
    if (!params) {
      throw new Error(`${this._name} - load model before inference`);
    }
    return tfjs_esm_exports.tidy(() => {
      const bottleneckFeatures = input instanceof NetInput ? this.faceFeatureExtractor.forwardInput(input) : input;
      return fullyConnectedLayer(bottleneckFeatures.as2D(bottleneckFeatures.shape[0], -1), params.fc);
    });
  }
  dispose(throwOnRedispose = true) {
    this.faceFeatureExtractor.dispose(throwOnRedispose);
    super.dispose(throwOnRedispose);
  }
  loadClassifierParams(weights) {
    const { params, paramMappings } = this.extractClassifierParams(weights);
    this._params = params;
    this._paramMappings = paramMappings;
  }
  extractClassifierParams(weights) {
    return extractParams2(weights, this.getClassifierChannelsIn(), this.getClassifierChannelsOut());
  }
  extractParamsFromWeightMap(weightMap) {
    const { featureExtractorMap, classifierMap } = seperateWeightMaps(weightMap);
    this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
    return extractParamsFromWeightMap2(classifierMap);
  }
  extractParams(weights) {
    const cIn = this.getClassifierChannelsIn();
    const cOut = this.getClassifierChannelsOut();
    const classifierWeightSize = cOut * cIn + cOut;
    const featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
    const classifierWeights = weights.slice(weights.length - classifierWeightSize);
    this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
    return this.extractClassifierParams(classifierWeights);
  }
};

// src/faceExpressionNet/FaceExpressions.ts
var FACE_EXPRESSION_LABELS = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];
var FaceExpressions = class {
  constructor(probabilities) {
    this.neutral = 0;
    this.happy = 0;
    this.sad = 0;
    this.angry = 0;
    this.fearful = 0;
    this.disgusted = 0;
    this.surprised = 0;
    if (probabilities.length !== 7) {
      throw new Error(`FaceExpressions.constructor - expected probabilities.length to be 7, have: ${probabilities.length}`);
    }
    FACE_EXPRESSION_LABELS.forEach((expression, idx) => {
      this[expression] = probabilities[idx];
    });
  }
  asSortedArray() {
    return FACE_EXPRESSION_LABELS.map((expression) => ({ expression, probability: this[expression] })).sort((e0, e1) => e1.probability - e0.probability);
  }
};

// src/faceExpressionNet/FaceExpressionNet.ts
var FaceExpressionNet = class extends FaceProcessor {
  constructor(faceFeatureExtractor = new FaceFeatureExtractor()) {
    super("FaceExpressionNet", faceFeatureExtractor);
  }
  forwardInput(input) {
    return tfjs_esm_exports.tidy(() => tfjs_esm_exports.softmax(this.runNet(input)));
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  async predictExpressions(input) {
    const netInput = await toNetInput(input);
    const out = await this.forwardInput(netInput);
    const probabilitesByBatch = await Promise.all(tfjs_esm_exports.unstack(out).map(async (t) => {
      const data = t.dataSync();
      t.dispose();
      return data;
    }));
    out.dispose();
    const predictionsByBatch = probabilitesByBatch.map((probabilites) => new FaceExpressions(probabilites));
    return netInput.isBatchInput ? predictionsByBatch : predictionsByBatch[0];
  }
  getDefaultModelName() {
    return "face_expression_model";
  }
  getClassifierChannelsIn() {
    return 256;
  }
  getClassifierChannelsOut() {
    return 7;
  }
};

// src/factories/WithFaceExpressions.ts
function isWithFaceExpressions(obj) {
  return obj.expressions instanceof FaceExpressions;
}
function extendWithFaceExpressions(sourceObj, expressions) {
  const extension = { expressions };
  return { ...sourceObj, ...extension };
}

// src/draw/drawFaceExpressions.ts
function drawFaceExpressions(canvasArg, faceExpressions, minConfidence = 0.1, textFieldAnchor) {
  const faceExpressionsArray = Array.isArray(faceExpressions) ? faceExpressions : [faceExpressions];
  faceExpressionsArray.forEach((e) => {
    const expr = e instanceof FaceExpressions ? e : isWithFaceExpressions(e) ? e.expressions : void 0;
    if (!expr) {
      throw new Error("drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof");
    }
    const sorted = expr.asSortedArray();
    const resultsToDisplay = sorted.filter((exprLocal) => exprLocal.probability > minConfidence);
    const anchor = isWithFaceDetection(e) ? e.detection.box.bottomLeft : textFieldAnchor || new Point(0, 0);
    const drawTextField = new DrawTextField(resultsToDisplay.map((exprLocal) => `${exprLocal.expression} (${round(exprLocal.probability)})`), anchor);
    drawTextField.draw(canvasArg);
  });
}

// src/factories/WithFaceLandmarks.ts
function isWithFaceLandmarks(obj) {
  return isWithFaceDetection(obj) && obj["landmarks"] instanceof FaceLandmarks && obj["unshiftedLandmarks"] instanceof FaceLandmarks && obj["alignedRect"] instanceof FaceDetection;
}
function calculateFaceAngle(mesh) {
  const radians = (a1, a2, b1, b2) => Math.atan2(b2 - a2, b1 - a1) % Math.PI;
  const degrees = (theta) => theta * 180 / Math.PI;
  const angle = { roll: void 0, pitch: void 0, yaw: void 0 };
  if (!mesh || !mesh._positions || mesh._positions.length !== 68)
    return angle;
  const pt = mesh._positions;
  angle.roll = -radians(pt[36]._x, pt[36]._y, pt[45]._x, pt[45]._y);
  angle.pitch = radians(0, Math.abs(pt[0]._x - pt[30]._x) / pt[30]._x, Math.PI, Math.abs(pt[16]._x - pt[30]._x) / pt[30]._x);
  const bottom = pt.reduce((prev, cur) => prev < cur._y ? prev : cur._y, Infinity);
  const top = pt.reduce((prev, cur) => prev > cur._y ? prev : cur._y, -Infinity);
  angle.yaw = Math.PI * (mesh._imgDims._height / (top - bottom) / 1.4 - 1);
  return angle;
}
function extendWithFaceLandmarks(sourceObj, unshiftedLandmarks) {
  const { box: shift } = sourceObj.detection;
  const landmarks = unshiftedLandmarks.shiftBy(shift.x, shift.y);
  const rect = landmarks.align();
  const { imageDims } = sourceObj.detection;
  const alignedRect = new FaceDetection(sourceObj.detection.score, rect.rescale(imageDims.reverse()), imageDims);
  const angle = calculateFaceAngle(unshiftedLandmarks);
  const extension = {
    landmarks,
    unshiftedLandmarks,
    alignedRect,
    angle
  };
  return { ...sourceObj, ...extension };
}

// src/draw/DrawFaceLandmarks.ts
var DrawFaceLandmarksOptions = class {
  constructor(options = {}) {
    const {
      drawLines = true,
      drawPoints = true,
      lineWidth,
      lineColor,
      pointSize,
      pointColor
    } = options;
    this.drawLines = drawLines;
    this.drawPoints = drawPoints;
    this.lineWidth = lineWidth || 1;
    this.pointSize = pointSize || 2;
    this.lineColor = lineColor || "rgba(0, 255, 255, 1)";
    this.pointColor = pointColor || "rgba(255, 0, 255, 1)";
  }
};
var DrawFaceLandmarks = class {
  constructor(faceLandmarks, options = {}) {
    this.faceLandmarks = faceLandmarks;
    this.options = new DrawFaceLandmarksOptions(options);
  }
  draw(canvasArg) {
    const ctx = getContext2dOrThrow(canvasArg);
    const {
      drawLines,
      drawPoints,
      lineWidth,
      lineColor,
      pointSize,
      pointColor
    } = this.options;
    if (drawLines && this.faceLandmarks instanceof FaceLandmarks68) {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      drawContour(ctx, this.faceLandmarks.getJawOutline());
      drawContour(ctx, this.faceLandmarks.getLeftEyeBrow());
      drawContour(ctx, this.faceLandmarks.getRightEyeBrow());
      drawContour(ctx, this.faceLandmarks.getNose());
      drawContour(ctx, this.faceLandmarks.getLeftEye(), true);
      drawContour(ctx, this.faceLandmarks.getRightEye(), true);
      drawContour(ctx, this.faceLandmarks.getMouth(), true);
    }
    if (drawPoints) {
      ctx.strokeStyle = pointColor;
      ctx.fillStyle = pointColor;
      const drawPoint = (pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
        ctx.fill();
      };
      this.faceLandmarks.positions.forEach(drawPoint);
    }
  }
};
function drawFaceLandmarks(canvasArg, faceLandmarks) {
  const faceLandmarksArray = Array.isArray(faceLandmarks) ? faceLandmarks : [faceLandmarks];
  faceLandmarksArray.forEach((f) => {
    const landmarks = f instanceof FaceLandmarks ? f : isWithFaceLandmarks(f) ? f.landmarks : void 0;
    if (!landmarks) {
      throw new Error("drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof");
    }
    new DrawFaceLandmarks(landmarks).draw(canvasArg);
  });
}

// package.json
var version10 = "1.6.5";

// src/xception/extractParams.ts
function extractorsFactory2(extractWeights, paramMappings) {
  const extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
  const extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
  function extractReductionBlockParams(channelsIn, channelsOut, mappedPrefix) {
    const separable_conv0 = extractSeparableConvParams(channelsIn, channelsOut, `${mappedPrefix}/separable_conv0`);
    const separable_conv1 = extractSeparableConvParams(channelsOut, channelsOut, `${mappedPrefix}/separable_conv1`);
    const expansion_conv = extractConvParams(channelsIn, channelsOut, 1, `${mappedPrefix}/expansion_conv`);
    return { separable_conv0, separable_conv1, expansion_conv };
  }
  function extractMainBlockParams(channels, mappedPrefix) {
    const separable_conv0 = extractSeparableConvParams(channels, channels, `${mappedPrefix}/separable_conv0`);
    const separable_conv1 = extractSeparableConvParams(channels, channels, `${mappedPrefix}/separable_conv1`);
    const separable_conv2 = extractSeparableConvParams(channels, channels, `${mappedPrefix}/separable_conv2`);
    return { separable_conv0, separable_conv1, separable_conv2 };
  }
  return {
    extractConvParams,
    extractSeparableConvParams,
    extractReductionBlockParams,
    extractMainBlockParams
  };
}
function extractParams3(weights, numMainBlocks) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const {
    extractConvParams,
    extractSeparableConvParams,
    extractReductionBlockParams,
    extractMainBlockParams
  } = extractorsFactory2(extractWeights, paramMappings);
  const entry_flow_conv_in = extractConvParams(3, 32, 3, "entry_flow/conv_in");
  const entry_flow_reduction_block_0 = extractReductionBlockParams(32, 64, "entry_flow/reduction_block_0");
  const entry_flow_reduction_block_1 = extractReductionBlockParams(64, 128, "entry_flow/reduction_block_1");
  const entry_flow = {
    conv_in: entry_flow_conv_in,
    reduction_block_0: entry_flow_reduction_block_0,
    reduction_block_1: entry_flow_reduction_block_1
  };
  const middle_flow = {};
  range(numMainBlocks, 0, 1).forEach((idx) => {
    middle_flow[`main_block_${idx}`] = extractMainBlockParams(128, `middle_flow/main_block_${idx}`);
  });
  const exit_flow_reduction_block = extractReductionBlockParams(128, 256, "exit_flow/reduction_block");
  const exit_flow_separable_conv = extractSeparableConvParams(256, 512, "exit_flow/separable_conv");
  const exit_flow = {
    reduction_block: exit_flow_reduction_block,
    separable_conv: exit_flow_separable_conv
  };
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    paramMappings,
    params: { entry_flow, middle_flow, exit_flow }
  };
}

// src/xception/extractParamsFromWeightMap.ts
function loadParamsFactory2(weightMap, paramMappings) {
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  const extractConvParams = loadConvParamsFactory(extractWeightEntry);
  const extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
  function extractReductionBlockParams(mappedPrefix) {
    const separable_conv0 = extractSeparableConvParams(`${mappedPrefix}/separable_conv0`);
    const separable_conv1 = extractSeparableConvParams(`${mappedPrefix}/separable_conv1`);
    const expansion_conv = extractConvParams(`${mappedPrefix}/expansion_conv`);
    return { separable_conv0, separable_conv1, expansion_conv };
  }
  function extractMainBlockParams(mappedPrefix) {
    const separable_conv0 = extractSeparableConvParams(`${mappedPrefix}/separable_conv0`);
    const separable_conv1 = extractSeparableConvParams(`${mappedPrefix}/separable_conv1`);
    const separable_conv2 = extractSeparableConvParams(`${mappedPrefix}/separable_conv2`);
    return { separable_conv0, separable_conv1, separable_conv2 };
  }
  return {
    extractConvParams,
    extractSeparableConvParams,
    extractReductionBlockParams,
    extractMainBlockParams
  };
}
function extractParamsFromWeightMap3(weightMap, numMainBlocks) {
  const paramMappings = [];
  const {
    extractConvParams,
    extractSeparableConvParams,
    extractReductionBlockParams,
    extractMainBlockParams
  } = loadParamsFactory2(weightMap, paramMappings);
  const entry_flow_conv_in = extractConvParams("entry_flow/conv_in");
  const entry_flow_reduction_block_0 = extractReductionBlockParams("entry_flow/reduction_block_0");
  const entry_flow_reduction_block_1 = extractReductionBlockParams("entry_flow/reduction_block_1");
  const entry_flow = {
    conv_in: entry_flow_conv_in,
    reduction_block_0: entry_flow_reduction_block_0,
    reduction_block_1: entry_flow_reduction_block_1
  };
  const middle_flow = {};
  range(numMainBlocks, 0, 1).forEach((idx) => {
    middle_flow[`main_block_${idx}`] = extractMainBlockParams(`middle_flow/main_block_${idx}`);
  });
  const exit_flow_reduction_block = extractReductionBlockParams("exit_flow/reduction_block");
  const exit_flow_separable_conv = extractSeparableConvParams("exit_flow/separable_conv");
  const exit_flow = {
    reduction_block: exit_flow_reduction_block,
    separable_conv: exit_flow_separable_conv
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params: { entry_flow, middle_flow, exit_flow }, paramMappings };
}

// src/xception/TinyXception.ts
function conv(x, params, stride) {
  return tfjs_esm_exports.add(tfjs_esm_exports.conv2d(x, params.filters, stride, "same"), params.bias);
}
function reductionBlock(x, params, isActivateInput = true) {
  let out = isActivateInput ? tfjs_esm_exports.relu(x) : x;
  out = depthwiseSeparableConv(out, params.separable_conv0, [1, 1]);
  out = depthwiseSeparableConv(tfjs_esm_exports.relu(out), params.separable_conv1, [1, 1]);
  out = tfjs_esm_exports.maxPool(out, [3, 3], [2, 2], "same");
  out = tfjs_esm_exports.add(out, conv(x, params.expansion_conv, [2, 2]));
  return out;
}
function mainBlock(x, params) {
  let out = depthwiseSeparableConv(tfjs_esm_exports.relu(x), params.separable_conv0, [1, 1]);
  out = depthwiseSeparableConv(tfjs_esm_exports.relu(out), params.separable_conv1, [1, 1]);
  out = depthwiseSeparableConv(tfjs_esm_exports.relu(out), params.separable_conv2, [1, 1]);
  out = tfjs_esm_exports.add(out, x);
  return out;
}
var TinyXception = class extends NeuralNetwork {
  constructor(numMainBlocks) {
    super("TinyXception");
    this._numMainBlocks = numMainBlocks;
  }
  forwardInput(input) {
    const { params } = this;
    if (!params) {
      throw new Error("TinyXception - load model before inference");
    }
    return tfjs_esm_exports.tidy(() => {
      const batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(112, true), "float32");
      const meanRgb = [122.782, 117.001, 104.298];
      const normalized = normalize(batchTensor, meanRgb).div(255);
      let out = tfjs_esm_exports.relu(conv(normalized, params.entry_flow.conv_in, [2, 2]));
      out = reductionBlock(out, params.entry_flow.reduction_block_0, false);
      out = reductionBlock(out, params.entry_flow.reduction_block_1);
      range(this._numMainBlocks, 0, 1).forEach((idx) => {
        out = mainBlock(out, params.middle_flow[`main_block_${idx}`]);
      });
      out = reductionBlock(out, params.exit_flow.reduction_block);
      out = tfjs_esm_exports.relu(depthwiseSeparableConv(out, params.exit_flow.separable_conv, [1, 1]));
      return out;
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  getDefaultModelName() {
    return "tiny_xception_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMap3(weightMap, this._numMainBlocks);
  }
  extractParams(weights) {
    return extractParams3(weights, this._numMainBlocks);
  }
};

// src/ageGenderNet/extractParams.ts
function extractParams4(weights) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
  const age = extractFCParams(512, 1, "fc/age");
  const gender = extractFCParams(512, 2, "fc/gender");
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    paramMappings,
    params: { fc: { age, gender } }
  };
}

// src/ageGenderNet/extractParamsFromWeightMap.ts
function extractParamsFromWeightMap4(weightMap) {
  const paramMappings = [];
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  function extractFcParams(prefix) {
    const weights = extractWeightEntry(`${prefix}/weights`, 2);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return { weights, bias };
  }
  const params = {
    fc: {
      age: extractFcParams("fc/age"),
      gender: extractFcParams("fc/gender")
    }
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/ageGenderNet/types.ts
var Gender = /* @__PURE__ */ ((Gender2) => {
  Gender2["FEMALE"] = "female";
  Gender2["MALE"] = "male";
  return Gender2;
})(Gender || {});

// src/ageGenderNet/AgeGenderNet.ts
var AgeGenderNet = class extends NeuralNetwork {
  constructor(faceFeatureExtractor = new TinyXception(2)) {
    super("AgeGenderNet");
    this._faceFeatureExtractor = faceFeatureExtractor;
  }
  get faceFeatureExtractor() {
    return this._faceFeatureExtractor;
  }
  runNet(input) {
    const { params } = this;
    if (!params) {
      throw new Error(`${this._name} - load model before inference`);
    }
    return tfjs_esm_exports.tidy(() => {
      const bottleneckFeatures = input instanceof NetInput ? this.faceFeatureExtractor.forwardInput(input) : input;
      const pooled = tfjs_esm_exports.avgPool(bottleneckFeatures, [7, 7], [2, 2], "valid").as2D(bottleneckFeatures.shape[0], -1);
      const age = fullyConnectedLayer(pooled, params.fc.age).as1D();
      const gender = fullyConnectedLayer(pooled, params.fc.gender);
      return { age, gender };
    });
  }
  forwardInput(input) {
    return tfjs_esm_exports.tidy(() => {
      const { age, gender } = this.runNet(input);
      return { age, gender: tfjs_esm_exports.softmax(gender) };
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  async predictAgeAndGender(input) {
    const netInput = await toNetInput(input);
    const out = await this.forwardInput(netInput);
    const ages = tfjs_esm_exports.unstack(out.age);
    const genders = tfjs_esm_exports.unstack(out.gender);
    const ageAndGenderTensors = ages.map((ageTensor, i) => ({
      ageTensor,
      genderTensor: genders[i]
    }));
    const predictionsByBatch = await Promise.all(ageAndGenderTensors.map(async ({ ageTensor, genderTensor }) => {
      const age = ageTensor.dataSync()[0];
      const probMale = genderTensor.dataSync()[0];
      const isMale = probMale > 0.5;
      const gender = isMale ? "male" /* MALE */ : "female" /* FEMALE */;
      const genderProbability = isMale ? probMale : 1 - probMale;
      ageTensor.dispose();
      genderTensor.dispose();
      return { age, gender, genderProbability };
    }));
    out.age.dispose();
    out.gender.dispose();
    return netInput.isBatchInput ? predictionsByBatch : predictionsByBatch[0];
  }
  getDefaultModelName() {
    return "age_gender_model";
  }
  dispose(throwOnRedispose = true) {
    this.faceFeatureExtractor.dispose(throwOnRedispose);
    super.dispose(throwOnRedispose);
  }
  loadClassifierParams(weights) {
    const { params, paramMappings } = this.extractClassifierParams(weights);
    this._params = params;
    this._paramMappings = paramMappings;
  }
  extractClassifierParams(weights) {
    return extractParams4(weights);
  }
  extractParamsFromWeightMap(weightMap) {
    const { featureExtractorMap, classifierMap } = seperateWeightMaps(weightMap);
    this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
    return extractParamsFromWeightMap4(classifierMap);
  }
  extractParams(weights) {
    const classifierWeightSize = 512 * 1 + 1 + (512 * 2 + 2);
    const featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
    const classifierWeights = weights.slice(weights.length - classifierWeightSize);
    this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
    return this.extractClassifierParams(classifierWeights);
  }
};

// src/faceLandmarkNet/FaceLandmark68NetBase.ts
var FaceLandmark68NetBase = class extends FaceProcessor {
  postProcess(output, inputSize, originalDimensions) {
    const inputDimensions = originalDimensions.map(({ width, height }) => {
      const scale2 = inputSize / Math.max(height, width);
      return {
        width: width * scale2,
        height: height * scale2
      };
    });
    const batchSize = inputDimensions.length;
    return tfjs_esm_exports.tidy(() => {
      const createInterleavedTensor = (fillX, fillY) => tfjs_esm_exports.stack([tfjs_esm_exports.fill([68], fillX, "float32"), tfjs_esm_exports.fill([68], fillY, "float32")], 1).as2D(1, 136).as1D();
      const getPadding = (batchIdx, cond) => {
        const { width, height } = inputDimensions[batchIdx];
        return cond(width, height) ? Math.abs(width - height) / 2 : 0;
      };
      const getPaddingX = (batchIdx) => getPadding(batchIdx, (w, h) => w < h);
      const getPaddingY = (batchIdx) => getPadding(batchIdx, (w, h) => h < w);
      const landmarkTensors = output.mul(tfjs_esm_exports.fill([batchSize, 136], inputSize, "float32")).sub(tfjs_esm_exports.stack(Array.from(Array(batchSize), (_, batchIdx) => createInterleavedTensor(getPaddingX(batchIdx), getPaddingY(batchIdx))))).div(tfjs_esm_exports.stack(Array.from(Array(batchSize), (_, batchIdx) => createInterleavedTensor(inputDimensions[batchIdx].width, inputDimensions[batchIdx].height))));
      return landmarkTensors;
    });
  }
  forwardInput(input) {
    return tfjs_esm_exports.tidy(() => {
      const out = this.runNet(input);
      return this.postProcess(out, input.inputSize, input.inputDimensions.map(([height, width]) => ({ height, width })));
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  async detectLandmarks(input) {
    const netInput = await toNetInput(input);
    const landmarkTensors = tfjs_esm_exports.tidy(() => tfjs_esm_exports.unstack(this.forwardInput(netInput)));
    const landmarksForBatch = await Promise.all(landmarkTensors.map(async (landmarkTensor, batchIdx) => {
      const landmarksArray = Array.from(landmarkTensor.dataSync());
      const xCoords = landmarksArray.filter((_, i) => isEven(i));
      const yCoords = landmarksArray.filter((_, i) => !isEven(i));
      return new FaceLandmarks68(Array(68).fill(0).map((_, i) => new Point(xCoords[i], yCoords[i])), {
        height: netInput.getInputHeight(batchIdx),
        width: netInput.getInputWidth(batchIdx)
      });
    }));
    landmarkTensors.forEach((t) => t.dispose());
    return netInput.isBatchInput ? landmarksForBatch : landmarksForBatch[0];
  }
  getClassifierChannelsOut() {
    return 136;
  }
};

// src/faceLandmarkNet/FaceLandmark68Net.ts
var FaceLandmark68Net = class extends FaceLandmark68NetBase {
  constructor(faceFeatureExtractor = new FaceFeatureExtractor()) {
    super("FaceLandmark68Net", faceFeatureExtractor);
  }
  getDefaultModelName() {
    return "face_landmark_68_model";
  }
  getClassifierChannelsIn() {
    return 256;
  }
};

// src/faceFeatureExtractor/extractParamsFromWeightMapTiny.ts
function extractParamsFromWeightMapTiny(weightMap) {
  const paramMappings = [];
  const {
    extractDenseBlock3Params
  } = loadParamsFactory(weightMap, paramMappings);
  const params = {
    dense0: extractDenseBlock3Params("dense0", true),
    dense1: extractDenseBlock3Params("dense1"),
    dense2: extractDenseBlock3Params("dense2")
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/faceFeatureExtractor/extractParamsTiny.ts
function extractParamsTiny(weights) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const {
    extractDenseBlock3Params
  } = extractorsFactory(extractWeights, paramMappings);
  const dense0 = extractDenseBlock3Params(3, 32, "dense0", true);
  const dense1 = extractDenseBlock3Params(32, 64, "dense1");
  const dense2 = extractDenseBlock3Params(64, 128, "dense2");
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    paramMappings,
    params: { dense0, dense1, dense2 }
  };
}

// src/faceFeatureExtractor/TinyFaceFeatureExtractor.ts
var TinyFaceFeatureExtractor = class extends NeuralNetwork {
  constructor() {
    super("TinyFaceFeatureExtractor");
  }
  forwardInput(input) {
    const { params } = this;
    if (!params) {
      throw new Error("TinyFaceFeatureExtractor - load model before inference");
    }
    return tfjs_esm_exports.tidy(() => {
      const batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(112, true), "float32");
      const meanRgb = [122.782, 117.001, 104.298];
      const normalized = normalize(batchTensor, meanRgb).div(255);
      let out = denseBlock3(normalized, params.dense0, true);
      out = denseBlock3(out, params.dense1);
      out = denseBlock3(out, params.dense2);
      out = tfjs_esm_exports.avgPool(out, [14, 14], [2, 2], "valid");
      return out;
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  getDefaultModelName() {
    return "face_feature_extractor_tiny_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMapTiny(weightMap);
  }
  extractParams(weights) {
    return extractParamsTiny(weights);
  }
};

// src/faceLandmarkNet/FaceLandmark68TinyNet.ts
var FaceLandmark68TinyNet = class extends FaceLandmark68NetBase {
  constructor(faceFeatureExtractor = new TinyFaceFeatureExtractor()) {
    super("FaceLandmark68TinyNet", faceFeatureExtractor);
  }
  getDefaultModelName() {
    return "face_landmark_68_tiny_model";
  }
  getClassifierChannelsIn() {
    return 128;
  }
};

// src/faceLandmarkNet/index.ts
var FaceLandmarkNet = class extends FaceLandmark68Net {
};

// src/faceRecognitionNet/scaleLayer.ts
function scale(x, params) {
  return tfjs_esm_exports.add(tfjs_esm_exports.mul(x, params.weights), params.biases);
}

// src/faceRecognitionNet/convLayer.ts
function convLayer2(x, params, strides, withRelu, padding = "same") {
  const { filters, bias } = params.conv;
  let out = tfjs_esm_exports.conv2d(x, filters, strides, padding);
  out = tfjs_esm_exports.add(out, bias);
  out = scale(out, params.scale);
  return withRelu ? tfjs_esm_exports.relu(out) : out;
}
function conv2(x, params) {
  return convLayer2(x, params, [1, 1], true);
}
function convNoRelu(x, params) {
  return convLayer2(x, params, [1, 1], false);
}
function convDown(x, params) {
  return convLayer2(x, params, [2, 2], true, "valid");
}

// src/faceRecognitionNet/extractParams.ts
function extractorsFactory3(extractWeights, paramMappings) {
  function extractFilterValues(numFilterValues, numFilters, filterSize) {
    const weights = extractWeights(numFilterValues);
    const depth = weights.length / (numFilters * filterSize * filterSize);
    if (isFloat(depth)) {
      throw new Error(`depth has to be an integer: ${depth}, weights.length: ${weights.length}, numFilters: ${numFilters}, filterSize: ${filterSize}`);
    }
    return tfjs_esm_exports.tidy(() => tfjs_esm_exports.transpose(tfjs_esm_exports.tensor4d(weights, [numFilters, depth, filterSize, filterSize]), [2, 3, 1, 0]));
  }
  function extractConvParams(numFilterValues, numFilters, filterSize, mappedPrefix) {
    const filters = extractFilterValues(numFilterValues, numFilters, filterSize);
    const bias = tfjs_esm_exports.tensor1d(extractWeights(numFilters));
    paramMappings.push({ paramPath: `${mappedPrefix}/filters` }, { paramPath: `${mappedPrefix}/bias` });
    return { filters, bias };
  }
  function extractScaleLayerParams(numWeights, mappedPrefix) {
    const weights = tfjs_esm_exports.tensor1d(extractWeights(numWeights));
    const biases = tfjs_esm_exports.tensor1d(extractWeights(numWeights));
    paramMappings.push({ paramPath: `${mappedPrefix}/weights` }, { paramPath: `${mappedPrefix}/biases` });
    return {
      weights,
      biases
    };
  }
  function extractConvLayerParams(numFilterValues, numFilters, filterSize, mappedPrefix) {
    const conv3 = extractConvParams(numFilterValues, numFilters, filterSize, `${mappedPrefix}/conv`);
    const scale2 = extractScaleLayerParams(numFilters, `${mappedPrefix}/scale`);
    return { conv: conv3, scale: scale2 };
  }
  function extractResidualLayerParams(numFilterValues, numFilters, filterSize, mappedPrefix, isDown = false) {
    const conv1 = extractConvLayerParams((isDown ? 0.5 : 1) * numFilterValues, numFilters, filterSize, `${mappedPrefix}/conv1`);
    const conv22 = extractConvLayerParams(numFilterValues, numFilters, filterSize, `${mappedPrefix}/conv2`);
    return { conv1, conv2: conv22 };
  }
  return {
    extractConvLayerParams,
    extractResidualLayerParams
  };
}
function extractParams5(weights) {
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const paramMappings = [];
  const {
    extractConvLayerParams,
    extractResidualLayerParams
  } = extractorsFactory3(extractWeights, paramMappings);
  const conv32_down = extractConvLayerParams(4704, 32, 7, "conv32_down");
  const conv32_1 = extractResidualLayerParams(9216, 32, 3, "conv32_1");
  const conv32_2 = extractResidualLayerParams(9216, 32, 3, "conv32_2");
  const conv32_3 = extractResidualLayerParams(9216, 32, 3, "conv32_3");
  const conv64_down = extractResidualLayerParams(36864, 64, 3, "conv64_down", true);
  const conv64_1 = extractResidualLayerParams(36864, 64, 3, "conv64_1");
  const conv64_2 = extractResidualLayerParams(36864, 64, 3, "conv64_2");
  const conv64_3 = extractResidualLayerParams(36864, 64, 3, "conv64_3");
  const conv128_down = extractResidualLayerParams(147456, 128, 3, "conv128_down", true);
  const conv128_1 = extractResidualLayerParams(147456, 128, 3, "conv128_1");
  const conv128_2 = extractResidualLayerParams(147456, 128, 3, "conv128_2");
  const conv256_down = extractResidualLayerParams(589824, 256, 3, "conv256_down", true);
  const conv256_1 = extractResidualLayerParams(589824, 256, 3, "conv256_1");
  const conv256_2 = extractResidualLayerParams(589824, 256, 3, "conv256_2");
  const conv256_down_out = extractResidualLayerParams(589824, 256, 3, "conv256_down_out");
  const fc = tfjs_esm_exports.tidy(() => tfjs_esm_exports.transpose(tfjs_esm_exports.tensor2d(extractWeights(256 * 128), [128, 256]), [1, 0]));
  paramMappings.push({ paramPath: "fc" });
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  const params = {
    conv32_down,
    conv32_1,
    conv32_2,
    conv32_3,
    conv64_down,
    conv64_1,
    conv64_2,
    conv64_3,
    conv128_down,
    conv128_1,
    conv128_2,
    conv256_down,
    conv256_1,
    conv256_2,
    conv256_down_out,
    fc
  };
  return { params, paramMappings };
}

// src/faceRecognitionNet/extractParamsFromWeightMap.ts
function extractorsFactory4(weightMap, paramMappings) {
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  function extractScaleLayerParams(prefix) {
    const weights = extractWeightEntry(`${prefix}/scale/weights`, 1);
    const biases = extractWeightEntry(`${prefix}/scale/biases`, 1);
    return { weights, biases };
  }
  function extractConvLayerParams(prefix) {
    const filters = extractWeightEntry(`${prefix}/conv/filters`, 4);
    const bias = extractWeightEntry(`${prefix}/conv/bias`, 1);
    const scale2 = extractScaleLayerParams(prefix);
    return { conv: { filters, bias }, scale: scale2 };
  }
  function extractResidualLayerParams(prefix) {
    return {
      conv1: extractConvLayerParams(`${prefix}/conv1`),
      conv2: extractConvLayerParams(`${prefix}/conv2`)
    };
  }
  return {
    extractConvLayerParams,
    extractResidualLayerParams
  };
}
function extractParamsFromWeightMap5(weightMap) {
  const paramMappings = [];
  const {
    extractConvLayerParams,
    extractResidualLayerParams
  } = extractorsFactory4(weightMap, paramMappings);
  const conv32_down = extractConvLayerParams("conv32_down");
  const conv32_1 = extractResidualLayerParams("conv32_1");
  const conv32_2 = extractResidualLayerParams("conv32_2");
  const conv32_3 = extractResidualLayerParams("conv32_3");
  const conv64_down = extractResidualLayerParams("conv64_down");
  const conv64_1 = extractResidualLayerParams("conv64_1");
  const conv64_2 = extractResidualLayerParams("conv64_2");
  const conv64_3 = extractResidualLayerParams("conv64_3");
  const conv128_down = extractResidualLayerParams("conv128_down");
  const conv128_1 = extractResidualLayerParams("conv128_1");
  const conv128_2 = extractResidualLayerParams("conv128_2");
  const conv256_down = extractResidualLayerParams("conv256_down");
  const conv256_1 = extractResidualLayerParams("conv256_1");
  const conv256_2 = extractResidualLayerParams("conv256_2");
  const conv256_down_out = extractResidualLayerParams("conv256_down_out");
  const { fc } = weightMap;
  paramMappings.push({ originalPath: "fc", paramPath: "fc" });
  if (!isTensor2D(fc)) {
    throw new Error(`expected weightMap[fc] to be a Tensor2D, instead have ${fc}`);
  }
  const params = {
    conv32_down,
    conv32_1,
    conv32_2,
    conv32_3,
    conv64_down,
    conv64_1,
    conv64_2,
    conv64_3,
    conv128_down,
    conv128_1,
    conv128_2,
    conv256_down,
    conv256_1,
    conv256_2,
    conv256_down_out,
    fc
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/faceRecognitionNet/residualLayer.ts
function residual(x, params) {
  let out = conv2(x, params.conv1);
  out = convNoRelu(out, params.conv2);
  out = tfjs_esm_exports.add(out, x);
  out = tfjs_esm_exports.relu(out);
  return out;
}
function residualDown(x, params) {
  let out = convDown(x, params.conv1);
  out = convNoRelu(out, params.conv2);
  let pooled = tfjs_esm_exports.avgPool(x, 2, 2, "valid");
  const zeros2 = tfjs_esm_exports.zeros(pooled.shape);
  const isPad = pooled.shape[3] !== out.shape[3];
  const isAdjustShape = pooled.shape[1] !== out.shape[1] || pooled.shape[2] !== out.shape[2];
  if (isAdjustShape) {
    const padShapeX = [...out.shape];
    padShapeX[1] = 1;
    const zerosW = tfjs_esm_exports.zeros(padShapeX);
    out = tfjs_esm_exports.concat([out, zerosW], 1);
    const padShapeY = [...out.shape];
    padShapeY[2] = 1;
    const zerosH = tfjs_esm_exports.zeros(padShapeY);
    out = tfjs_esm_exports.concat([out, zerosH], 2);
  }
  pooled = isPad ? tfjs_esm_exports.concat([pooled, zeros2], 3) : pooled;
  out = tfjs_esm_exports.add(pooled, out);
  out = tfjs_esm_exports.relu(out);
  return out;
}

// src/faceRecognitionNet/FaceRecognitionNet.ts
var FaceRecognitionNet = class extends NeuralNetwork {
  constructor() {
    super("FaceRecognitionNet");
  }
  forwardInput(input) {
    const { params } = this;
    if (!params) {
      throw new Error("FaceRecognitionNet - load model before inference");
    }
    return tfjs_esm_exports.tidy(() => {
      const batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(150, true), "float32");
      const meanRgb = [122.782, 117.001, 104.298];
      const normalized = normalize(batchTensor, meanRgb).div(255);
      let out = convDown(normalized, params.conv32_down);
      out = tfjs_esm_exports.maxPool(out, 3, 2, "valid");
      out = residual(out, params.conv32_1);
      out = residual(out, params.conv32_2);
      out = residual(out, params.conv32_3);
      out = residualDown(out, params.conv64_down);
      out = residual(out, params.conv64_1);
      out = residual(out, params.conv64_2);
      out = residual(out, params.conv64_3);
      out = residualDown(out, params.conv128_down);
      out = residual(out, params.conv128_1);
      out = residual(out, params.conv128_2);
      out = residualDown(out, params.conv256_down);
      out = residual(out, params.conv256_1);
      out = residual(out, params.conv256_2);
      out = residualDown(out, params.conv256_down_out);
      const globalAvg = out.mean([1, 2]);
      const fullyConnected = tfjs_esm_exports.matMul(globalAvg, params.fc);
      return fullyConnected;
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  async computeFaceDescriptor(input) {
    var _a;
    if ((_a = input == null ? void 0 : input.shape) == null ? void 0 : _a.some((dim) => dim <= 0))
      return new Float32Array(128);
    const netInput = await toNetInput(input);
    const faceDescriptorTensors = tfjs_esm_exports.tidy(() => tfjs_esm_exports.unstack(this.forwardInput(netInput)));
    const faceDescriptorsForBatch = await Promise.all(faceDescriptorTensors.map((t) => t.data()));
    faceDescriptorTensors.forEach((t) => t.dispose());
    return netInput.isBatchInput ? faceDescriptorsForBatch : faceDescriptorsForBatch[0];
  }
  getDefaultModelName() {
    return "face_recognition_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMap5(weightMap);
  }
  extractParams(weights) {
    return extractParams5(weights);
  }
};

// src/faceRecognitionNet/index.ts
function createFaceRecognitionNet(weights) {
  const net = new FaceRecognitionNet();
  net.extractWeights(weights);
  return net;
}

// src/factories/WithFaceDescriptor.ts
function extendWithFaceDescriptor(sourceObj, descriptor) {
  const extension = { descriptor };
  return { ...sourceObj, ...extension };
}

// src/factories/WithAge.ts
function isWithAge(obj) {
  return typeof obj.age === "number";
}
function extendWithAge(sourceObj, age) {
  const extension = { age };
  return { ...sourceObj, ...extension };
}

// src/factories/WithGender.ts
function isWithGender(obj) {
  return (obj.gender === "male" /* MALE */ || obj.gender === "female" /* FEMALE */) && isValidProbablitiy(obj.genderProbability);
}
function extendWithGender(sourceObj, gender, genderProbability) {
  const extension = { gender, genderProbability };
  return { ...sourceObj, ...extension };
}

// src/ssdMobilenetv1/extractParams.ts
function extractorsFactory5(extractWeights, paramMappings) {
  function extractDepthwiseConvParams(numChannels, mappedPrefix) {
    const filters = tfjs_esm_exports.tensor4d(extractWeights(3 * 3 * numChannels), [3, 3, numChannels, 1]);
    const batch_norm_scale = tfjs_esm_exports.tensor1d(extractWeights(numChannels));
    const batch_norm_offset = tfjs_esm_exports.tensor1d(extractWeights(numChannels));
    const batch_norm_mean = tfjs_esm_exports.tensor1d(extractWeights(numChannels));
    const batch_norm_variance = tfjs_esm_exports.tensor1d(extractWeights(numChannels));
    paramMappings.push({ paramPath: `${mappedPrefix}/filters` }, { paramPath: `${mappedPrefix}/batch_norm_scale` }, { paramPath: `${mappedPrefix}/batch_norm_offset` }, { paramPath: `${mappedPrefix}/batch_norm_mean` }, { paramPath: `${mappedPrefix}/batch_norm_variance` });
    return {
      filters,
      batch_norm_scale,
      batch_norm_offset,
      batch_norm_mean,
      batch_norm_variance
    };
  }
  function extractConvParams(channelsIn, channelsOut, filterSize, mappedPrefix, isPointwiseConv) {
    const filters = tfjs_esm_exports.tensor4d(extractWeights(channelsIn * channelsOut * filterSize * filterSize), [filterSize, filterSize, channelsIn, channelsOut]);
    const bias = tfjs_esm_exports.tensor1d(extractWeights(channelsOut));
    paramMappings.push({ paramPath: `${mappedPrefix}/filters` }, { paramPath: `${mappedPrefix}/${isPointwiseConv ? "batch_norm_offset" : "bias"}` });
    return { filters, bias };
  }
  function extractPointwiseConvParams(channelsIn, channelsOut, filterSize, mappedPrefix) {
    const {
      filters,
      bias
    } = extractConvParams(channelsIn, channelsOut, filterSize, mappedPrefix, true);
    return {
      filters,
      batch_norm_offset: bias
    };
  }
  function extractConvPairParams(channelsIn, channelsOut, mappedPrefix) {
    const depthwise_conv = extractDepthwiseConvParams(channelsIn, `${mappedPrefix}/depthwise_conv`);
    const pointwise_conv = extractPointwiseConvParams(channelsIn, channelsOut, 1, `${mappedPrefix}/pointwise_conv`);
    return { depthwise_conv, pointwise_conv };
  }
  function extractMobilenetV1Params() {
    const conv_0 = extractPointwiseConvParams(3, 32, 3, "mobilenetv1/conv_0");
    const conv_1 = extractConvPairParams(32, 64, "mobilenetv1/conv_1");
    const conv_2 = extractConvPairParams(64, 128, "mobilenetv1/conv_2");
    const conv_3 = extractConvPairParams(128, 128, "mobilenetv1/conv_3");
    const conv_4 = extractConvPairParams(128, 256, "mobilenetv1/conv_4");
    const conv_5 = extractConvPairParams(256, 256, "mobilenetv1/conv_5");
    const conv_6 = extractConvPairParams(256, 512, "mobilenetv1/conv_6");
    const conv_7 = extractConvPairParams(512, 512, "mobilenetv1/conv_7");
    const conv_8 = extractConvPairParams(512, 512, "mobilenetv1/conv_8");
    const conv_9 = extractConvPairParams(512, 512, "mobilenetv1/conv_9");
    const conv_10 = extractConvPairParams(512, 512, "mobilenetv1/conv_10");
    const conv_11 = extractConvPairParams(512, 512, "mobilenetv1/conv_11");
    const conv_12 = extractConvPairParams(512, 1024, "mobilenetv1/conv_12");
    const conv_13 = extractConvPairParams(1024, 1024, "mobilenetv1/conv_13");
    return {
      conv_0,
      conv_1,
      conv_2,
      conv_3,
      conv_4,
      conv_5,
      conv_6,
      conv_7,
      conv_8,
      conv_9,
      conv_10,
      conv_11,
      conv_12,
      conv_13
    };
  }
  function extractPredictionLayerParams() {
    const conv_0 = extractPointwiseConvParams(1024, 256, 1, "prediction_layer/conv_0");
    const conv_1 = extractPointwiseConvParams(256, 512, 3, "prediction_layer/conv_1");
    const conv_2 = extractPointwiseConvParams(512, 128, 1, "prediction_layer/conv_2");
    const conv_3 = extractPointwiseConvParams(128, 256, 3, "prediction_layer/conv_3");
    const conv_4 = extractPointwiseConvParams(256, 128, 1, "prediction_layer/conv_4");
    const conv_5 = extractPointwiseConvParams(128, 256, 3, "prediction_layer/conv_5");
    const conv_6 = extractPointwiseConvParams(256, 64, 1, "prediction_layer/conv_6");
    const conv_7 = extractPointwiseConvParams(64, 128, 3, "prediction_layer/conv_7");
    const box_encoding_0_predictor = extractConvParams(512, 12, 1, "prediction_layer/box_predictor_0/box_encoding_predictor");
    const class_predictor_0 = extractConvParams(512, 9, 1, "prediction_layer/box_predictor_0/class_predictor");
    const box_encoding_1_predictor = extractConvParams(1024, 24, 1, "prediction_layer/box_predictor_1/box_encoding_predictor");
    const class_predictor_1 = extractConvParams(1024, 18, 1, "prediction_layer/box_predictor_1/class_predictor");
    const box_encoding_2_predictor = extractConvParams(512, 24, 1, "prediction_layer/box_predictor_2/box_encoding_predictor");
    const class_predictor_2 = extractConvParams(512, 18, 1, "prediction_layer/box_predictor_2/class_predictor");
    const box_encoding_3_predictor = extractConvParams(256, 24, 1, "prediction_layer/box_predictor_3/box_encoding_predictor");
    const class_predictor_3 = extractConvParams(256, 18, 1, "prediction_layer/box_predictor_3/class_predictor");
    const box_encoding_4_predictor = extractConvParams(256, 24, 1, "prediction_layer/box_predictor_4/box_encoding_predictor");
    const class_predictor_4 = extractConvParams(256, 18, 1, "prediction_layer/box_predictor_4/class_predictor");
    const box_encoding_5_predictor = extractConvParams(128, 24, 1, "prediction_layer/box_predictor_5/box_encoding_predictor");
    const class_predictor_5 = extractConvParams(128, 18, 1, "prediction_layer/box_predictor_5/class_predictor");
    const box_predictor_0 = {
      box_encoding_predictor: box_encoding_0_predictor,
      class_predictor: class_predictor_0
    };
    const box_predictor_1 = {
      box_encoding_predictor: box_encoding_1_predictor,
      class_predictor: class_predictor_1
    };
    const box_predictor_2 = {
      box_encoding_predictor: box_encoding_2_predictor,
      class_predictor: class_predictor_2
    };
    const box_predictor_3 = {
      box_encoding_predictor: box_encoding_3_predictor,
      class_predictor: class_predictor_3
    };
    const box_predictor_4 = {
      box_encoding_predictor: box_encoding_4_predictor,
      class_predictor: class_predictor_4
    };
    const box_predictor_5 = {
      box_encoding_predictor: box_encoding_5_predictor,
      class_predictor: class_predictor_5
    };
    return {
      conv_0,
      conv_1,
      conv_2,
      conv_3,
      conv_4,
      conv_5,
      conv_6,
      conv_7,
      box_predictor_0,
      box_predictor_1,
      box_predictor_2,
      box_predictor_3,
      box_predictor_4,
      box_predictor_5
    };
  }
  return {
    extractMobilenetV1Params,
    extractPredictionLayerParams
  };
}
function extractParams6(weights) {
  const paramMappings = [];
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const {
    extractMobilenetV1Params,
    extractPredictionLayerParams
  } = extractorsFactory5(extractWeights, paramMappings);
  const mobilenetv1 = extractMobilenetV1Params();
  const prediction_layer = extractPredictionLayerParams();
  const extra_dim = tfjs_esm_exports.tensor3d(extractWeights(5118 * 4), [1, 5118, 4]);
  const output_layer = {
    extra_dim
  };
  paramMappings.push({ paramPath: "output_layer/extra_dim" });
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return {
    params: {
      mobilenetv1,
      prediction_layer,
      output_layer
    },
    paramMappings
  };
}

// src/ssdMobilenetv1/extractParamsFromWeightMap.ts
function extractorsFactory6(weightMap, paramMappings) {
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  function extractPointwiseConvParams(prefix, idx, mappedPrefix) {
    const filters = extractWeightEntry(`${prefix}/Conv2d_${idx}_pointwise/weights`, 4, `${mappedPrefix}/filters`);
    const batch_norm_offset = extractWeightEntry(`${prefix}/Conv2d_${idx}_pointwise/convolution_bn_offset`, 1, `${mappedPrefix}/batch_norm_offset`);
    return { filters, batch_norm_offset };
  }
  function extractConvPairParams(idx) {
    const mappedPrefix = `mobilenetv1/conv_${idx}`;
    const prefixDepthwiseConv = `MobilenetV1/Conv2d_${idx}_depthwise`;
    const mappedPrefixDepthwiseConv = `${mappedPrefix}/depthwise_conv`;
    const mappedPrefixPointwiseConv = `${mappedPrefix}/pointwise_conv`;
    const filters = extractWeightEntry(`${prefixDepthwiseConv}/depthwise_weights`, 4, `${mappedPrefixDepthwiseConv}/filters`);
    const batch_norm_scale = extractWeightEntry(`${prefixDepthwiseConv}/BatchNorm/gamma`, 1, `${mappedPrefixDepthwiseConv}/batch_norm_scale`);
    const batch_norm_offset = extractWeightEntry(`${prefixDepthwiseConv}/BatchNorm/beta`, 1, `${mappedPrefixDepthwiseConv}/batch_norm_offset`);
    const batch_norm_mean = extractWeightEntry(`${prefixDepthwiseConv}/BatchNorm/moving_mean`, 1, `${mappedPrefixDepthwiseConv}/batch_norm_mean`);
    const batch_norm_variance = extractWeightEntry(`${prefixDepthwiseConv}/BatchNorm/moving_variance`, 1, `${mappedPrefixDepthwiseConv}/batch_norm_variance`);
    return {
      depthwise_conv: {
        filters,
        batch_norm_scale,
        batch_norm_offset,
        batch_norm_mean,
        batch_norm_variance
      },
      pointwise_conv: extractPointwiseConvParams("MobilenetV1", idx, mappedPrefixPointwiseConv)
    };
  }
  function extractMobilenetV1Params() {
    return {
      conv_0: extractPointwiseConvParams("MobilenetV1", 0, "mobilenetv1/conv_0"),
      conv_1: extractConvPairParams(1),
      conv_2: extractConvPairParams(2),
      conv_3: extractConvPairParams(3),
      conv_4: extractConvPairParams(4),
      conv_5: extractConvPairParams(5),
      conv_6: extractConvPairParams(6),
      conv_7: extractConvPairParams(7),
      conv_8: extractConvPairParams(8),
      conv_9: extractConvPairParams(9),
      conv_10: extractConvPairParams(10),
      conv_11: extractConvPairParams(11),
      conv_12: extractConvPairParams(12),
      conv_13: extractConvPairParams(13)
    };
  }
  function extractConvParams(prefix, mappedPrefix) {
    const filters = extractWeightEntry(`${prefix}/weights`, 4, `${mappedPrefix}/filters`);
    const bias = extractWeightEntry(`${prefix}/biases`, 1, `${mappedPrefix}/bias`);
    return { filters, bias };
  }
  function extractBoxPredictorParams(idx) {
    const box_encoding_predictor = extractConvParams(`Prediction/BoxPredictor_${idx}/BoxEncodingPredictor`, `prediction_layer/box_predictor_${idx}/box_encoding_predictor`);
    const class_predictor = extractConvParams(`Prediction/BoxPredictor_${idx}/ClassPredictor`, `prediction_layer/box_predictor_${idx}/class_predictor`);
    return { box_encoding_predictor, class_predictor };
  }
  function extractPredictionLayerParams() {
    return {
      conv_0: extractPointwiseConvParams("Prediction", 0, "prediction_layer/conv_0"),
      conv_1: extractPointwiseConvParams("Prediction", 1, "prediction_layer/conv_1"),
      conv_2: extractPointwiseConvParams("Prediction", 2, "prediction_layer/conv_2"),
      conv_3: extractPointwiseConvParams("Prediction", 3, "prediction_layer/conv_3"),
      conv_4: extractPointwiseConvParams("Prediction", 4, "prediction_layer/conv_4"),
      conv_5: extractPointwiseConvParams("Prediction", 5, "prediction_layer/conv_5"),
      conv_6: extractPointwiseConvParams("Prediction", 6, "prediction_layer/conv_6"),
      conv_7: extractPointwiseConvParams("Prediction", 7, "prediction_layer/conv_7"),
      box_predictor_0: extractBoxPredictorParams(0),
      box_predictor_1: extractBoxPredictorParams(1),
      box_predictor_2: extractBoxPredictorParams(2),
      box_predictor_3: extractBoxPredictorParams(3),
      box_predictor_4: extractBoxPredictorParams(4),
      box_predictor_5: extractBoxPredictorParams(5)
    };
  }
  return {
    extractMobilenetV1Params,
    extractPredictionLayerParams
  };
}
function extractParamsFromWeightMap6(weightMap) {
  const paramMappings = [];
  const {
    extractMobilenetV1Params,
    extractPredictionLayerParams
  } = extractorsFactory6(weightMap, paramMappings);
  const extra_dim = weightMap["Output/extra_dim"];
  paramMappings.push({ originalPath: "Output/extra_dim", paramPath: "output_layer/extra_dim" });
  if (!isTensor3D(extra_dim)) {
    throw new Error(`expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have ${extra_dim}`);
  }
  const params = {
    mobilenetv1: extractMobilenetV1Params(),
    prediction_layer: extractPredictionLayerParams(),
    output_layer: {
      extra_dim
    }
  };
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/ssdMobilenetv1/pointwiseConvLayer.ts
function pointwiseConvLayer(x, params, strides) {
  return tfjs_esm_exports.tidy(() => {
    let out = tfjs_esm_exports.conv2d(x, params.filters, strides, "same");
    out = tfjs_esm_exports.add(out, params.batch_norm_offset);
    return tfjs_esm_exports.clipByValue(out, 0, 6);
  });
}

// src/ssdMobilenetv1/mobileNetV1.ts
var epsilon = 0.0010000000474974513;
function depthwiseConvLayer(x, params, strides) {
  return tfjs_esm_exports.tidy(() => {
    let out = tfjs_esm_exports.depthwiseConv2d(x, params.filters, strides, "same");
    out = tfjs_esm_exports.batchNorm(out, params.batch_norm_mean, params.batch_norm_variance, params.batch_norm_offset, params.batch_norm_scale, epsilon);
    return tfjs_esm_exports.clipByValue(out, 0, 6);
  });
}
function getStridesForLayerIdx(layerIdx) {
  return [2, 4, 6, 12].some((idx) => idx === layerIdx) ? [2, 2] : [1, 1];
}
function mobileNetV1(x, params) {
  return tfjs_esm_exports.tidy(() => {
    let conv11;
    let out = pointwiseConvLayer(x, params.conv_0, [2, 2]);
    const convPairParams = [
      params.conv_1,
      params.conv_2,
      params.conv_3,
      params.conv_4,
      params.conv_5,
      params.conv_6,
      params.conv_7,
      params.conv_8,
      params.conv_9,
      params.conv_10,
      params.conv_11,
      params.conv_12,
      params.conv_13
    ];
    convPairParams.forEach((param, i) => {
      const layerIdx = i + 1;
      const depthwiseConvStrides = getStridesForLayerIdx(layerIdx);
      out = depthwiseConvLayer(out, param.depthwise_conv, depthwiseConvStrides);
      out = pointwiseConvLayer(out, param.pointwise_conv, [1, 1]);
      if (layerIdx === 11)
        conv11 = out;
    });
    if (conv11 === null) {
      throw new Error("mobileNetV1 - output of conv layer 11 is null");
    }
    return {
      out,
      conv11
    };
  });
}

// src/ssdMobilenetv1/nonMaxSuppression.ts
function IOU(boxes, i, j) {
  const boxesData = boxes.arraySync();
  const yminI = Math.min(boxesData[i][0], boxesData[i][2]);
  const xminI = Math.min(boxesData[i][1], boxesData[i][3]);
  const ymaxI = Math.max(boxesData[i][0], boxesData[i][2]);
  const xmaxI = Math.max(boxesData[i][1], boxesData[i][3]);
  const yminJ = Math.min(boxesData[j][0], boxesData[j][2]);
  const xminJ = Math.min(boxesData[j][1], boxesData[j][3]);
  const ymaxJ = Math.max(boxesData[j][0], boxesData[j][2]);
  const xmaxJ = Math.max(boxesData[j][1], boxesData[j][3]);
  const areaI = (ymaxI - yminI) * (xmaxI - xminI);
  const areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
  if (areaI <= 0 || areaJ <= 0)
    return 0;
  const intersectionYmin = Math.max(yminI, yminJ);
  const intersectionXmin = Math.max(xminI, xminJ);
  const intersectionYmax = Math.min(ymaxI, ymaxJ);
  const intersectionXmax = Math.min(xmaxI, xmaxJ);
  const intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0) * Math.max(intersectionXmax - intersectionXmin, 0);
  return intersectionArea / (areaI + areaJ - intersectionArea);
}
function nonMaxSuppression2(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
  const numBoxes = boxes.shape[0];
  const outputSize = Math.min(maxOutputSize, numBoxes);
  const candidates = scores.map((score, boxIndex) => ({ score, boxIndex })).filter((c) => c.score > scoreThreshold).sort((c1, c2) => c2.score - c1.score);
  const suppressFunc = (x) => x <= iouThreshold ? 1 : 0;
  const selected = [];
  candidates.forEach((c) => {
    if (selected.length >= outputSize)
      return;
    const originalScore = c.score;
    for (let j = selected.length - 1; j >= 0; --j) {
      const iou2 = IOU(boxes, c.boxIndex, selected[j]);
      if (iou2 === 0)
        continue;
      c.score *= suppressFunc(iou2);
      if (c.score <= scoreThreshold)
        break;
    }
    if (originalScore === c.score) {
      selected.push(c.boxIndex);
    }
  });
  return selected;
}

// src/ssdMobilenetv1/outputLayer.ts
function getCenterCoordinatesAndSizesLayer(x) {
  const vec = tfjs_esm_exports.unstack(tfjs_esm_exports.transpose(x, [1, 0]));
  const sizes = [
    tfjs_esm_exports.sub(vec[2], vec[0]),
    tfjs_esm_exports.sub(vec[3], vec[1])
  ];
  const centers = [
    tfjs_esm_exports.add(vec[0], tfjs_esm_exports.div(sizes[0], 2)),
    tfjs_esm_exports.add(vec[1], tfjs_esm_exports.div(sizes[1], 2))
  ];
  return { sizes, centers };
}
function decodeBoxesLayer(x0, x1) {
  const { sizes, centers } = getCenterCoordinatesAndSizesLayer(x0);
  const vec = tfjs_esm_exports.unstack(tfjs_esm_exports.transpose(x1, [1, 0]));
  const div0_out = tfjs_esm_exports.div(tfjs_esm_exports.mul(tfjs_esm_exports.exp(tfjs_esm_exports.div(vec[2], 5)), sizes[0]), 2);
  const add0_out = tfjs_esm_exports.add(tfjs_esm_exports.mul(tfjs_esm_exports.div(vec[0], 10), sizes[0]), centers[0]);
  const div1_out = tfjs_esm_exports.div(tfjs_esm_exports.mul(tfjs_esm_exports.exp(tfjs_esm_exports.div(vec[3], 5)), sizes[1]), 2);
  const add1_out = tfjs_esm_exports.add(tfjs_esm_exports.mul(tfjs_esm_exports.div(vec[1], 10), sizes[1]), centers[1]);
  return tfjs_esm_exports.transpose(tfjs_esm_exports.stack([
    tfjs_esm_exports.sub(add0_out, div0_out),
    tfjs_esm_exports.sub(add1_out, div1_out),
    tfjs_esm_exports.add(add0_out, div0_out),
    tfjs_esm_exports.add(add1_out, div1_out)
  ]), [1, 0]);
}
function outputLayer(boxPredictions, classPredictions, params) {
  return tfjs_esm_exports.tidy(() => {
    const batchSize = boxPredictions.shape[0];
    let boxes = decodeBoxesLayer(tfjs_esm_exports.reshape(tfjs_esm_exports.tile(params.extra_dim, [batchSize, 1, 1]), [-1, 4]), tfjs_esm_exports.reshape(boxPredictions, [-1, 4]));
    boxes = tfjs_esm_exports.reshape(boxes, [batchSize, boxes.shape[0] / batchSize, 4]);
    const scoresAndClasses = tfjs_esm_exports.sigmoid(tfjs_esm_exports.slice(classPredictions, [0, 0, 1], [-1, -1, -1]));
    let scores = tfjs_esm_exports.slice(scoresAndClasses, [0, 0, 0], [-1, -1, 1]);
    scores = tfjs_esm_exports.reshape(scores, [batchSize, scores.shape[1]]);
    const boxesByBatch = tfjs_esm_exports.unstack(boxes);
    const scoresByBatch = tfjs_esm_exports.unstack(scores);
    return { boxes: boxesByBatch, scores: scoresByBatch };
  });
}

// src/ssdMobilenetv1/boxPredictionLayer.ts
function boxPredictionLayer(x, params) {
  return tfjs_esm_exports.tidy(() => {
    const batchSize = x.shape[0];
    const boxPredictionEncoding = tfjs_esm_exports.reshape(convLayer(x, params.box_encoding_predictor), [batchSize, -1, 1, 4]);
    const classPrediction = tfjs_esm_exports.reshape(convLayer(x, params.class_predictor), [batchSize, -1, 3]);
    return { boxPredictionEncoding, classPrediction };
  });
}

// src/ssdMobilenetv1/predictionLayer.ts
function predictionLayer(x, conv11, params) {
  return tfjs_esm_exports.tidy(() => {
    const conv0 = pointwiseConvLayer(x, params.conv_0, [1, 1]);
    const conv1 = pointwiseConvLayer(conv0, params.conv_1, [2, 2]);
    const conv22 = pointwiseConvLayer(conv1, params.conv_2, [1, 1]);
    const conv3 = pointwiseConvLayer(conv22, params.conv_3, [2, 2]);
    const conv4 = pointwiseConvLayer(conv3, params.conv_4, [1, 1]);
    const conv5 = pointwiseConvLayer(conv4, params.conv_5, [2, 2]);
    const conv6 = pointwiseConvLayer(conv5, params.conv_6, [1, 1]);
    const conv7 = pointwiseConvLayer(conv6, params.conv_7, [2, 2]);
    const boxPrediction0 = boxPredictionLayer(conv11, params.box_predictor_0);
    const boxPrediction1 = boxPredictionLayer(x, params.box_predictor_1);
    const boxPrediction2 = boxPredictionLayer(conv1, params.box_predictor_2);
    const boxPrediction3 = boxPredictionLayer(conv3, params.box_predictor_3);
    const boxPrediction4 = boxPredictionLayer(conv5, params.box_predictor_4);
    const boxPrediction5 = boxPredictionLayer(conv7, params.box_predictor_5);
    const boxPredictions = tfjs_esm_exports.concat([
      boxPrediction0.boxPredictionEncoding,
      boxPrediction1.boxPredictionEncoding,
      boxPrediction2.boxPredictionEncoding,
      boxPrediction3.boxPredictionEncoding,
      boxPrediction4.boxPredictionEncoding,
      boxPrediction5.boxPredictionEncoding
    ], 1);
    const classPredictions = tfjs_esm_exports.concat([
      boxPrediction0.classPrediction,
      boxPrediction1.classPrediction,
      boxPrediction2.classPrediction,
      boxPrediction3.classPrediction,
      boxPrediction4.classPrediction,
      boxPrediction5.classPrediction
    ], 1);
    return {
      boxPredictions,
      classPredictions
    };
  });
}

// src/ssdMobilenetv1/SsdMobilenetv1Options.ts
var SsdMobilenetv1Options = class {
  constructor({ minConfidence, maxResults } = {}) {
    this._name = "SsdMobilenetv1Options";
    this._minConfidence = minConfidence || 0.5;
    this._maxResults = maxResults || 100;
    if (typeof this._minConfidence !== "number" || this._minConfidence <= 0 || this._minConfidence >= 1) {
      throw new Error(`${this._name} - expected minConfidence to be a number between 0 and 1`);
    }
    if (typeof this._maxResults !== "number") {
      throw new Error(`${this._name} - expected maxResults to be a number`);
    }
  }
  get minConfidence() {
    return this._minConfidence;
  }
  get maxResults() {
    return this._maxResults;
  }
};

// src/ssdMobilenetv1/SsdMobilenetv1.ts
var SsdMobilenetv1 = class extends NeuralNetwork {
  constructor() {
    super("SsdMobilenetv1");
  }
  forwardInput(input) {
    const { params } = this;
    if (!params)
      throw new Error("SsdMobilenetv1 - load model before inference");
    return tfjs_esm_exports.tidy(() => {
      const batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(512, false), "float32");
      const x = tfjs_esm_exports.sub(tfjs_esm_exports.div(batchTensor, 127.5), 1);
      const features = mobileNetV1(x, params.mobilenetv1);
      const { boxPredictions, classPredictions } = predictionLayer(features.out, features.conv11, params.prediction_layer);
      return outputLayer(boxPredictions, classPredictions, params.output_layer);
    });
  }
  async forward(input) {
    return this.forwardInput(await toNetInput(input));
  }
  async locateFaces(input, options = {}) {
    const { maxResults, minConfidence } = new SsdMobilenetv1Options(options);
    const netInput = await toNetInput(input);
    const { boxes: _boxes, scores: _scores } = this.forwardInput(netInput);
    const boxes = _boxes[0];
    const scores = _scores[0];
    for (let i = 1; i < _boxes.length; i++) {
      _boxes[i].dispose();
      _scores[i].dispose();
    }
    const scoresData = Array.from(scores.dataSync());
    const iouThreshold = 0.5;
    const indices = nonMaxSuppression2(boxes, scoresData, maxResults, iouThreshold, minConfidence);
    const reshapedDims = netInput.getReshapedInputDimensions(0);
    const inputSize = netInput.inputSize;
    const padX = inputSize / reshapedDims.width;
    const padY = inputSize / reshapedDims.height;
    const boxesData = boxes.arraySync();
    const results = indices.map((idx) => {
      const [top, bottom] = [
        Math.max(0, boxesData[idx][0]),
        Math.min(1, boxesData[idx][2])
      ].map((val) => val * padY);
      const [left, right] = [
        Math.max(0, boxesData[idx][1]),
        Math.min(1, boxesData[idx][3])
      ].map((val) => val * padX);
      return new FaceDetection(scoresData[idx], new Rect(left, top, right - left, bottom - top), { height: netInput.getInputHeight(0), width: netInput.getInputWidth(0) });
    });
    boxes.dispose();
    scores.dispose();
    return results;
  }
  getDefaultModelName() {
    return "ssd_mobilenetv1_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMap6(weightMap);
  }
  extractParams(weights) {
    return extractParams6(weights);
  }
};

// src/ssdMobilenetv1/index.ts
function createSsdMobilenetv1(weights) {
  const net = new SsdMobilenetv1();
  net.extractWeights(weights);
  return net;
}
function createFaceDetectionNet(weights) {
  return createSsdMobilenetv1(weights);
}
var FaceDetectionNet = class extends SsdMobilenetv1 {
};

// src/tinyYolov2/const.ts
var IOU_THRESHOLD = 0.4;
var BOX_ANCHORS = [
  new Point(0.738768, 0.874946),
  new Point(2.42204, 2.65704),
  new Point(4.30971, 7.04493),
  new Point(10.246, 4.59428),
  new Point(12.6868, 11.8741)
];
var BOX_ANCHORS_SEPARABLE = [
  new Point(1.603231, 2.094468),
  new Point(6.041143, 7.080126),
  new Point(2.882459, 3.518061),
  new Point(4.266906, 5.178857),
  new Point(9.041765, 10.66308)
];
var MEAN_RGB_SEPARABLE = [117.001, 114.697, 97.404];
var DEFAULT_MODEL_NAME = "tiny_yolov2_model";
var DEFAULT_MODEL_NAME_SEPARABLE_CONV = "tiny_yolov2_separable_conv_model";

// src/tinyYolov2/config.ts
var isNumber = (arg) => typeof arg === "number";
function validateConfig(config) {
  if (!config) {
    throw new Error(`invalid config: ${config}`);
  }
  if (typeof config.withSeparableConvs !== "boolean") {
    throw new Error(`config.withSeparableConvs has to be a boolean, have: ${config.withSeparableConvs}`);
  }
  if (!isNumber(config.iouThreshold) || config.iouThreshold < 0 || config.iouThreshold > 1) {
    throw new Error(`config.iouThreshold has to be a number between [0, 1], have: ${config.iouThreshold}`);
  }
  if (!Array.isArray(config.classes) || !config.classes.length || !config.classes.every((c) => typeof c === "string")) {
    throw new Error(`config.classes has to be an array class names: string[], have: ${JSON.stringify(config.classes)}`);
  }
  if (!Array.isArray(config.anchors) || !config.anchors.length || !config.anchors.map((a) => a || {}).every((a) => isNumber(a.x) && isNumber(a.y))) {
    throw new Error(`config.anchors has to be an array of { x: number, y: number }, have: ${JSON.stringify(config.anchors)}`);
  }
  if (config.meanRgb && (!Array.isArray(config.meanRgb) || config.meanRgb.length !== 3 || !config.meanRgb.every(isNumber))) {
    throw new Error(`config.meanRgb has to be an array of shape [number, number, number], have: ${JSON.stringify(config.meanRgb)}`);
  }
}

// src/tinyYolov2/leaky.ts
function leaky(x) {
  return tfjs_esm_exports.tidy(() => {
    const min = tfjs_esm_exports.mul(x, tfjs_esm_exports.scalar(0.10000000149011612));
    return tfjs_esm_exports.add(tfjs_esm_exports.relu(tfjs_esm_exports.sub(x, min)), min);
  });
}

// src/tinyYolov2/convWithBatchNorm.ts
function convWithBatchNorm(x, params) {
  return tfjs_esm_exports.tidy(() => {
    let out = tfjs_esm_exports.pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
    out = tfjs_esm_exports.conv2d(out, params.conv.filters, [1, 1], "valid");
    out = tfjs_esm_exports.sub(out, params.bn.sub);
    out = tfjs_esm_exports.mul(out, params.bn.truediv);
    out = tfjs_esm_exports.add(out, params.conv.bias);
    return leaky(out);
  });
}

// src/tinyYolov2/depthwiseSeparableConv.ts
function depthwiseSeparableConv2(x, params) {
  return tfjs_esm_exports.tidy(() => {
    let out = tfjs_esm_exports.pad(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
    out = tfjs_esm_exports.separableConv2d(out, params.depthwise_filter, params.pointwise_filter, [1, 1], "valid");
    out = tfjs_esm_exports.add(out, params.bias);
    return leaky(out);
  });
}

// src/tinyYolov2/extractParams.ts
function extractorsFactory7(extractWeights, paramMappings) {
  const extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
  function extractBatchNormParams(size, mappedPrefix) {
    const sub6 = tfjs_esm_exports.tensor1d(extractWeights(size));
    const truediv = tfjs_esm_exports.tensor1d(extractWeights(size));
    paramMappings.push({ paramPath: `${mappedPrefix}/sub` }, { paramPath: `${mappedPrefix}/truediv` });
    return { sub: sub6, truediv };
  }
  function extractConvWithBatchNormParams(channelsIn, channelsOut, mappedPrefix) {
    const conv3 = extractConvParams(channelsIn, channelsOut, 3, `${mappedPrefix}/conv`);
    const bn = extractBatchNormParams(channelsOut, `${mappedPrefix}/bn`);
    return { conv: conv3, bn };
  }
  const extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
  return {
    extractConvParams,
    extractConvWithBatchNormParams,
    extractSeparableConvParams
  };
}
function extractParams7(weights, config, boxEncodingSize, filterSizes) {
  const {
    extractWeights,
    getRemainingWeights
  } = extractWeightsFactory(weights);
  const paramMappings = [];
  const {
    extractConvParams,
    extractConvWithBatchNormParams,
    extractSeparableConvParams
  } = extractorsFactory7(extractWeights, paramMappings);
  let params;
  if (config.withSeparableConvs) {
    const [s0, s1, s2, s3, s4, s5, s6, s7, s8] = filterSizes;
    const conv0 = config.isFirstLayerConv2d ? extractConvParams(s0, s1, 3, "conv0") : extractSeparableConvParams(s0, s1, "conv0");
    const conv1 = extractSeparableConvParams(s1, s2, "conv1");
    const conv22 = extractSeparableConvParams(s2, s3, "conv2");
    const conv3 = extractSeparableConvParams(s3, s4, "conv3");
    const conv4 = extractSeparableConvParams(s4, s5, "conv4");
    const conv5 = extractSeparableConvParams(s5, s6, "conv5");
    const conv6 = s7 ? extractSeparableConvParams(s6, s7, "conv6") : void 0;
    const conv7 = s8 ? extractSeparableConvParams(s7, s8, "conv7") : void 0;
    const conv8 = extractConvParams(s8 || s7 || s6, 5 * boxEncodingSize, 1, "conv8");
    params = {
      conv0,
      conv1,
      conv2: conv22,
      conv3,
      conv4,
      conv5,
      conv6,
      conv7,
      conv8
    };
  } else {
    const [s0, s1, s2, s3, s4, s5, s6, s7, s8] = filterSizes;
    const conv0 = extractConvWithBatchNormParams(s0, s1, "conv0");
    const conv1 = extractConvWithBatchNormParams(s1, s2, "conv1");
    const conv22 = extractConvWithBatchNormParams(s2, s3, "conv2");
    const conv3 = extractConvWithBatchNormParams(s3, s4, "conv3");
    const conv4 = extractConvWithBatchNormParams(s4, s5, "conv4");
    const conv5 = extractConvWithBatchNormParams(s5, s6, "conv5");
    const conv6 = extractConvWithBatchNormParams(s6, s7, "conv6");
    const conv7 = extractConvWithBatchNormParams(s7, s8, "conv7");
    const conv8 = extractConvParams(s8, 5 * boxEncodingSize, 1, "conv8");
    params = {
      conv0,
      conv1,
      conv2: conv22,
      conv3,
      conv4,
      conv5,
      conv6,
      conv7,
      conv8
    };
  }
  if (getRemainingWeights().length !== 0) {
    throw new Error(`weights remaing after extract: ${getRemainingWeights().length}`);
  }
  return { params, paramMappings };
}

// src/tinyYolov2/extractParamsFromWeightMap.ts
function extractorsFactory8(weightMap, paramMappings) {
  const extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
  function extractBatchNormParams(prefix) {
    const sub6 = extractWeightEntry(`${prefix}/sub`, 1);
    const truediv = extractWeightEntry(`${prefix}/truediv`, 1);
    return { sub: sub6, truediv };
  }
  function extractConvParams(prefix) {
    const filters = extractWeightEntry(`${prefix}/filters`, 4);
    const bias = extractWeightEntry(`${prefix}/bias`, 1);
    return { filters, bias };
  }
  function extractConvWithBatchNormParams(prefix) {
    const conv3 = extractConvParams(`${prefix}/conv`);
    const bn = extractBatchNormParams(`${prefix}/bn`);
    return { conv: conv3, bn };
  }
  const extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
  return {
    extractConvParams,
    extractConvWithBatchNormParams,
    extractSeparableConvParams
  };
}
function extractParamsFromWeightMap7(weightMap, config) {
  const paramMappings = [];
  const {
    extractConvParams,
    extractConvWithBatchNormParams,
    extractSeparableConvParams
  } = extractorsFactory8(weightMap, paramMappings);
  let params;
  if (config.withSeparableConvs) {
    const numFilters = config.filterSizes && config.filterSizes.length || 9;
    params = {
      conv0: config.isFirstLayerConv2d ? extractConvParams("conv0") : extractSeparableConvParams("conv0"),
      conv1: extractSeparableConvParams("conv1"),
      conv2: extractSeparableConvParams("conv2"),
      conv3: extractSeparableConvParams("conv3"),
      conv4: extractSeparableConvParams("conv4"),
      conv5: extractSeparableConvParams("conv5"),
      conv6: numFilters > 7 ? extractSeparableConvParams("conv6") : void 0,
      conv7: numFilters > 8 ? extractSeparableConvParams("conv7") : void 0,
      conv8: extractConvParams("conv8")
    };
  } else {
    params = {
      conv0: extractConvWithBatchNormParams("conv0"),
      conv1: extractConvWithBatchNormParams("conv1"),
      conv2: extractConvWithBatchNormParams("conv2"),
      conv3: extractConvWithBatchNormParams("conv3"),
      conv4: extractConvWithBatchNormParams("conv4"),
      conv5: extractConvWithBatchNormParams("conv5"),
      conv6: extractConvWithBatchNormParams("conv6"),
      conv7: extractConvWithBatchNormParams("conv7"),
      conv8: extractConvParams("conv8")
    };
  }
  disposeUnusedWeightTensors(weightMap, paramMappings);
  return { params, paramMappings };
}

// src/tinyYolov2/TinyYolov2Options.ts
var TinyYolov2Options = class {
  constructor({ inputSize, scoreThreshold } = {}) {
    this._name = "TinyYolov2Options";
    this._inputSize = inputSize || 416;
    this._scoreThreshold = scoreThreshold || 0.5;
    if (typeof this._inputSize !== "number" || this._inputSize % 32 !== 0) {
      throw new Error(`${this._name} - expected inputSize to be a number divisible by 32`);
    }
    if (typeof this._scoreThreshold !== "number" || this._scoreThreshold <= 0 || this._scoreThreshold >= 1) {
      throw new Error(`${this._name} - expected scoreThreshold to be a number between 0 and 1`);
    }
  }
  get inputSize() {
    return this._inputSize;
  }
  get scoreThreshold() {
    return this._scoreThreshold;
  }
};

// src/tinyYolov2/TinyYolov2Base.ts
var _TinyYolov2Base = class extends NeuralNetwork {
  constructor(config) {
    super("TinyYolov2");
    validateConfig(config);
    this._config = config;
  }
  get config() {
    return this._config;
  }
  get withClassScores() {
    return this.config.withClassScores || this.config.classes.length > 1;
  }
  get boxEncodingSize() {
    return 5 + (this.withClassScores ? this.config.classes.length : 0);
  }
  runTinyYolov2(x, params) {
    let out = convWithBatchNorm(x, params.conv0);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = convWithBatchNorm(out, params.conv1);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = convWithBatchNorm(out, params.conv2);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = convWithBatchNorm(out, params.conv3);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = convWithBatchNorm(out, params.conv4);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = convWithBatchNorm(out, params.conv5);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [1, 1], "same");
    out = convWithBatchNorm(out, params.conv6);
    out = convWithBatchNorm(out, params.conv7);
    return convLayer(out, params.conv8, "valid", false);
  }
  runMobilenet(x, params) {
    let out = this.config.isFirstLayerConv2d ? leaky(convLayer(x, params.conv0, "valid", false)) : depthwiseSeparableConv2(x, params.conv0);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = depthwiseSeparableConv2(out, params.conv1);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = depthwiseSeparableConv2(out, params.conv2);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = depthwiseSeparableConv2(out, params.conv3);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = depthwiseSeparableConv2(out, params.conv4);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [2, 2], "same");
    out = depthwiseSeparableConv2(out, params.conv5);
    out = tfjs_esm_exports.maxPool(out, [2, 2], [1, 1], "same");
    out = params.conv6 ? depthwiseSeparableConv2(out, params.conv6) : out;
    out = params.conv7 ? depthwiseSeparableConv2(out, params.conv7) : out;
    return convLayer(out, params.conv8, "valid", false);
  }
  forwardInput(input, inputSize) {
    const { params } = this;
    if (!params) {
      throw new Error("TinyYolov2 - load model before inference");
    }
    return tfjs_esm_exports.tidy(() => {
      let batchTensor = tfjs_esm_exports.cast(input.toBatchTensor(inputSize, false), "float32");
      batchTensor = this.config.meanRgb ? normalize(batchTensor, this.config.meanRgb) : batchTensor;
      batchTensor = batchTensor.div(255);
      return this.config.withSeparableConvs ? this.runMobilenet(batchTensor, params) : this.runTinyYolov2(batchTensor, params);
    });
  }
  async forward(input, inputSize) {
    return this.forwardInput(await toNetInput(input), inputSize);
  }
  async detect(input, forwardParams = {}) {
    const { inputSize, scoreThreshold } = new TinyYolov2Options(forwardParams);
    const netInput = await toNetInput(input);
    const out = await this.forwardInput(netInput, inputSize);
    const out0 = tfjs_esm_exports.tidy(() => tfjs_esm_exports.unstack(out)[0].expandDims());
    const inputDimensions = {
      width: netInput.getInputWidth(0),
      height: netInput.getInputHeight(0)
    };
    const results = await this.extractBoxes(out0, netInput.getReshapedInputDimensions(0), scoreThreshold);
    out.dispose();
    out0.dispose();
    const boxes = results.map((res) => res.box);
    const scores = results.map((res) => res.score);
    const classScores = results.map((res) => res.classScore);
    const classNames = results.map((res) => this.config.classes[res.label]);
    const indices = nonMaxSuppression(boxes.map((box) => box.rescale(inputSize)), scores, this.config.iouThreshold, true);
    const detections = indices.map((idx) => new ObjectDetection(scores[idx], classScores[idx], classNames[idx], boxes[idx], inputDimensions));
    return detections;
  }
  getDefaultModelName() {
    return "";
  }
  extractParamsFromWeightMap(weightMap) {
    return extractParamsFromWeightMap7(weightMap, this.config);
  }
  extractParams(weights) {
    const filterSizes = this.config.filterSizes || _TinyYolov2Base.DEFAULT_FILTER_SIZES;
    const numFilters = filterSizes ? filterSizes.length : void 0;
    if (numFilters !== 7 && numFilters !== 8 && numFilters !== 9) {
      throw new Error(`TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found ${numFilters} filterSizes in config`);
    }
    return extractParams7(weights, this.config, this.boxEncodingSize, filterSizes);
  }
  async extractBoxes(outputTensor, inputBlobDimensions, scoreThreshold) {
    const { width, height } = inputBlobDimensions;
    const inputSize = Math.max(width, height);
    const correctionFactorX = inputSize / width;
    const correctionFactorY = inputSize / height;
    const numCells = outputTensor.shape[1];
    const numBoxes = this.config.anchors.length;
    const [boxesTensor, scoresTensor, classScoresTensor] = tfjs_esm_exports.tidy(() => {
      const reshaped = outputTensor.reshape([numCells, numCells, numBoxes, this.boxEncodingSize]);
      const boxes = reshaped.slice([0, 0, 0, 0], [numCells, numCells, numBoxes, 4]);
      const scores = reshaped.slice([0, 0, 0, 4], [numCells, numCells, numBoxes, 1]);
      const classScores = this.withClassScores ? tfjs_esm_exports.softmax(reshaped.slice([0, 0, 0, 5], [numCells, numCells, numBoxes, this.config.classes.length]), 3) : tfjs_esm_exports.scalar(0);
      return [boxes, scores, classScores];
    });
    const results = [];
    const scoresData = await scoresTensor.array();
    const boxesData = await boxesTensor.array();
    for (let row = 0; row < numCells; row++) {
      for (let col = 0; col < numCells; col++) {
        for (let anchor = 0; anchor < numBoxes; anchor++) {
          const score = sigmoid(scoresData[row][col][anchor][0]);
          if (!scoreThreshold || score > scoreThreshold) {
            const ctX = (col + sigmoid(boxesData[row][col][anchor][0])) / numCells * correctionFactorX;
            const ctY = (row + sigmoid(boxesData[row][col][anchor][1])) / numCells * correctionFactorY;
            const widthLocal = Math.exp(boxesData[row][col][anchor][2]) * this.config.anchors[anchor].x / numCells * correctionFactorX;
            const heightLocal = Math.exp(boxesData[row][col][anchor][3]) * this.config.anchors[anchor].y / numCells * correctionFactorY;
            const x = ctX - widthLocal / 2;
            const y = ctY - heightLocal / 2;
            const pos = { row, col, anchor };
            const { classScore, label } = this.withClassScores ? await this.extractPredictedClass(classScoresTensor, pos) : { classScore: 1, label: 0 };
            results.push({
              box: new BoundingBox(x, y, x + widthLocal, y + heightLocal),
              score,
              classScore: score * classScore,
              label,
              ...pos
            });
          }
        }
      }
    }
    boxesTensor.dispose();
    scoresTensor.dispose();
    classScoresTensor.dispose();
    return results;
  }
  async extractPredictedClass(classesTensor, pos) {
    const { row, col, anchor } = pos;
    const classesData = await classesTensor.array();
    return Array(this.config.classes.length).fill(0).map((_, i) => classesData[row][col][anchor][i]).map((classScore, label) => ({
      classScore,
      label
    })).reduce((max, curr) => max.classScore > curr.classScore ? max : curr);
  }
};
var TinyYolov2Base = _TinyYolov2Base;
TinyYolov2Base.DEFAULT_FILTER_SIZES = [3, 16, 32, 64, 128, 256, 512, 1024, 1024];

// src/tinyYolov2/TinyYolov2.ts
var TinyYolov2 = class extends TinyYolov2Base {
  constructor(withSeparableConvs = true) {
    const config = {
      withSeparableConvs,
      iouThreshold: IOU_THRESHOLD,
      classes: ["face"],
      ...withSeparableConvs ? {
        anchors: BOX_ANCHORS_SEPARABLE,
        meanRgb: MEAN_RGB_SEPARABLE
      } : {
        anchors: BOX_ANCHORS,
        withClassScores: true
      }
    };
    super(config);
  }
  get withSeparableConvs() {
    return this.config.withSeparableConvs;
  }
  get anchors() {
    return this.config.anchors;
  }
  async locateFaces(input, forwardParams) {
    const objectDetections = await this.detect(input, forwardParams);
    return objectDetections.map((det) => new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
  }
  getDefaultModelName() {
    return this.withSeparableConvs ? DEFAULT_MODEL_NAME_SEPARABLE_CONV : DEFAULT_MODEL_NAME;
  }
  extractParamsFromWeightMap(weightMap) {
    return super.extractParamsFromWeightMap(weightMap);
  }
};

// src/tinyYolov2/index.ts
function createTinyYolov2(weights, withSeparableConvs = true) {
  const net = new TinyYolov2(withSeparableConvs);
  net.extractWeights(weights);
  return net;
}

// src/tinyFaceDetector/TinyFaceDetectorOptions.ts
var TinyFaceDetectorOptions = class extends TinyYolov2Options {
  constructor() {
    super(...arguments);
    this._name = "TinyFaceDetectorOptions";
  }
};

// src/globalApi/ComposableTask.ts
var ComposableTask = class {
  async then(onfulfilled) {
    return onfulfilled(await this.run());
  }
  async run() {
    throw new Error("ComposableTask - run is not implemented");
  }
};

// src/globalApi/extractFacesAndComputeResults.ts
async function extractAllFacesAndComputeResults(parentResults, input, computeResults, extractedFaces, getRectForAlignment = ({ alignedRect }) => alignedRect) {
  const faceBoxes = parentResults.map((parentResult) => isWithFaceLandmarks(parentResult) ? getRectForAlignment(parentResult) : parentResult.detection);
  const faces = extractedFaces || (input instanceof tfjs_esm_exports.Tensor ? await extractFaceTensors(input, faceBoxes) : await extractFaces(input, faceBoxes));
  const results = await computeResults(faces);
  faces.forEach((f) => f instanceof tfjs_esm_exports.Tensor && f.dispose());
  return results;
}
async function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
  return extractAllFacesAndComputeResults([parentResult], input, async (faces) => computeResult(faces[0]), extractedFaces, getRectForAlignment);
}

// src/tinyFaceDetector/const.ts
var IOU_THRESHOLD2 = 0.4;
var BOX_ANCHORS2 = [
  new Point(1.603231, 2.094468),
  new Point(6.041143, 7.080126),
  new Point(2.882459, 3.518061),
  new Point(4.266906, 5.178857),
  new Point(9.041765, 10.66308)
];
var MEAN_RGB = [117.001, 114.697, 97.404];

// src/tinyFaceDetector/TinyFaceDetector.ts
var TinyFaceDetector = class extends TinyYolov2Base {
  constructor() {
    const config = {
      withSeparableConvs: true,
      iouThreshold: IOU_THRESHOLD2,
      classes: ["face"],
      anchors: BOX_ANCHORS2,
      meanRgb: MEAN_RGB,
      isFirstLayerConv2d: true,
      filterSizes: [3, 16, 32, 64, 128, 256, 512]
    };
    super(config);
  }
  get anchors() {
    return this.config.anchors;
  }
  async locateFaces(input, forwardParams) {
    const objectDetections = await this.detect(input, forwardParams);
    return objectDetections.map((det) => new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }));
  }
  getDefaultModelName() {
    return "tiny_face_detector_model";
  }
  extractParamsFromWeightMap(weightMap) {
    return super.extractParamsFromWeightMap(weightMap);
  }
};

// src/globalApi/nets.ts
var nets = {
  ssdMobilenetv1: new SsdMobilenetv1(),
  tinyFaceDetector: new TinyFaceDetector(),
  tinyYolov2: new TinyYolov2(),
  faceLandmark68Net: new FaceLandmark68Net(),
  faceLandmark68TinyNet: new FaceLandmark68TinyNet(),
  faceRecognitionNet: new FaceRecognitionNet(),
  faceExpressionNet: new FaceExpressionNet(),
  ageGenderNet: new AgeGenderNet()
};
var ssdMobilenetv1 = (input, options) => nets.ssdMobilenetv1.locateFaces(input, options);
var tinyFaceDetector = (input, options) => nets.tinyFaceDetector.locateFaces(input, options);
var tinyYolov2 = (input, options) => nets.tinyYolov2.locateFaces(input, options);
var detectFaceLandmarks = (input) => nets.faceLandmark68Net.detectLandmarks(input);
var detectFaceLandmarksTiny = (input) => nets.faceLandmark68TinyNet.detectLandmarks(input);
var computeFaceDescriptor = (input) => nets.faceRecognitionNet.computeFaceDescriptor(input);
var recognizeFaceExpressions = (input) => nets.faceExpressionNet.predictExpressions(input);
var predictAgeAndGender = (input) => nets.ageGenderNet.predictAgeAndGender(input);
var loadSsdMobilenetv1Model = (url) => nets.ssdMobilenetv1.load(url);
var loadTinyFaceDetectorModel = (url) => nets.tinyFaceDetector.load(url);
var loadTinyYolov2Model = (url) => nets.tinyYolov2.load(url);
var loadFaceLandmarkModel = (url) => nets.faceLandmark68Net.load(url);
var loadFaceLandmarkTinyModel = (url) => nets.faceLandmark68TinyNet.load(url);
var loadFaceRecognitionModel = (url) => nets.faceRecognitionNet.load(url);
var loadFaceExpressionModel = (url) => nets.faceExpressionNet.load(url);
var loadAgeGenderModel = (url) => nets.ageGenderNet.load(url);
var loadFaceDetectionModel = loadSsdMobilenetv1Model;
var locateFaces = ssdMobilenetv1;
var detectLandmarks = detectFaceLandmarks;

// src/globalApi/PredictFaceExpressionsTask.ts
var PredictFaceExpressionsTaskBase = class extends ComposableTask {
  constructor(parentTask, input, extractedFaces) {
    super();
    this.parentTask = parentTask;
    this.input = input;
    this.extractedFaces = extractedFaces;
  }
};
var PredictAllFaceExpressionsTask = class extends PredictFaceExpressionsTaskBase {
  async run() {
    const parentResults = await this.parentTask;
    const faceExpressionsByFace = await extractAllFacesAndComputeResults(parentResults, this.input, async (faces) => Promise.all(faces.map((face) => nets.faceExpressionNet.predictExpressions(face))), this.extractedFaces);
    return parentResults.map((parentResult, i) => extendWithFaceExpressions(parentResult, faceExpressionsByFace[i]));
  }
  withAgeAndGender() {
    return new PredictAllAgeAndGenderTask(this, this.input);
  }
};
var PredictSingleFaceExpressionsTask = class extends PredictFaceExpressionsTaskBase {
  async run() {
    const parentResult = await this.parentTask;
    if (!parentResult) {
      return void 0;
    }
    const faceExpressions = await extractSingleFaceAndComputeResult(parentResult, this.input, (face) => nets.faceExpressionNet.predictExpressions(face), this.extractedFaces);
    return extendWithFaceExpressions(parentResult, faceExpressions);
  }
  withAgeAndGender() {
    return new PredictSingleAgeAndGenderTask(this, this.input);
  }
};
var PredictAllFaceExpressionsWithFaceAlignmentTask = class extends PredictAllFaceExpressionsTask {
  withAgeAndGender() {
    return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptors() {
    return new ComputeAllFaceDescriptorsTask(this, this.input);
  }
};
var PredictSingleFaceExpressionsWithFaceAlignmentTask = class extends PredictSingleFaceExpressionsTask {
  withAgeAndGender() {
    return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptor() {
    return new ComputeSingleFaceDescriptorTask(this, this.input);
  }
};

// src/globalApi/PredictAgeAndGenderTask.ts
var PredictAgeAndGenderTaskBase = class extends ComposableTask {
  constructor(parentTask, input, extractedFaces) {
    super();
    this.parentTask = parentTask;
    this.input = input;
    this.extractedFaces = extractedFaces;
  }
};
var PredictAllAgeAndGenderTask = class extends PredictAgeAndGenderTaskBase {
  async run() {
    const parentResults = await this.parentTask;
    const ageAndGenderByFace = await extractAllFacesAndComputeResults(parentResults, this.input, async (faces) => Promise.all(faces.map((face) => nets.ageGenderNet.predictAgeAndGender(face))), this.extractedFaces);
    return parentResults.map((parentResult, i) => {
      const { age, gender, genderProbability } = ageAndGenderByFace[i];
      return extendWithAge(extendWithGender(parentResult, gender, genderProbability), age);
    });
  }
  withFaceExpressions() {
    return new PredictAllFaceExpressionsTask(this, this.input);
  }
};
var PredictSingleAgeAndGenderTask = class extends PredictAgeAndGenderTaskBase {
  async run() {
    const parentResult = await this.parentTask;
    if (!parentResult)
      return void 0;
    const { age, gender, genderProbability } = await extractSingleFaceAndComputeResult(parentResult, this.input, (face) => nets.ageGenderNet.predictAgeAndGender(face), this.extractedFaces);
    return extendWithAge(extendWithGender(parentResult, gender, genderProbability), age);
  }
  withFaceExpressions() {
    return new PredictSingleFaceExpressionsTask(this, this.input);
  }
};
var PredictAllAgeAndGenderWithFaceAlignmentTask = class extends PredictAllAgeAndGenderTask {
  withFaceExpressions() {
    return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptors() {
    return new ComputeAllFaceDescriptorsTask(this, this.input);
  }
};
var PredictSingleAgeAndGenderWithFaceAlignmentTask = class extends PredictSingleAgeAndGenderTask {
  withFaceExpressions() {
    return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptor() {
    return new ComputeSingleFaceDescriptorTask(this, this.input);
  }
};

// src/globalApi/ComputeFaceDescriptorsTasks.ts
var ComputeFaceDescriptorsTaskBase = class extends ComposableTask {
  constructor(parentTask, input) {
    super();
    this.parentTask = parentTask;
    this.input = input;
  }
};
var ComputeAllFaceDescriptorsTask = class extends ComputeFaceDescriptorsTaskBase {
  async run() {
    const parentResults = await this.parentTask;
    const descriptors = await extractAllFacesAndComputeResults(parentResults, this.input, (faces) => Promise.all(faces.map((face) => nets.faceRecognitionNet.computeFaceDescriptor(face))), null, (parentResult) => parentResult.landmarks.align(null, { useDlibAlignment: true }));
    return descriptors.map((descriptor, i) => extendWithFaceDescriptor(parentResults[i], descriptor));
  }
  withFaceExpressions() {
    return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withAgeAndGender() {
    return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
};
var ComputeSingleFaceDescriptorTask = class extends ComputeFaceDescriptorsTaskBase {
  async run() {
    const parentResult = await this.parentTask;
    if (!parentResult)
      return void 0;
    const descriptor = await extractSingleFaceAndComputeResult(parentResult, this.input, (face) => nets.faceRecognitionNet.computeFaceDescriptor(face), null, (parentResult2) => parentResult2.landmarks.align(null, { useDlibAlignment: true }));
    return extendWithFaceDescriptor(parentResult, descriptor);
  }
  withFaceExpressions() {
    return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withAgeAndGender() {
    return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
};

// src/globalApi/DetectFaceLandmarksTasks.ts
var DetectFaceLandmarksTaskBase = class extends ComposableTask {
  constructor(parentTask, input, useTinyLandmarkNet) {
    super();
    this.parentTask = parentTask;
    this.input = input;
    this.useTinyLandmarkNet = useTinyLandmarkNet;
  }
  get landmarkNet() {
    return this.useTinyLandmarkNet ? nets.faceLandmark68TinyNet : nets.faceLandmark68Net;
  }
};
var DetectAllFaceLandmarksTask = class extends DetectFaceLandmarksTaskBase {
  async run() {
    const parentResults = await this.parentTask;
    const detections = parentResults.map((res) => res.detection);
    const faces = this.input instanceof tfjs_esm_exports.Tensor ? await extractFaceTensors(this.input, detections) : await extractFaces(this.input, detections);
    const faceLandmarksByFace = await Promise.all(faces.map((face) => this.landmarkNet.detectLandmarks(face)));
    faces.forEach((f) => f instanceof tfjs_esm_exports.Tensor && f.dispose());
    return parentResults.map((parentResult, i) => extendWithFaceLandmarks(parentResult, faceLandmarksByFace[i]));
  }
  withFaceExpressions() {
    return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withAgeAndGender() {
    return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptors() {
    return new ComputeAllFaceDescriptorsTask(this, this.input);
  }
};
var DetectSingleFaceLandmarksTask = class extends DetectFaceLandmarksTaskBase {
  async run() {
    const parentResult = await this.parentTask;
    if (!parentResult) {
      return void 0;
    }
    const { detection } = parentResult;
    const faces = this.input instanceof tfjs_esm_exports.Tensor ? await extractFaceTensors(this.input, [detection]) : await extractFaces(this.input, [detection]);
    const landmarks = await this.landmarkNet.detectLandmarks(faces[0]);
    faces.forEach((f) => f instanceof tfjs_esm_exports.Tensor && f.dispose());
    return extendWithFaceLandmarks(parentResult, landmarks);
  }
  withFaceExpressions() {
    return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }
  withAgeAndGender() {
    return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
  withFaceDescriptor() {
    return new ComputeSingleFaceDescriptorTask(this, this.input);
  }
};

// src/globalApi/DetectFacesTasks.ts
var DetectFacesTaskBase = class extends ComposableTask {
  constructor(input, options = new SsdMobilenetv1Options()) {
    super();
    this.input = input;
    this.options = options;
  }
};
var DetectAllFacesTask = class extends DetectFacesTaskBase {
  async run() {
    const { input, options } = this;
    let result;
    if (options instanceof TinyFaceDetectorOptions)
      result = nets.tinyFaceDetector.locateFaces(input, options);
    else if (options instanceof SsdMobilenetv1Options)
      result = nets.ssdMobilenetv1.locateFaces(input, options);
    else if (options instanceof TinyYolov2Options)
      result = nets.tinyYolov2.locateFaces(input, options);
    else
      throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | TinyYolov2Options");
    return result;
  }
  runAndExtendWithFaceDetections() {
    return new Promise((resolve, reject) => {
      this.run().then((detections) => resolve(detections.map((detection) => extendWithFaceDetection({}, detection)))).catch((err) => reject(err));
    });
  }
  withFaceLandmarks(useTinyLandmarkNet = false) {
    return new DetectAllFaceLandmarksTask(this.runAndExtendWithFaceDetections(), this.input, useTinyLandmarkNet);
  }
  withFaceExpressions() {
    return new PredictAllFaceExpressionsTask(this.runAndExtendWithFaceDetections(), this.input);
  }
  withAgeAndGender() {
    return new PredictAllAgeAndGenderTask(this.runAndExtendWithFaceDetections(), this.input);
  }
};
var DetectSingleFaceTask = class extends DetectFacesTaskBase {
  async run() {
    const faceDetections = await new DetectAllFacesTask(this.input, this.options);
    let faceDetectionWithHighestScore = faceDetections[0];
    faceDetections.forEach((faceDetection) => {
      if (faceDetection.score > faceDetectionWithHighestScore.score)
        faceDetectionWithHighestScore = faceDetection;
    });
    return faceDetectionWithHighestScore;
  }
  runAndExtendWithFaceDetection() {
    return new Promise(async (resolve) => {
      const detection = await this.run();
      resolve(detection ? extendWithFaceDetection({}, detection) : void 0);
    });
  }
  withFaceLandmarks(useTinyLandmarkNet = false) {
    return new DetectSingleFaceLandmarksTask(this.runAndExtendWithFaceDetection(), this.input, useTinyLandmarkNet);
  }
  withFaceExpressions() {
    return new PredictSingleFaceExpressionsTask(this.runAndExtendWithFaceDetection(), this.input);
  }
  withAgeAndGender() {
    return new PredictSingleAgeAndGenderTask(this.runAndExtendWithFaceDetection(), this.input);
  }
};

// src/globalApi/detectFaces.ts
function detectSingleFace(input, options = new SsdMobilenetv1Options()) {
  return new DetectSingleFaceTask(input, options);
}
function detectAllFaces(input, options = new SsdMobilenetv1Options()) {
  return new DetectAllFacesTask(input, options);
}

// src/globalApi/allFaces.ts
async function allFacesSsdMobilenetv1(input, minConfidence) {
  return detectAllFaces(input, new SsdMobilenetv1Options(minConfidence ? { minConfidence } : {})).withFaceLandmarks().withFaceDescriptors();
}
async function allFacesTinyYolov2(input, forwardParams = {}) {
  return detectAllFaces(input, new TinyYolov2Options(forwardParams)).withFaceLandmarks().withFaceDescriptors();
}
var allFaces = allFacesSsdMobilenetv1;

// src/euclideanDistance.ts
function euclideanDistance(arr1, arr2) {
  if (arr1.length !== arr2.length)
    throw new Error("euclideanDistance: arr1.length !== arr2.length");
  const desc1 = Array.from(arr1);
  const desc2 = Array.from(arr2);
  return Math.sqrt(desc1.map((val, i) => val - desc2[i]).reduce((res, diff) => res + diff ** 2, 0));
}

// src/globalApi/FaceMatcher.ts
var FaceMatcher = class {
  constructor(inputs, distanceThreshold = 0.6) {
    this._distanceThreshold = distanceThreshold;
    const inputArray = Array.isArray(inputs) ? inputs : [inputs];
    if (!inputArray.length)
      throw new Error("FaceRecognizer.constructor - expected atleast one input");
    let count = 1;
    const createUniqueLabel = () => `person ${count++}`;
    this._labeledDescriptors = inputArray.map((desc) => {
      if (desc instanceof LabeledFaceDescriptors)
        return desc;
      if (desc instanceof Float32Array)
        return new LabeledFaceDescriptors(createUniqueLabel(), [desc]);
      if (desc.descriptor && desc.descriptor instanceof Float32Array)
        return new LabeledFaceDescriptors(createUniqueLabel(), [desc.descriptor]);
      throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>");
    });
  }
  get labeledDescriptors() {
    return this._labeledDescriptors;
  }
  get distanceThreshold() {
    return this._distanceThreshold;
  }
  computeMeanDistance(queryDescriptor, descriptors) {
    return descriptors.map((d) => euclideanDistance(d, queryDescriptor)).reduce((d1, d2) => d1 + d2, 0) / (descriptors.length || 1);
  }
  matchDescriptor(queryDescriptor) {
    return this.labeledDescriptors.map(({ descriptors, label }) => new FaceMatch(label, this.computeMeanDistance(queryDescriptor, descriptors))).reduce((best, curr) => best.distance < curr.distance ? best : curr);
  }
  findBestMatch(queryDescriptor) {
    const bestMatch = this.matchDescriptor(queryDescriptor);
    return bestMatch.distance < this._distanceThreshold ? bestMatch : new FaceMatch("unknown", bestMatch.distance);
  }
  toJSON() {
    return {
      distanceThreshold: this._distanceThreshold,
      labeledDescriptors: this._labeledDescriptors.map((ld) => ld.toJSON())
    };
  }
  static fromJSON(json) {
    const labeledDescriptors = json.labeledDescriptors.map((ld) => LabeledFaceDescriptors.fromJSON(ld));
    return new FaceMatcher(labeledDescriptors, json.distanceThreshold);
  }
};

// src/tinyFaceDetector/index.ts
function createTinyFaceDetector(weights) {
  const net = new TinyFaceDetector();
  net.extractWeights(weights);
  return net;
}

// src/resizeResults.ts
function resizeResults(results, dimensions) {
  const { width, height } = new Dimensions(dimensions.width, dimensions.height);
  if (width <= 0 || height <= 0) {
    throw new Error(`resizeResults - invalid dimensions: ${JSON.stringify({ width, height })}`);
  }
  if (Array.isArray(results)) {
    return results.map((obj) => resizeResults(obj, { width, height }));
  }
  if (isWithFaceLandmarks(results)) {
    const resizedDetection = results.detection.forSize(width, height);
    const resizedLandmarks = results.unshiftedLandmarks.forSize(resizedDetection.box.width, resizedDetection.box.height);
    return extendWithFaceLandmarks(extendWithFaceDetection(results, resizedDetection), resizedLandmarks);
  }
  if (isWithFaceDetection(results)) {
    return extendWithFaceDetection(results, results.detection.forSize(width, height));
  }
  if (results instanceof FaceLandmarks || results instanceof FaceDetection) {
    return results.forSize(width, height);
  }
  return results;
}

// src/index.ts
var version11 = version10;
export {
  AgeGenderNet,
  BoundingBox,
  Box,
  ComposableTask,
  ComputeAllFaceDescriptorsTask,
  ComputeFaceDescriptorsTaskBase,
  ComputeSingleFaceDescriptorTask,
  DetectAllFaceLandmarksTask,
  DetectAllFacesTask,
  DetectFaceLandmarksTaskBase,
  DetectFacesTaskBase,
  DetectSingleFaceLandmarksTask,
  DetectSingleFaceTask,
  Dimensions,
  FACE_EXPRESSION_LABELS,
  FaceDetection,
  FaceDetectionNet,
  FaceExpressionNet,
  FaceExpressions,
  FaceLandmark68Net,
  FaceLandmark68TinyNet,
  FaceLandmarkNet,
  FaceLandmarks,
  FaceLandmarks5,
  FaceLandmarks68,
  FaceMatch,
  FaceMatcher,
  FaceRecognitionNet,
  Gender,
  LabeledBox,
  LabeledFaceDescriptors,
  NetInput,
  NeuralNetwork,
  ObjectDetection,
  Point,
  PredictedBox,
  Rect,
  SsdMobilenetv1,
  SsdMobilenetv1Options,
  TinyFaceDetector,
  TinyFaceDetectorOptions,
  TinyYolov2,
  TinyYolov2Options,
  allFaces,
  allFacesSsdMobilenetv1,
  allFacesTinyYolov2,
  awaitMediaLoaded,
  bufferToImage,
  computeFaceDescriptor,
  createCanvas,
  createCanvasFromMedia,
  createFaceDetectionNet,
  createFaceRecognitionNet,
  createSsdMobilenetv1,
  createTinyFaceDetector,
  createTinyYolov2,
  detectAllFaces,
  detectFaceLandmarks,
  detectFaceLandmarksTiny,
  detectLandmarks,
  detectSingleFace,
  draw_exports as draw,
  env,
  euclideanDistance,
  extendWithAge,
  extendWithFaceDescriptor,
  extendWithFaceDetection,
  extendWithFaceExpressions,
  extendWithFaceLandmarks,
  extendWithGender,
  extractFaceTensors,
  extractFaces,
  fetchImage,
  fetchJson,
  fetchNetWeights,
  fetchOrThrow,
  fetchVideo,
  getContext2dOrThrow,
  getMediaDimensions,
  imageTensorToCanvas,
  imageToSquare,
  inverseSigmoid,
  iou,
  isMediaElement,
  isMediaLoaded,
  isWithAge,
  isWithFaceDetection,
  isWithFaceExpressions,
  isWithFaceLandmarks,
  isWithGender,
  loadAgeGenderModel,
  loadFaceDetectionModel,
  loadFaceExpressionModel,
  loadFaceLandmarkModel,
  loadFaceLandmarkTinyModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel,
  loadTinyYolov2Model,
  loadWeightMap,
  locateFaces,
  matchDimensions,
  minBbox,
  nets,
  nonMaxSuppression,
  normalize,
  padToSquare,
  predictAgeAndGender,
  recognizeFaceExpressions,
  resizeResults,
  resolveInput,
  shuffleArray,
  sigmoid,
  ssdMobilenetv1,
  tfjs_esm_exports as tf,
  tinyFaceDetector,
  tinyYolov2,
  toNetInput,
  utils_exports as utils,
  validateConfig,
  version11 as version
};
