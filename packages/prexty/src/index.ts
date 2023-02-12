import { existsSync, readFileSync } from 'fs';
import url from 'url';
import { join } from 'path';
import { Plugin } from 'prext';

export function prexty(): Plugin {
  return {
    name: 'prexty',

    server(server) {
      // console.log(server);

      server.get('/.prexty/*', (req, res) => {
        const parsed = url.parse(req.url);
        const target = join(process.cwd(), parsed.pathname);

        // console.log(target);

        if (existsSync(target)) {
          res.setHeader('Content-Type', 'text/javascript');
          res.end(readFileSync(target));
        } else {
          res.statusCode = 404;
          res.end(`Cannot read ${target}`);
        }
      });
    },
  };
}

export * from './react';
