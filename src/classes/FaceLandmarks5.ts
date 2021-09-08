import { getCenterPoint } from '../utils/index';
import { FaceLandmarks } from './FaceLandmarks';
import { Point } from './Point';

export class FaceLandmarks5 extends FaceLandmarks {
  protected override getRefPointsForAlignment(): Point[] {
    const pts = this.positions;
    return [
      pts[0],
      pts[1],
      getCenterPoint([pts[3], pts[4]]),
    ];
  }
}
