import { FaceDetection } from '../classes/FaceDetection';
import { FaceLandmarks } from '../classes/FaceLandmarks';
import { FaceLandmarks68 } from '../classes/FaceLandmarks68';
import { isWithFaceDetection, WithFaceDetection } from './WithFaceDetection';

export type WithFaceLandmarks<
  TSource extends WithFaceDetection<{}>,
  TFaceLandmarks extends FaceLandmarks = FaceLandmarks68 > = TSource & {
    landmarks: TFaceLandmarks,
    unshiftedLandmarks: TFaceLandmarks,
    alignedRect: FaceDetection,
    angle: { roll: number | undefined, pitch: number | undefined, yaw: number | undefined },
  }

export function isWithFaceLandmarks(obj: any): obj is WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks> {
  return isWithFaceDetection(obj)
    // eslint-disable-next-line dot-notation
    && obj['landmarks'] instanceof FaceLandmarks
    // eslint-disable-next-line dot-notation
    && obj['unshiftedLandmarks'] instanceof FaceLandmarks
    // eslint-disable-next-line dot-notation
    && obj['alignedRect'] instanceof FaceDetection;
}

function calculateFaceAngle(mesh) {
  // returns the angle in the plane (in radians) between the positive x-axis and the ray from (0,0) to the point (x,y)
  const radians = (a1, a2, b1, b2) => (Math.atan2(b2 - a2, b1 - a1) % Math.PI);
  // convert radians to degrees
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const degrees = (theta) => (theta * 180) / Math.PI;

  const angle = { roll: <number | undefined>undefined, pitch: <number | undefined>undefined, yaw: <number | undefined>undefined };

  if (!mesh || !mesh._positions || mesh._positions.length !== 68) return angle;
  const pt = mesh._positions;

  // values are in radians in range of -pi/2 to pi/2 which is -90 to +90 degrees
  // value of 0 means center

  // roll is face lean from left to right
  // comparing x,y of outside corners of leftEye and rightEye
  angle.roll = -radians(pt[36]._x, pt[36]._y, pt[45]._x, pt[45]._y);

  // pitch is face turn from left right
  // comparing x distance of top of nose to left and right edge of face
  // precision is lacking since coordinates are not precise enough
  angle.pitch = radians(0, Math.abs(pt[0]._x - pt[30]._x) / pt[30]._x, Math.PI, Math.abs(pt[16]._x - pt[30]._x) / pt[30]._x);

  // yaw is face move from up to down
  // comparing size of the box around the face with top and bottom of detected landmarks
  // silly hack, but this gives us face compression on y-axis
  // e.g., tilting head up hides the forehead that doesn't have any landmarks so ratio drops
  const bottom = pt.reduce((prev, cur) => (prev < cur._y ? prev : cur._y), +Infinity);
  const top = pt.reduce((prev, cur) => (prev > cur._y ? prev : cur._y), -Infinity);
  angle.yaw = Math.PI * (mesh._imgDims._height / (top - bottom) / 1.40 - 1);

  return angle;
}

export function extendWithFaceLandmarks<
  TSource extends WithFaceDetection<{}>,
  TFaceLandmarks extends FaceLandmarks = FaceLandmarks68 >(sourceObj: TSource, unshiftedLandmarks: TFaceLandmarks): WithFaceLandmarks<TSource, TFaceLandmarks> {
  const { box: shift } = sourceObj.detection;
  const landmarks = unshiftedLandmarks.shiftBy<TFaceLandmarks>(shift.x, shift.y);

  const rect = landmarks.align();
  const { imageDims } = sourceObj.detection;
  const alignedRect = new FaceDetection(sourceObj.detection.score, rect.rescale(imageDims.reverse()), imageDims);
  const angle = calculateFaceAngle(unshiftedLandmarks);

  const extension = {
    landmarks,
    unshiftedLandmarks,
    alignedRect,
    angle,
  };

  return { ...sourceObj, ...extension };
}
