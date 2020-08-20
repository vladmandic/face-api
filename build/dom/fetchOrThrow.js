"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrThrow = void 0;
const env_1 = require("../env");
async function fetchOrThrow(url, init) {
    const fetch = env_1.env.getEnv().fetch;
    const res = await fetch(url, init);
    if (!(res.status < 400)) {
        throw new Error(`failed to fetch: (${res.status}) ${res.statusText}, from url: ${res.url}`);
    }
    return res;
}
exports.fetchOrThrow = fetchOrThrow;
//# sourceMappingURL=fetchOrThrow.js.map