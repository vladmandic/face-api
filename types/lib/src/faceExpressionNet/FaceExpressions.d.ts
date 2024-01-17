export declare const FACE_EXPRESSION_LABELS: readonly ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];
export declare class FaceExpressions {
    neutral: number;
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    disgusted: number;
    surprised: number;
    constructor(probabilities: number[] | Float32Array);
    asSortedArray(): {
        expression: "neutral" | "happy" | "sad" | "angry" | "fearful" | "disgusted" | "surprised";
        probability: number;
    }[];
}
