import { Plugin } from 'prext';

import url from 'url';

export function kit(): Plugin {
  return {
    name: '@prext/plugin-kit',
    server(server) {
      // eslint-disable-next-line no-unused-vars
      server.use((req, res) => (req: any, res: any) => {
        // req.query
        // ?foo=bar => {"foo":"bar"}
        req.query = url.parse(req.url).query;

        // res.html
        // res.html("<p>ABCD</p>")
        res.html = (code: string) => {
          res.setHeader('Content-Type', 'text/html');
          res.end(code);
          return res;
        };

        // res.send
        // res.send("text")
        // same: res.end
        res.send = res.end;

        // res.status
        // res.status(404).send("not found")
        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };
      });
    },
  };
}
