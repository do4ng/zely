import http from 'http';

export interface Sard {
  server?: http.Server;
  logging?: boolean;
}

export type SardRequest = http.IncomingMessage & { params: any; body: object };
export type SardResponse = http.ServerResponse;

export type HandlerType = (req: SardRequest, res: SardResponse, next: () => void) => void;

export interface Server {
  options: Sard;

  middlewares: any[];

  handles: {
    q: RegExp;
    fn: Function;
    __original?: { pattern: RegExp; params: string[] };
    method: string;
  }[];

  // constructor(options?: Prever);

  use(...fn: HandlerType[]): this;

  get(query: string, handler: HandlerType): void;
  post(query: string, handler: HandlerType): void;
  delete(query: string, handler: HandlerType): void;
  all(query: string, handler: HandlerType): void;

  listen(port: number, ...args: any[]): this;

  handler(req: SardRequest, res: SardResponse): void;
  addHandler(m: string, query: string | RegExp, fn: any): void;
}

export function server(options: Sard): Server;

export function pathToRegexp(
  path: string,
  loose: boolean
): { params: string[]; pattern: RegExp };
