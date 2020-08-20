"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const tslib_1 = require("tslib");
const createBrowserEnv_1 = require("./createBrowserEnv");
const createFileSystem_1 = require("./createFileSystem");
const createNodejsEnv_1 = require("./createNodejsEnv");
const isBrowser_1 = require("./isBrowser");
const isNodejs_1 = require("./isNodejs");
let environment;
function getEnv() {
    if (!environment) {
        throw new Error('getEnv - environment is not defined, check isNodejs() and isBrowser()');
    }
    return environment;
}
function setEnv(env) {
    environment = env;
}
function initialize() {
    // check for isBrowser() first to prevent electron renderer process
    // to be initialized with wrong environment due to isNodejs() returning true
    if (isBrowser_1.isBrowser()) {
        return setEnv(createBrowserEnv_1.createBrowserEnv());
    }
    if (isNodejs_1.isNodejs()) {
        return setEnv(createNodejsEnv_1.createNodejsEnv());
    }
}
function monkeyPatch(env) {
    if (!environment) {
        initialize();
    }
    if (!environment) {
        throw new Error('monkeyPatch - environment is not defined, check isNodejs() and isBrowser()');
    }
    const { Canvas = environment.Canvas, Image = environment.Image } = env;
    environment.Canvas = Canvas;
    environment.Image = Image;
    environment.createCanvasElement = env.createCanvasElement || (() => new Canvas());
    environment.createImageElement = env.createImageElement || (() => new Image());
    environment.ImageData = env.ImageData || environment.ImageData;
    environment.Video = env.Video || environment.Video;
    environment.fetch = env.fetch || environment.fetch;
    environment.readFile = env.readFile || environment.readFile;
}
exports.env = {
    getEnv,
    setEnv,
    initialize,
    createBrowserEnv: createBrowserEnv_1.createBrowserEnv,
    createFileSystem: createFileSystem_1.createFileSystem,
    createNodejsEnv: createNodejsEnv_1.createNodejsEnv,
    monkeyPatch,
    isBrowser: isBrowser_1.isBrowser,
    isNodejs: isNodejs_1.isNodejs
};
initialize();
tslib_1.__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map