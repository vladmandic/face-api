import { extendWithAge } from '../factories/WithAge';
import { extendWithGender } from '../factories/WithGender';
import { ComposableTask } from './ComposableTask';
import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from './ComputeFaceDescriptorsTasks';
import { extractAllFacesAndComputeResults, extractSingleFaceAndComputeResult } from './extractFacesAndComputeResults';
import { nets } from './nets';
import { PredictAllFaceExpressionsTask, PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsTask, PredictSingleFaceExpressionsWithFaceAlignmentTask, } from './PredictFaceExpressionsTask';
export class PredictAgeAndGenderTaskBase extends ComposableTask {
    constructor(parentTask, input, extractedFaces) {
        super();
        this.parentTask = parentTask;
        this.input = input;
        this.extractedFaces = extractedFaces;
    }
}
export class PredictAllAgeAndGenderTask extends PredictAgeAndGenderTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const ageAndGenderByFace = await extractAllFacesAndComputeResults(parentResults, this.input, async (faces) => await Promise.all(faces.map(face => nets.ageGenderNet.predictAgeAndGender(face))), this.extractedFaces);
        return parentResults.map((parentResult, i) => {
            const { age, gender, genderProbability } = ageAndGenderByFace[i];
            return extendWithAge(extendWithGender(parentResult, gender, genderProbability), age);
        });
    }
    withFaceExpressions() {
        return new PredictAllFaceExpressionsTask(this, this.input);
    }
}
export class PredictSingleAgeAndGenderTask extends PredictAgeAndGenderTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const { age, gender, genderProbability } = await extractSingleFaceAndComputeResult(parentResult, this.input, face => nets.ageGenderNet.predictAgeAndGender(face), this.extractedFaces);
        return extendWithAge(extendWithGender(parentResult, gender, genderProbability), age);
    }
    withFaceExpressions() {
        return new PredictSingleFaceExpressionsTask(this, this.input);
    }
}
export class PredictAllAgeAndGenderWithFaceAlignmentTask extends PredictAllAgeAndGenderTask {
    withFaceExpressions() {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptors() {
        return new ComputeAllFaceDescriptorsTask(this, this.input);
    }
}
export class PredictSingleAgeAndGenderWithFaceAlignmentTask extends PredictSingleAgeAndGenderTask {
    withFaceExpressions() {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptor() {
        return new ComputeSingleFaceDescriptorTask(this, this.input);
    }
}
//# sourceMappingURL=PredictAgeAndGenderTask.js.map