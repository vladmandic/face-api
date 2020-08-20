"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJson = void 0;
const fetchOrThrow_1 = require("./fetchOrThrow");
async function fetchJson(uri) {
    return (await fetchOrThrow_1.fetchOrThrow(uri)).json();
}
exports.fetchJson = fetchJson;
//# sourceMappingURL=fetchJson.js.map