export interface IFaceMatch {
    label: string;
    distance: number;
}
export declare class FaceMatch implements IFaceMatch {
    private _label;
    private _distance;
    constructor(label: string, distance: number);
    get label(): string;
    get distance(): number;
    toString(withDistance?: boolean): string;
}
