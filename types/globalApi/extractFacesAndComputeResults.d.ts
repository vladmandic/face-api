import * as tf from '../../dist/tfjs.esm';
import { FaceDetection } from '../classes/FaceDetection';
import { TNetInput } from '../dom/index';
import { WithFaceDetection } from '../factories/WithFaceDetection';
import { WithFaceLandmarks } from '../factories/WithFaceLandmarks';
export declare function extractAllFacesAndComputeResults<TSource extends WithFaceDetection<{}>, TResult>(parentResults: TSource[], input: TNetInput, computeResults: (faces: Array<HTMLCanvasElement | tf.Tensor3D>) => Promise<TResult>, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | null, getRectForAlignment?: (parentResult: WithFaceLandmarks<TSource, any>) => FaceDetection): Promise<TResult>;
export declare function extractSingleFaceAndComputeResult<TSource extends WithFaceDetection<{}>, TResult>(parentResult: TSource, input: TNetInput, computeResult: (face: HTMLCanvasElement | tf.Tensor3D) => Promise<TResult>, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | null, getRectForAlignment?: (parentResultLocal: WithFaceLandmarks<TSource, any>) => FaceDetection): Promise<TResult>;
