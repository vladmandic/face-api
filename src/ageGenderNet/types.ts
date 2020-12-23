import * as tf from '../../dist/tfjs.esm';

import { FCParams } from '../common/index';

// eslint-disable-next-line no-shadow
export enum Gender {
  // eslint-disable-next-line no-unused-vars
  FEMALE = 'female',
  // eslint-disable-next-line no-unused-vars
  MALE = 'male'
}

export type AgeAndGenderPrediction = {
  age: number
  gender: Gender
  genderProbability: number
}

export type NetOutput = { age: tf.Tensor1D, gender: tf.Tensor2D }

export type NetParams = {
  fc: {
    age: FCParams
    gender: FCParams
  }
}
