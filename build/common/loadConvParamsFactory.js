"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConvParamsFactory = void 0;
function loadConvParamsFactory(extractWeightEntry) {
    return function (prefix) {
        const filters = extractWeightEntry(`${prefix}/filters`, 4);
        const bias = extractWeightEntry(`${prefix}/bias`, 1);
        return { filters, bias };
    };
}
exports.loadConvParamsFactory = loadConvParamsFactory;
//# sourceMappingURL=loadConvParamsFactory.js.map