export class ComposableTask {
    async then(onfulfilled) {
        return onfulfilled(await this.run());
    }
    async run() {
        throw new Error('ComposableTask - run is not implemented');
    }
}
//# sourceMappingURL=ComposableTask.js.map