import { extendWithFaceDescriptor } from '../factories/WithFaceDescriptor';
import { ComposableTask } from './ComposableTask';
import { extractAllFacesAndComputeResults, extractSingleFaceAndComputeResult } from './extractFacesAndComputeResults';
import { nets } from './nets';
import { PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderWithFaceAlignmentTask, } from './PredictAgeAndGenderTask';
import { PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsWithFaceAlignmentTask, } from './PredictFaceExpressionsTask';
export class ComputeFaceDescriptorsTaskBase extends ComposableTask {
    constructor(parentTask, input) {
        super();
        this.parentTask = parentTask;
        this.input = input;
    }
}
export class ComputeAllFaceDescriptorsTask extends ComputeFaceDescriptorsTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const descriptors = await extractAllFacesAndComputeResults(parentResults, this.input, faces => Promise.all(faces.map(face => nets.faceRecognitionNet.computeFaceDescriptor(face))), null, parentResult => parentResult.landmarks.align(null, { useDlibAlignment: true }));
        return descriptors.map((descriptor, i) => extendWithFaceDescriptor(parentResults[i], descriptor));
    }
    withFaceExpressions() {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
}
export class ComputeSingleFaceDescriptorTask extends ComputeFaceDescriptorsTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const descriptor = await extractSingleFaceAndComputeResult(parentResult, this.input, face => nets.faceRecognitionNet.computeFaceDescriptor(face), null, parentResult => parentResult.landmarks.align(null, { useDlibAlignment: true }));
        return extendWithFaceDescriptor(parentResult, descriptor);
    }
    withFaceExpressions() {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
}
//# sourceMappingURL=ComputeFaceDescriptorsTasks.js.map