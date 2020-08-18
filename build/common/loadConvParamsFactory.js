export function loadConvParamsFactory(extractWeightEntry) {
    return function (prefix) {
        const filters = extractWeightEntry(`${prefix}/filters`, 4);
        const bias = extractWeightEntry(`${prefix}/bias`, 1);
        return { filters, bias };
    };
}
//# sourceMappingURL=loadConvParamsFactory.js.map