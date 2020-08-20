"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seperateWeightMaps = void 0;
function seperateWeightMaps(weightMap) {
    const featureExtractorMap = {};
    const classifierMap = {};
    Object.keys(weightMap).forEach(key => {
        const map = key.startsWith('fc') ? classifierMap : featureExtractorMap;
        map[key] = weightMap[key];
    });
    return { featureExtractorMap, classifierMap };
}
exports.seperateWeightMaps = seperateWeightMaps;
//# sourceMappingURL=util.js.map