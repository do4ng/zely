/* eslint-disable no-unused-vars */
import http from 'http';
import 'colors';
import { parse } from 'url';
import { pathToRegexp } from './regexp';
import { HandlerType, SardRequest, SardResponse } from '../types';

export interface Sard {
  server?: http.Server;
  logging?: boolean;
}

class Server {
  options: Sard = {};

  middlewares: any[] = []; // empty

  handles: {
    q: RegExp;
    fn: Function;
    __original?: { pattern: RegExp; params: string[] };
    method: string;
  }[] = [];

  constructor(options: Sard = {}) {
    this.options = options;
    this.handles = [];
  }

  addHandler(m: string, query: string | RegExp, fn: any) {
    if (typeof query === 'string') {
      const parsed = pathToRegexp(query, false);
      this.handles.push({
        q: parsed.pattern,
        fn,
        __original: parsed,
        method: m,
      });
    } else {
      this.handles.push({ q: query as RegExp, fn, method: m });
    }
  }

  use(...fn: HandlerType[]) {
    fn.forEach((f) => {
      this.addHandler('all', '*', f);
    });

    return this;
  }

  get(query: string, handler: HandlerType) {
    this.addHandler('get', query, handler);
  }

  post(query: string, handler: HandlerType) {
    this.addHandler('post', query, handler);
  }

  delete(query: string, handler: HandlerType) {
    this.addHandler('delete', query, handler);
  }

  all(query: string, handler: HandlerType) {
    this.addHandler('all', query, handler);
  }

  handler(req: SardRequest, res: SardResponse) {
    let index = -1;

    // const parsed = parse(req.url);

    const loop = () => {
      if (index < this.handles.length && !res.writableEnded) {
        const handle = this.handles[(index += 1)];
        if (handle) {
          if (
            handle.method.toUpperCase() === 'ALL' ||
            req.method.toUpperCase() === handle.method.toUpperCase()
          ) {
            if (handle.__original?.pattern.test(parse(req.url).pathname)) {
              // parse params

              req.params = {};

              if (handle.__original) {
                const execd = new URL(
                  req.url,
                  `http://${req.headers.host}`
                ).pathname.match(handle.__original.pattern);
                handle.__original.params.forEach((param, index) => {
                  req.params[param] = execd[index + 1] || null;
                });
              }

              // eslint-disable-next-line no-use-before-define
              handle.fn(req, res, next);
            } else {
              loop();
            }
          } else {
            loop();
          }
        } else {
          res.statusCode = 404;
          res.end();
        }
      }
    };

    const next = (err) => {
      if (err) console.error(err);
      else loop();
    };

    // req.body

    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (body === '') {
        body = '{}';
      }

      req.body = JSON.parse(body);
      loop();
    });

    if (res.writableEnded && this.options.logging) {
      console.log(
        `${req.url.bold} => ${
          res.statusCode === 404 ? '404'.red : res.statusCode.toString().green
        }`
      );
    }
  }

  listen(port: number, ...args: any[]) {
    http
      .createServer((req, res) => {
        this.handler(req as any, res);
      })
      .listen(port, ...args);

    return this;
  }
}

function server(options: Sard = {}) {
  return new Server(options);
}

// eslint-disable-next-line no-restricted-exports
export { pathToRegexp, server };
