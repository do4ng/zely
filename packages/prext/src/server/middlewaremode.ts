import { rmSync } from 'fs';
import { Config, pureMiddleware } from '../config';
import { Handler } from '../core';
import { error, warn } from '../logger';
import { kitMiddleware } from '../plugins/kit';
import { loadMiddlewares } from './load-middlewares';
import { CACHE_DIRECTORY } from '../constants';
import { Static } from '../plugins/public';

export async function middleware(config: Config): Promise<pureMiddleware[]> {
  if (!config.server?.middlewareMode) {
    error(
      'This function is not available when config.server.middlewareMode is disabled.'
    );
    return;
  }

  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });

  const middlewares: pureMiddleware[] = [];

  config.middlewares?.forEach((middleware) => {
    middlewares.push(middleware);
  });

  config.plugins?.forEach((plugin) => {
    // console.log(plugin);
    if (plugin.server) {
      warn(
        `[${plugin.name}] plugin.server is ignored (reason: config.server.middlewareMode enabled)`
      );
    }
  });

  middlewares.push(kitMiddleware);

  // @prext/plugin-kit

  // @osik/static

  if (config.public) middlewares.push(Static(config.public, config.publicOptions));

  // auto middleware mode

  if (config.allowAutoMiddlewares) {
    const middlewares = await loadMiddlewares(config);

    middlewares.forEach((middleware) => {
      middlewares.push(middleware.default || middleware);
    });
  }

  if (config.error) {
    warn('config.error is not available when config.server.middlewareMode is enabled.');
  }

  // handle

  middlewares.push((req, res, next) => {
    config.error = next;

    Handler(req, res, config);
  });

  return middlewares;
}
