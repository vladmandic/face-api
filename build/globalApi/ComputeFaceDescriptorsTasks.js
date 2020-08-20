"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputeSingleFaceDescriptorTask = exports.ComputeAllFaceDescriptorsTask = exports.ComputeFaceDescriptorsTaskBase = void 0;
const WithFaceDescriptor_1 = require("../factories/WithFaceDescriptor");
const ComposableTask_1 = require("./ComposableTask");
const extractFacesAndComputeResults_1 = require("./extractFacesAndComputeResults");
const nets_1 = require("./nets");
const PredictAgeAndGenderTask_1 = require("./PredictAgeAndGenderTask");
const PredictFaceExpressionsTask_1 = require("./PredictFaceExpressionsTask");
class ComputeFaceDescriptorsTaskBase extends ComposableTask_1.ComposableTask {
    constructor(parentTask, input) {
        super();
        this.parentTask = parentTask;
        this.input = input;
    }
}
exports.ComputeFaceDescriptorsTaskBase = ComputeFaceDescriptorsTaskBase;
class ComputeAllFaceDescriptorsTask extends ComputeFaceDescriptorsTaskBase {
    async run() {
        const parentResults = await this.parentTask;
        const descriptors = await extractFacesAndComputeResults_1.extractAllFacesAndComputeResults(parentResults, this.input, faces => Promise.all(faces.map(face => nets_1.nets.faceRecognitionNet.computeFaceDescriptor(face))), null, parentResult => parentResult.landmarks.align(null, { useDlibAlignment: true }));
        return descriptors.map((descriptor, i) => WithFaceDescriptor_1.extendWithFaceDescriptor(parentResults[i], descriptor));
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
}
exports.ComputeAllFaceDescriptorsTask = ComputeAllFaceDescriptorsTask;
class ComputeSingleFaceDescriptorTask extends ComputeFaceDescriptorsTaskBase {
    async run() {
        const parentResult = await this.parentTask;
        if (!parentResult) {
            return;
        }
        const descriptor = await extractFacesAndComputeResults_1.extractSingleFaceAndComputeResult(parentResult, this.input, face => nets_1.nets.faceRecognitionNet.computeFaceDescriptor(face), null, parentResult => parentResult.landmarks.align(null, { useDlibAlignment: true }));
        return WithFaceDescriptor_1.extendWithFaceDescriptor(parentResult, descriptor);
    }
    withFaceExpressions() {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    }
    withAgeAndGender() {
        return new PredictAgeAndGenderTask_1.PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    }
}
exports.ComputeSingleFaceDescriptorTask = ComputeSingleFaceDescriptorTask;
//# sourceMappingURL=ComputeFaceDescriptorsTasks.js.map