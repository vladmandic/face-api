"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWithGender = exports.isWithGender = void 0;
const types_1 = require("../ageGenderNet/types");
const utils_1 = require("../utils");
function isWithGender(obj) {
    return (obj['gender'] === types_1.Gender.MALE || obj['gender'] === types_1.Gender.FEMALE)
        && utils_1.isValidProbablitiy(obj['genderProbability']);
}
exports.isWithGender = isWithGender;
function extendWithGender(sourceObj, gender, genderProbability) {
    const extension = { gender, genderProbability };
    return Object.assign({}, sourceObj, extension);
}
exports.extendWithGender = extendWithGender;
//# sourceMappingURL=WithGender.js.map