import url from 'url';
import { pathToRegexp, SardRequest, SardResponse } from 'sard.js';
import { ObjectkeysMap } from '../../lib/chageKeys';

export function handles(
  req: SardRequest,
  res: SardResponse,
  routes: {
    file: string;
    m: any;
    modulePath: string;
    type: string;
  }[]
) {
  const parsed = url.parse(req.url);

  // @ts-ignore
  res.json = function (data: any) {
    res.end(JSON.stringify(data));
  };

  routes.forEach((page) => {
    const { pattern, params } = pathToRegexp(page.file, false);

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

            page.m[pageHandler](req, res);
          }
        });
      }
    }
  });
}
