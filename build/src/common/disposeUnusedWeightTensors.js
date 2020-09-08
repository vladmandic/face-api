export function disposeUnusedWeightTensors(weightMap, paramMappings) {
    Object.keys(weightMap).forEach(path => {
        if (!paramMappings.some(pm => pm.originalPath === path)) {
            weightMap[path].dispose();
        }
    });
}
//# sourceMappingURL=disposeUnusedWeightTensors.js.map