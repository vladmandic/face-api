"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWeightEntryFactory = void 0;
const utils_1 = require("../utils");
function extractWeightEntryFactory(weightMap, paramMappings) {
    return function (originalPath, paramRank, mappedPath) {
        const tensor = weightMap[originalPath];
        if (!utils_1.isTensor(tensor, paramRank)) {
            throw new Error(`expected weightMap[${originalPath}] to be a Tensor${paramRank}D, instead have ${tensor}`);
        }
        paramMappings.push({ originalPath, paramPath: mappedPath || originalPath });
        return tensor;
    };
}
exports.extractWeightEntryFactory = extractWeightEntryFactory;
//# sourceMappingURL=extractWeightEntryFactory.js.map