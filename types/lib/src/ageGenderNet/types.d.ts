import * as tf from '../../dist/tfjs.esm';
import { FCParams } from '../common/index';
export declare enum Gender {
    FEMALE = "female",
    MALE = "male"
}
export type AgeAndGenderPrediction = {
    age: number;
    gender: Gender;
    genderProbability: number;
};
export type NetOutput = {
    age: tf.Tensor1D;
    gender: tf.Tensor2D;
};
export type NetParams = {
    fc: {
        age: FCParams;
        gender: FCParams;
    };
};
