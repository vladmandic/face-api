import { ConvParams } from './types';
export declare function loadConvParamsFactory(extractWeightEntry: <T>(originalPath: string, paramRank: number) => T): (prefix: string) => ConvParams;
