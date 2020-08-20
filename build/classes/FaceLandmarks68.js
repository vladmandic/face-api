import { getCenterPoint } from '../utils';
import { FaceLandmarks } from './FaceLandmarks';
export class FaceLandmarks68 extends FaceLandmarks {
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
}
//# sourceMappingURL=FaceLandmarks68.js.map