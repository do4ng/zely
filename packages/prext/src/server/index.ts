import { rmSync } from 'fs';
import { Server, server } from 'sard.js';
import { Config } from '../config';
import { CACHE_DIRECTORY } from '../constants';
import { Handler } from '../core';

export function Prext(config: Config): Server {
  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });

  const app = server({ logging: false });

  config.middlewares?.forEach((middleware) => {
    app.use(middleware);
  });

  app.all('*', (req, res) => Handler(req, res, config));

  return app;
}
