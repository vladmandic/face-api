"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodejs = void 0;
function isNodejs() {
    return typeof global === 'object'
        && typeof require === 'function'
        && typeof module !== 'undefined'
        // issues with gatsby.js: module.exports is undefined
        // && !!module.exports
        && typeof process !== 'undefined' && !!process.version;
}
exports.isNodejs = isNodejs;
//# sourceMappingURL=isNodejs.js.map