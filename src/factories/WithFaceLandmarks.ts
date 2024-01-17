import { Point } from '../classes';
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
    && (obj as any)['landmarks'] instanceof FaceLandmarks
    && (obj as any)['unshiftedLandmarks'] instanceof FaceLandmarks
    && (obj as any)['alignedRect'] instanceof FaceDetection
  );
}

function calculateFaceAngle(mesh: FaceLandmarks) {
  // Helper to convert radians to degrees
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const degrees = (radians: number) => (radians * 180) / Math.PI;
  const calcLengthBetweenTwoPoints = (a: Point, b: Point) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

  const angle = {
    roll: <number | undefined>undefined,
    pitch: <number | undefined>undefined,
    yaw: <number | undefined>undefined,
  };

  const calcYaw = (leftPoint: Point, midPoint: Point, rightPoint: Point) => {
    // Calc x-distance from left side of the face ("ear") to facial midpoint ("nose")
    const leftToMidpoint = Math.floor(leftPoint.x - midPoint.x);
    // Calc x-distance from facial midpoint ("nose") to the right side of the face ("ear")
    const rightToMidpoint = Math.floor(midPoint.x - rightPoint.x);
    // Difference in distances coincidentally approximates to angles
    return leftToMidpoint - rightToMidpoint;
  };

  const calcRoll = (lever: Point, pivot: Point) => {
    // When rolling, the head seems to pivot from the nose/lips/chin area.
    // So, we'll choose any two points from the facial midline, where the first point should be the pivot, and the other "lever"
    // Plan/Execution: get the hypotenuse & opposite sides of a 90deg triangle ==> Calculate angle in radians
    const hypotenuse = Math.hypot(pivot.x - lever.x, pivot.y - lever.y);
    const opposite = pivot.y - lever.y;
    const angleInRadians = Math.asin(opposite / hypotenuse);
    const angleInDegrees = degrees(angleInRadians);
    const normalizeAngle = Math.floor(90 - angleInDegrees);
    // If lever more to the left of the pivot, then we're tilting left
    // "-" is negative direction. "+", or absence of a sign is positive direction
    const tiltDirection = pivot.x - lever.x < 0 ? -1 : 1;
    const result = normalizeAngle * tiltDirection;
    return result;
  };

  const calcPitch = (leftPoint: Point, midPoint: Point, rightPoint: Point) => {
    // Theory: While pitching, the nose is the most salient point --> That's what we'll use to make a trianle.
    // The "base" is between point that don't move when we pitch our head (i.e. an imaginary line running ear to ear through the nose).
    // Executuin: Get the opposite & adjacent lengths of the triangle from the ear's perspective. Use it to get angle.

    const base = calcLengthBetweenTwoPoints(leftPoint, rightPoint);
    // adjecent is base/2 technically.
    const baseCoords = new Point((leftPoint.x + rightPoint.x) / 2, (leftPoint.y + rightPoint.y) / 2);
    const midToBaseLength = calcLengthBetweenTwoPoints(midPoint, baseCoords);
    const angleInRadians = Math.atan(midToBaseLength / base);
    const angleInDegrees = Math.floor(degrees(angleInRadians));
    // Account for directionality.
    // pitch forwards (_i.e. tilting your head forwards) is positive (or no sign); backward is negative.
    const direction = baseCoords.y - midPoint.y < 0 ? -1 : 1;
    const result = angleInDegrees * direction;
    return result;
  };

  if (!mesh || !mesh.positions || mesh.positions.length !== 68) return angle;
  const pt = mesh.positions;
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
