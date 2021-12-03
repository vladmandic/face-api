import { FileSystem } from './types';
import { isNodejs } from './isNodejs';

export function createFileSystem(fs?: any): FileSystem {
  let requireFsError = '';
  if (!fs && isNodejs()) {
    try {
      // eslint-disable-next-line global-require
      fs = require('fs');
    } catch (err) {
      requireFsError = (err as any).toString();
    }
  }

  const readFile = fs
    ? (filePath: string) => new Promise((resolve, reject) => { fs.readFile(filePath, (err: any, buffer) => (err ? reject(err) : resolve(buffer))); })
    : () => { throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`); };
  return { readFile };
}
