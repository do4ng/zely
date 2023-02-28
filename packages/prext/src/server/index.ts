import { rmSync } from 'fs';
import { Server, server } from 'sard.js';
import { Config } from '../config';
import { CACHE_DIRECTORY } from '../constants';
import { Handler } from '../core';
import { kit } from '../plugins/kit';
import { loadMiddlewares } from './load-middlewares';

export async function Prext(config: Config): Promise<Server> {
  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });

  const app = server({ logging: false });

  // plugins

  config.middlewares?.forEach((middleware) => {
    app.use(middleware);
  });

  config.plugins?.forEach((plugin) => {
    // console.log(plugin);
    if (plugin.server) plugin.server(app);
  });

  // @prext/plugin-kit

  kit().server(app);

  // auto middleware mode

  if (config.allowAutoMiddlewares) {
    const middlewares = await loadMiddlewares(config);

    middlewares.forEach((middleware) => {
      app.use(middleware.default || middleware);
    });
  }

  // handle

  app.all('*', (req, res) => {
    Handler(req, res, config);
  });

  return app;
}
