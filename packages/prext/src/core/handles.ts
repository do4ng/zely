import url from 'url';
import { pathToRegexp, SardRequest, SardResponse } from 'sard.js';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { CACHE_DIRECTORY } from '../constants';
import { ObjectkeysMap } from '../../lib/chageKeys';
import { error } from '../logger';
import { Config } from '../config';

export function handles(
  req: SardRequest,
  res: SardResponse,
  routes: {
    file: string;
    m: any;
    modulePath: string;
    type: string;
  }[],
  config: Config
) {
  const parsed = url.parse(req.url);

  // @ts-ignore
  res.json = function (data: any) {
    res.end(JSON.stringify(data));
  };

  if (parsed.pathname.startsWith('/.prext/')) {
    const target = join(CACHE_DIRECTORY, '../', parsed.pathname);

    if (existsSync(target)) {
      res.setHeader('Content-Type', 'text/javascript');
      res.end(readFileSync(target));
    } else {
      res.statusCode = 404;
      res.end(`Cannot read ${target}`);
    }
  }

  // is sended
  let isSended = false;

  routes.forEach((page) => {
    if (isSended) {
      return;
    }

    const { pattern, params } = pathToRegexp(page.file, false);

    isSended = true;

    if (pattern.test(parsed.pathname)) {
      // match!

      if (page.type === 'html') {
        // html

        res.setHeader('Content-Type', 'text/html');
        res.end(page.m);
      } else {
        // module

        page.m = ObjectkeysMap(page.m, (key) => key.toLowerCase());

        Object.keys(page.m).forEach((pageHandler) => {
          if (pageHandler === req.method.toLowerCase() || pageHandler === 'all') {
            const execd = new URL(req.url, `http://${req.headers.host}`).pathname.match(
              pattern
            );

            params.forEach((param, index) => {
              req.params[param] = execd[index + 1] || null;
            });

            try {
              page.m[pageHandler](req, res);
            } catch (e) {
              error(new Error(e));
            }
          }
        });
      }
    }
  });

  // 404
  if (!isSended) {
    if (config.error) config.error(req, res);
    else res.statusCode = 404;
  }
}
