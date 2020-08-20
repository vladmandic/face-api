"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictSingleFaceExpressionsWithFaceAlignmentTask = exports.PredictAllFaceExpressionsWithFaceAlignmentTask = exports.PredictSingleFaceExpressionsTask = exports.PredictAllFaceExpressionsTask = exports.PredictFaceExpressionsTaskBase = void 0;
const WithFaceExpressions_1 = require("../factories/WithFaceExpressions");
const ComposableTask_1 = require("./ComposableTask");
const ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
const extractFacesAndComputeResults_1 = require("./extractFacesAndComputeResults");
const nets_1 = require("./nets");
const PredictAgeAndGenderTask_1 = require("./PredictAgeAndGenderTask");
class PredictFaceExpressionsTaskBase extends ComposableTask_1.ComposableTask {
    constructor(parentTask, input, extractedFaces) {
        super();
        this.parentTask = parentTask;
        this.input = input;
        this.extractedFaces = extractedFaces;
    }
}
exports.PredictFaceExpressionsTaskBase = PredictFaceExpressionsTaskBase;
class PredictAllFaceExpressionsTask extends PredictFaceExpressionsTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const faceExpressionsByFace = await extractFacesAndComputeResults_1.extractAllFacesAndComputeResults(parentResults, this.input, async (faces) => await Promise.all(faces.map(face => nets_1.nets.faceExpressionNet.predictExpressions(face))), this.extractedFaces);
        return parentResults.map((parentResult, i) => WithFaceExpressions_1.extendWithFaceExpressions(parentResult, faceExpressionsByFace[i]));
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictAllAgeAndGenderTask(this, this.input);
    }
}
exports.PredictAllFaceExpressionsTask = PredictAllFaceExpressionsTask;
class PredictSingleFaceExpressionsTask extends PredictFaceExpressionsTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const faceExpressions = await extractFacesAndComputeResults_1.extractSingleFaceAndComputeResult(parentResult, this.input, face => nets_1.nets.faceExpressionNet.predictExpressions(face), this.extractedFaces);
        return WithFaceExpressions_1.extendWithFaceExpressions(parentResult, faceExpressions);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictSingleAgeAndGenderTask(this, this.input);
    }
}
exports.PredictSingleFaceExpressionsTask = PredictSingleFaceExpressionsTask;
class PredictAllFaceExpressionsWithFaceAlignmentTask extends PredictAllFaceExpressionsTask {
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptors() {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    }
}
exports.PredictAllFaceExpressionsWithFaceAlignmentTask = PredictAllFaceExpressionsWithFaceAlignmentTask;
class PredictSingleFaceExpressionsWithFaceAlignmentTask extends PredictSingleFaceExpressionsTask {
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
    withFaceDescriptor() {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    }
}
exports.PredictSingleFaceExpressionsWithFaceAlignmentTask = PredictSingleFaceExpressionsWithFaceAlignmentTask;
//# sourceMappingURL=PredictFaceExpressionsTask.js.map