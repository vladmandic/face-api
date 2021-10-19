export const FACE_EXPRESSION_LABELS = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];

export class FaceExpressions {
  public neutral = 0;
  public happy = 0;
  public sad = 0;
  public angry = 0;
  public fearful = 0;
  public disgusted = 0;
  public surprised = 0;

  constructor(probabilities: number[] | Float32Array) {
    if (probabilities.length !== 7) {
      throw new Error(`FaceExpressions.constructor - expected probabilities.length to be 7, have: ${probabilities.length}`);
    }

    FACE_EXPRESSION_LABELS.forEach((expression, idx) => {
      this[expression] = probabilities[idx];
    });
  }

  asSortedArray() {
    return FACE_EXPRESSION_LABELS
      .map((expression) => ({ expression, probability: this[expression] as number }))
      .sort((e0, e1) => e1.probability - e0.probability);
  }
}
