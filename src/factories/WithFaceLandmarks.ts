import { FaceDetection } from '../classes/FaceDetection';
import { FaceLandmarks } from '../classes/FaceLandmarks';
import { FaceLandmarks68 } from '../classes/FaceLandmarks68';
import { isWithFaceDetection, WithFaceDetection } from './WithFaceDetection';

export type WithFaceLandmarks<
  TSource extends WithFaceDetection<{}>,
  TFaceLandmarks extends FaceLandmarks = FaceLandmarks68
> = TSource & {
  landmarks: TFaceLandmarks;
  unshiftedLandmarks: TFaceLandmarks;
  alignedRect: FaceDetection;
  angle: {
    roll: number | undefined;
    pitch: number | undefined;
    yaw: number | undefined;
  };
};

export function isWithFaceLandmarks(
  obj: any,
): obj is WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks> {
  return (
    isWithFaceDetection(obj)
    // eslint-disable-next-line dot-notation
    && obj['landmarks'] instanceof FaceLandmarks
    // eslint-disable-next-line dot-notation
    && obj['unshiftedLandmarks'] instanceof FaceLandmarks
    // eslint-disable-next-line dot-notation
    && obj['alignedRect'] instanceof FaceDetection
  );
}

function calculateFaceAngle(mesh) {
  // Helper to convert radians to degrees
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const degrees = (radians) => (radians * 180) / Math.PI;
  const calcLengthBetweenTwoPoints = (a, b) => Math.sqrt((a._x - b._x) ** 2 + (a._y - b._y) ** 2);

  const angle = {
    roll: <number | undefined>undefined,
    pitch: <number | undefined>undefined,
    yaw: <number | undefined>undefined,
  };

  const calcYaw = (leftPoint, midPoint, rightPoint) => {
    // Calc x-distance from left side of the face ("ear") to facial midpoint ("nose")
    const leftToMidpoint = Math.floor(leftPoint._x - midPoint._x);
    // Calc x-distance from facial midpoint ("nose") to the right side of the face ("ear")
    const rightToMidpoint = Math.floor(midPoint._x - rightPoint._x);
    // Difference in distances coincidentally approximates to angles
    return leftToMidpoint - rightToMidpoint;
  };

  const calcRoll = (lever, pivot) => {
    // When rolling, the head seems to pivot from the nose/lips/chin area.
    // So, we'll choose any two points from the facial midline, where the first point should be the pivot, and the other "lever"
    // Plan/Execution: get the hypotenuse & opposite sides of a 90deg triangle ==> Calculate angle in radians
    const hypotenuse = Math.hypot(pivot._x - lever._x, pivot._y - lever._y);
    const opposite = pivot._y - lever._y;
    const angleInRadians = Math.asin(opposite / hypotenuse);
    const angleInDegrees = degrees(angleInRadians);
    const normalizeAngle = Math.floor(90 - angleInDegrees);
    // If lever more to the left of the pivot, then we're tilting left
    // "-" is negative direction. "+", or absence of a sign is positive direction
    const tiltDirection = pivot._x - lever._x < 0 ? -1 : 1;
    const result = normalizeAngle * tiltDirection;
    return result;
  };

  const calcPitch = (leftPoint, midPoint, rightPoint) => {
    // Theory: While pitching, the nose is the most salient point --> That's what we'll use to make a trianle.
    // The "base" is between point that don't move when we pitch our head (i.e. an imaginary line running ear to ear through the nose).
    // Executuin: Get the opposite & adjacent lengths of the triangle from the ear's perspective. Use it to get angle.

    const base = calcLengthBetweenTwoPoints(leftPoint, rightPoint);
    // adjecent is base/2 technically.
    const baseCoords = {
      _x: (leftPoint._x + rightPoint._x) / 2,
      _y: (leftPoint._y + rightPoint._y) / 2,
    };
    const midToBaseLength = calcLengthBetweenTwoPoints(midPoint, baseCoords);
    const angleInRadians = Math.atan(midToBaseLength / base);
    const angleInDegrees = Math.floor(degrees(angleInRadians));
    // Account for directionality.
    // pitch forwards (_i.e. tilting your head forwards) is positive (or no sign); backward is negative.
    const direction = baseCoords._y - midPoint._y < 0 ? -1 : 1;
    const result = angleInDegrees * direction;
    return result;
  };

  if (!mesh || !mesh._positions || mesh._positions.length !== 68) return angle;
  const pt = mesh._positions;
  angle.roll = calcRoll(pt[27], pt[66]);
  angle.pitch = calcPitch(pt[14], pt[30], pt[2]);
  angle.yaw = calcYaw(pt[14], pt[33], pt[2]);
  return angle;
}

export function extendWithFaceLandmarks<TSource extends WithFaceDetection<{}>, TFaceLandmarks extends FaceLandmarks = FaceLandmarks68>(
  sourceObj: TSource,
  unshiftedLandmarks: TFaceLandmarks,
): WithFaceLandmarks<TSource, TFaceLandmarks> {
  const { box: shift } = sourceObj.detection;
  const landmarks = unshiftedLandmarks.shiftBy<TFaceLandmarks>(shift.x, shift.y);
  const rect = landmarks.align();
  const { imageDims } = sourceObj.detection;
  const alignedRect = new FaceDetection(
    sourceObj.detection.score,
    rect.rescale(imageDims.reverse()),
    imageDims,
  );
  const angle = calculateFaceAngle(unshiftedLandmarks);
  const extension = { landmarks, unshiftedLandmarks, alignedRect, angle };
  return { ...sourceObj, ...extension };
}
