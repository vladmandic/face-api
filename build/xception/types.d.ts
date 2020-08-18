import { ConvParams, SeparableConvParams } from '../common';
export declare type ReductionBlockParams = {
    separable_conv0: SeparableConvParams;
    separable_conv1: SeparableConvParams;
    expansion_conv: ConvParams;
};
export declare type MainBlockParams = {
    separable_conv0: SeparableConvParams;
    separable_conv1: SeparableConvParams;
    separable_conv2: SeparableConvParams;
};
export declare type TinyXceptionParams = {
    entry_flow: {
        conv_in: ConvParams;
        reduction_block_0: ReductionBlockParams;
        reduction_block_1: ReductionBlockParams;
    };
    middle_flow: any;
    exit_flow: {
        reduction_block: ReductionBlockParams;
        separable_conv: SeparableConvParams;
    };
};
