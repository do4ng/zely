import { OsikServer } from 'osik';
import { kit } from './plugins/kit';
import { Static } from './plugins/public';
import { Config } from './config';

export function applyPlugins(app: OsikServer, config: Config) {
  // @zely/plugin-kit

  kit().server(app);

  // @osik/static

  if (config.public) app.use(Static(config.public, config.publicOptions));

  // user plugins

  config.plugins?.forEach((plugin) => {
    // console.log(plugin);
    if (plugin.server) plugin.server(app);
  });
}
