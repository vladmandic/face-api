export function createFileSystem(fs) {
    let requireFsError = '';
    if (!fs) {
        try {
            fs = require('fs');
        }
        catch (err) {
            requireFsError = err.toString();
        }
    }
    const readFile = fs
        ? function (filePath) {
            return new Promise((res, rej) => {
                fs.readFile(filePath, function (err, buffer) {
                    return err ? rej(err) : res(buffer);
                });
            });
        }
        : function () {
            throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`);
        };
    return {
        readFile
    };
}
//# sourceMappingURL=createFileSystem.js.map