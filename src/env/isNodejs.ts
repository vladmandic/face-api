export function isNodejs(): boolean {
  return typeof global === 'object'
    && typeof require === 'function'
    && typeof module !== 'undefined'
    && typeof process !== 'undefined' && !!process.version;
}
