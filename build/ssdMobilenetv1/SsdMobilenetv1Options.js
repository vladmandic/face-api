export class SsdMobilenetv1Options {
    constructor({ minConfidence, maxResults } = {}) {
        this._name = 'SsdMobilenetv1Options';
        this._minConfidence = minConfidence || 0.5;
        this._maxResults = maxResults || 100;
        if (typeof this._minConfidence !== 'number' || this._minConfidence <= 0 || this._minConfidence >= 1) {
            throw new Error(`${this._name} - expected minConfidence to be a number between 0 and 1`);
        }
        if (typeof this._maxResults !== 'number') {
            throw new Error(`${this._name} - expected maxResults to be a number`);
        }
    }
    get minConfidence() { return this._minConfidence; }
    get maxResults() { return this._maxResults; }
}
//# sourceMappingURL=SsdMobilenetv1Options.js.map