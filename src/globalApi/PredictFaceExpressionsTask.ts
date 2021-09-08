/* eslint-disable max-classes-per-file */
import * as tf from '../../dist/tfjs.esm';

import { TNetInput } from '../dom/index';
import { FaceExpressions } from '../faceExpressionNet/FaceExpressions';
import { WithFaceDetection } from '../factories/WithFaceDetection';
import { extendWithFaceExpressions, WithFaceExpressions } from '../factories/WithFaceExpressions';
import { WithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { ComposableTask } from './ComposableTask';
import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from './ComputeFaceDescriptorsTasks';
import { extractAllFacesAndComputeResults, extractSingleFaceAndComputeResult } from './extractFacesAndComputeResults';
import { nets } from './nets';
import { PredictAllAgeAndGenderTask, PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from './PredictAgeAndGenderTask';

export class PredictFaceExpressionsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
  constructor(
    // eslint-disable-next-line no-unused-vars
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>,
    // eslint-disable-next-line no-unused-vars
    protected input: TNetInput,
    // eslint-disable-next-line no-unused-vars
    protected extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D>,
  ) {
    super();
  }
}

export class PredictAllFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource>[], TSource[]> {
  public override async run(): Promise<WithFaceExpressions<TSource>[]> {
    const parentResults = await this.parentTask;

    const faceExpressionsByFace = await extractAllFacesAndComputeResults<TSource, FaceExpressions[]>(
      parentResults,
      this.input,
      async (faces) => Promise.all(
        faces.map((face) => nets.faceExpressionNet.predictExpressions(face) as Promise<FaceExpressions>),
      ),
      this.extractedFaces,
    );

    return parentResults.map(
      (parentResult, i) => extendWithFaceExpressions<TSource>(parentResult, faceExpressionsByFace[i]),
    );
  }

  withAgeAndGender() {
    return new PredictAllAgeAndGenderTask(this, this.input);
  }
}

export class PredictSingleFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource> | undefined, TSource | undefined> {
  public override async run(): Promise<WithFaceExpressions<TSource> | undefined> {
    const parentResult = await this.parentTask;
    if (!parentResult) {
      return undefined;
    }

    const faceExpressions = await extractSingleFaceAndComputeResult<TSource, FaceExpressions>(
      parentResult,
      this.input,
      (face) => nets.faceExpressionNet.predictExpressions(face) as Promise<FaceExpressions>,
      this.extractedFaces,
    );

    return extendWithFaceExpressions(parentResult, faceExpressions);
  }

  withAgeAndGender() {
    return new PredictSingleAgeAndGenderTask(this, this.input);
  }
}

export class PredictAllFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllFaceExpressionsTask<TSource> {
  override withAgeAndGender() {
    return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }

  withFaceDescriptors() {
    return new ComputeAllFaceDescriptorsTask(this, this.input);
  }
}

export class PredictSingleFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleFaceExpressionsTask<TSource> {
  override withAgeAndGender() {
    return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
  }

  withFaceDescriptor() {
    return new ComputeSingleFaceDescriptorTask(this, this.input);
  }
}
