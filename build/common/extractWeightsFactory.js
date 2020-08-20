export function extractWeightsFactory(weights) {
    let remainingWeights = weights;
    function extractWeights(numWeights) {
        const ret = remainingWeights.slice(0, numWeights);
        remainingWeights = remainingWeights.slice(numWeights);
        return ret;
    }
    function getRemainingWeights() {
        return remainingWeights;
    }
    return {
        extractWeights,
        getRemainingWeights
    };
}
//# sourceMappingURL=extractWeightsFactory.js.map