import { FileSystem } from './types';

export function createFileSystem(fs?: any): FileSystem {
  let requireFsError = '';

  if (!fs) {
    try {
      // eslint-disable-next-line global-require
      fs = require('fs');
    } catch (err) {
      requireFsError = err.toString();
    }
  }

  const readFile = fs
    ? (filePath: string) => new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filePath, (err: any, buffer: Buffer) => (err ? reject(err) : resolve(buffer)));
    })
    : () => {
      throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`);
    };

  return {
    readFile,
  };
}
