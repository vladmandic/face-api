"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictSingleAgeAndGenderWithFaceAlignmentTask = exports.PredictAllAgeAndGenderWithFaceAlignmentTask = exports.PredictSingleAgeAndGenderTask = exports.PredictAllAgeAndGenderTask = exports.PredictAgeAndGenderTaskBase = void 0;
const WithAge_1 = require("../factories/WithAge");
const WithGender_1 = require("../factories/WithGender");
const ComposableTask_1 = require("./ComposableTask");
const ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
const extractFacesAndComputeResults_1 = require("./extractFacesAndComputeResults");
const nets_1 = require("./nets");
const PredictFaceExpressionsTask_1 = require("./PredictFaceExpressionsTask");
class PredictAgeAndGenderTaskBase extends ComposableTask_1.ComposableTask {
    constructor(parentTask, input, extractedFaces) {
        super();
        this.parentTask = parentTask;
        this.input = input;
        this.extractedFaces = extractedFaces;
    }
}
exports.PredictAgeAndGenderTaskBase = PredictAgeAndGenderTaskBase;
class PredictAllAgeAndGenderTask extends PredictAgeAndGenderTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const ageAndGenderByFace = await extractFacesAndComputeResults_1.extractAllFacesAndComputeResults(parentResults, this.input, async (faces) => await Promise.all(faces.map(face => nets_1.nets.ageGenderNet.predictAgeAndGender(face))), this.extractedFaces);
        return parentResults.map((parentResult, i) => {
            const { age, gender, genderProbability } = ageAndGenderByFace[i];
            return WithAge_1.extendWithAge(WithGender_1.extendWithGender(parentResult, gender, genderProbability), age);
        });
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsTask(this, this.input);
    }
}
exports.PredictAllAgeAndGenderTask = PredictAllAgeAndGenderTask;
class PredictSingleAgeAndGenderTask extends PredictAgeAndGenderTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const { age, gender, genderProbability } = await extractFacesAndComputeResults_1.extractSingleFaceAndComputeResult(parentResult, this.input, face => nets_1.nets.ageGenderNet.predictAgeAndGender(face), this.extractedFaces);
        return WithAge_1.extendWithAge(WithGender_1.extendWithGender(parentResult, gender, genderProbability), age);
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsTask(this, this.input);
    }
}
exports.PredictSingleAgeAndGenderTask = PredictSingleAgeAndGenderTask;
class PredictAllAgeAndGenderWithFaceAlignmentTask extends PredictAllAgeAndGenderTask {
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptors() {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    }
}
exports.PredictAllAgeAndGenderWithFaceAlignmentTask = PredictAllAgeAndGenderWithFaceAlignmentTask;
class PredictSingleAgeAndGenderWithFaceAlignmentTask extends PredictSingleAgeAndGenderTask {
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptor() {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    }
}
exports.PredictSingleAgeAndGenderWithFaceAlignmentTask = PredictSingleAgeAndGenderWithFaceAlignmentTask;
//# sourceMappingURL=PredictAgeAndGenderTask.js.map