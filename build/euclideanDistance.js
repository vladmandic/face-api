export function euclideanDistance(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('euclideanDistance: arr1.length !== arr2.length');
    }
    const desc1 = Array.from(arr1);
    const desc2 = Array.from(arr2);
    return Math.sqrt(desc1
        .map((val, i) => val - desc2[i])
        .reduce((res, diff) => res + Math.pow(diff, 2), 0));
}
//# sourceMappingURL=euclideanDistance.js.map