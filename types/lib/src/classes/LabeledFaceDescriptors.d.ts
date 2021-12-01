export declare class LabeledFaceDescriptors {
    private _label;
    private _descriptors;
    constructor(label: string, descriptors: Float32Array[]);
    get label(): string;
    get descriptors(): Float32Array[];
    toJSON(): any;
    static fromJSON(json: any): LabeledFaceDescriptors;
}
