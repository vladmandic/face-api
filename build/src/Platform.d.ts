export declare class PlatformBrowser {
    private textEncoder;
    fetch(path: string, init?: RequestInit): Promise<Response>;
    now(): number;
    encode(text: string, encoding: string): Uint8Array;
    decode(bytes: Uint8Array, encoding: string): string;
}
