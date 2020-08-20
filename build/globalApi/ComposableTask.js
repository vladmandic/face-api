"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposableTask = void 0;
class ComposableTask {
    async then(onfulfilled) {
        return onfulfilled(await this.run());
    }
    async run() {
        throw new Error('ComposableTask - run is not implemented');
    }
}
exports.ComposableTask = ComposableTask;
//# sourceMappingURL=ComposableTask.js.map