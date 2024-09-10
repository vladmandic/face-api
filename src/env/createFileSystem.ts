import { FileSystem } from './types';
import { isNodejs } from './isNodejs';

export function createFileSystem(fs?: any): FileSystem {
  let requireFsError = '';
  if (!fs && isNodejs()) {
    try {
      // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
      fs = require('fs');
    } catch (err) {
      requireFsError = (err as any).toString();
    }
  }

  const readFile = fs
    // eslint-disable-next-line no-undef
    ? (filePath: string) => new Promise<string | Buffer>((resolve, reject) => { fs.readFile(filePath, (err: NodeJS.ErrnoException | null, buffer: string | Buffer) => (err ? reject(err) : resolve(buffer))); })
    : () => { throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`); };
  return { readFile };
}
