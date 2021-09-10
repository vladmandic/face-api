/* eslint-disable max-classes-per-file */
import { TNetInput } from '../dom/index';
import { extendWithFaceDescriptor, WithFaceDescriptor } from '../factories/WithFaceDescriptor';
import { WithFaceDetection } from '../factories/WithFaceDetection';
import { WithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { ComposableTask } from './ComposableTask';
import { extractAllFacesAndComputeResults, extractSingleFaceAndComputeResult } from './extractFacesAndComputeResults';
import { nets } from './nets';
import { PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from './PredictAgeAndGenderTask';
import { PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsWithFaceAlignmentTask } from './PredictFaceExpressionsTask';

export class ComputeFaceDescriptorsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
  constructor(
    // eslint-disable-next-line no-unused-vars
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>,
    // eslint-disable-next-line no-unused-vars
    protected input: TNetInput,
  ) {
    super();
  }
}

export class ComputeAllFaceDescriptorsTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource>[], TSource[]> {
  public override async run(): Promise<WithFaceDescriptor<TSource>[]> {
    const parentResults = await this.parentTask;
    const descriptors = await extractAllFacesAndComputeResults<TSource, Float32Array[]>(
      parentResults,
      this.input,
      (faces) => Promise.all(faces.map((face) => nets.faceRecognitionNet.computeFaceDescriptor(face) as Promise<Float32Array>)),
      null,
      (parentResult) => parentResult.landmarks.align(null, { useDlibAlignment: true }),
    );
    return descriptors.map((descriptor, i) => extendWithFaceDescriptor<TSource>(parentResults[i], descriptor));
  }

  withFaceExpressions() {
    return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }

  withAgeAndGender() {
    return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
}

export class ComputeSingleFaceDescriptorTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends ComputeFaceDescriptorsTaskBase<WithFaceDescriptor<TSource> | undefined, TSource | undefined> {
  public override async run(): Promise<WithFaceDescriptor<TSource> | undefined> {
    const parentResult = await this.parentTask;
    if (!parentResult) return undefined;
    const descriptor = await extractSingleFaceAndComputeResult<TSource, Float32Array>(
      parentResult,
      this.input,
      (face) => nets.faceRecognitionNet.computeFaceDescriptor(face) as Promise<Float32Array>,
      null,
      // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
      (parentResult) => parentResult.landmarks.align(null, { useDlibAlignment: true }),
    );
    return extendWithFaceDescriptor(parentResult, descriptor);
  }

  withFaceExpressions() {
    return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
  }

  withAgeAndGender() {
    return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }
}
