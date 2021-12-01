import * as tf from '../../dist/tfjs.esm';
import { FCParams } from '../common/index';
export declare enum Gender {
    FEMALE = "female",
    MALE = "male"
}
export declare type AgeAndGenderPrediction = {
    age: number;
    gender: Gender;
    genderProbability: number;
};
export declare type NetOutput = {
    age: tf.Tensor1D;
    gender: tf.Tensor2D;
};
export declare type NetParams = {
    fc: {
        age: FCParams;
        gender: FCParams;
    };
};
