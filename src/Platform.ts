export class PlatformBrowser {
  private textEncoder: TextEncoder;

  constructor() {
    this.textEncoder = new TextEncoder();
  }

  fetch(path: string, init?: any): Promise<Response> {
    return fetch(path, init);
  }

  now(): number {
    return performance.now();
  }

  encode(text: string, encoding: string): Uint8Array {
    if (encoding !== 'utf-8' && encoding !== 'utf8') {
      throw new Error(`Browser's encoder only supports utf-8, but got ${encoding}`);
    }
    return this.textEncoder.encode(text);
  }

  decode(bytes: Uint8Array, encoding: string): string {
    return new TextDecoder(encoding).decode(bytes);
  }
}
