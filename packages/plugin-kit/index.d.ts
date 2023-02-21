import 'prext';
import 'sard.js';

declare module 'prext' {
  interface PrextRequest {
    query: object;
  }
  interface PrextResponse {
    html: (code: string) => this;
    send: (code: string) => this;
    status: (code: number) => this;
  }
}
