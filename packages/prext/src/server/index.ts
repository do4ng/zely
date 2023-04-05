import { rmSync } from 'fs';
import { OsikServer, osik } from 'osik';
import { Config } from '../config';
import { CACHE_DIRECTORY } from '../constants';
import { Handler } from '../core';
import { kit } from '../plugins/kit';
import { loadMiddlewares } from './load-middlewares';

export async function Prext(config: Config): Promise<OsikServer> {
  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });

  const app = osik(config.server?.osik);

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

  app.use((req, res) => {
    Handler(req, res, config);
  });

  return app;
}
