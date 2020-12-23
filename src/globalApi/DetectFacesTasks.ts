/* eslint-disable max-classes-per-file */
import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom/index';
import { extendWithFaceDetection, WithFaceDetection } from '../factories/WithFaceDetection';
import { SsdMobilenetv1Options } from '../ssdMobilenetv1/SsdMobilenetv1Options';
import { TinyFaceDetectorOptions } from '../tinyFaceDetector/TinyFaceDetectorOptions';
import { TinyYolov2Options } from '../tinyYolov2/index';
import { ComposableTask } from './ComposableTask';
import { DetectAllFaceLandmarksTask, DetectSingleFaceLandmarksTask } from './DetectFaceLandmarksTasks';
import { nets } from './nets';
import { PredictAllAgeAndGenderTask, PredictSingleAgeAndGenderTask } from './PredictAgeAndGenderTask';
import { PredictAllFaceExpressionsTask, PredictSingleFaceExpressionsTask } from './PredictFaceExpressionsTask';
import { FaceDetectionOptions } from './types';

export class DetectFacesTaskBase<TReturn> extends ComposableTask<TReturn> {
  constructor(
    // eslint-disable-next-line no-unused-vars
    protected input: TNetInput,
    // eslint-disable-next-line no-unused-vars
    protected options: FaceDetectionOptions = new SsdMobilenetv1Options(),
  ) {
    super();
  }
}

export class DetectAllFacesTask extends DetectFacesTaskBase<FaceDetection[]> {
  public async run(): Promise<FaceDetection[]> {
    const { input, options } = this;

    // eslint-disable-next-line no-nested-ternary
    const faceDetectionFunction = options instanceof TinyFaceDetectorOptions
      // eslint-disable-next-line no-shadow
      ? (input: TNetInput) => nets.tinyFaceDetector.locateFaces(input, options)
      : (
        // eslint-disable-next-line no-nested-ternary
        options instanceof SsdMobilenetv1Options
          // eslint-disable-next-line no-shadow
          ? (input: TNetInput) => nets.ssdMobilenetv1.locateFaces(input, options)
          : (
            options instanceof TinyYolov2Options
              // eslint-disable-next-line no-shadow
              ? (input: TNetInput) => nets.tinyYolov2.locateFaces(input, options)
              : null
          )
      );

    if (!faceDetectionFunction) {
      throw new Error('detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options');
    }

    return faceDetectionFunction(input);
  }

  private runAndExtendWithFaceDetections(): Promise<WithFaceDetection<{}>[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<WithFaceDetection<{}>[]>(async (resolve) => {
      const detections = await this.run();
      resolve(detections.map((detection) => extendWithFaceDetection({}, detection)));
    });
  }

  withFaceLandmarks(useTinyLandmarkNet: boolean = false) {
    return new DetectAllFaceLandmarksTask(
      this.runAndExtendWithFaceDetections(),
      this.input,
      useTinyLandmarkNet,
    );
  }

  withFaceExpressions() {
    return new PredictAllFaceExpressionsTask(
      this.runAndExtendWithFaceDetections(),
      this.input,
    );
  }

  withAgeAndGender() {
    return new PredictAllAgeAndGenderTask(
      this.runAndExtendWithFaceDetections(),
      this.input,
    );
  }
}

export class DetectSingleFaceTask extends DetectFacesTaskBase<FaceDetection | undefined> {
  public async run(): Promise<FaceDetection | undefined> {
    const faceDetections = await new DetectAllFacesTask(this.input, this.options);
    let faceDetectionWithHighestScore = faceDetections[0];
    faceDetections.forEach((faceDetection) => {
      if (faceDetection.score > faceDetectionWithHighestScore.score) {
        faceDetectionWithHighestScore = faceDetection;
      }
    });
    return faceDetectionWithHighestScore;
  }

  private runAndExtendWithFaceDetection(): Promise<WithFaceDetection<{}> | undefined> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<WithFaceDetection<{}> | undefined>(async (resolve) => {
      const detection = await this.run();
      resolve(detection ? extendWithFaceDetection<{}>({}, detection) : undefined);
    });
  }

  withFaceLandmarks(useTinyLandmarkNet: boolean = false) {
    return new DetectSingleFaceLandmarksTask(
      this.runAndExtendWithFaceDetection(),
      this.input,
      useTinyLandmarkNet,
    );
  }

  withFaceExpressions() {
    return new PredictSingleFaceExpressionsTask(
      this.runAndExtendWithFaceDetection(),
      this.input,
    );
  }

  withAgeAndGender() {
    return new PredictSingleAgeAndGenderTask(
      this.runAndExtendWithFaceDetection(),
      this.input,
    );
  }
}
