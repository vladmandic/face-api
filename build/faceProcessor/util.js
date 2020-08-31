export function seperateWeightMaps(weightMap) {
    const featureExtractorMap = {};
    const classifierMap = {};
    Object.keys(weightMap).forEach(key => {
        const map = key.startsWith('fc') ? classifierMap : featureExtractorMap;
        map[key] = weightMap[key];
    });
    return { featureExtractorMap, classifierMap };
}
//# sourceMappingURL=util.js.map