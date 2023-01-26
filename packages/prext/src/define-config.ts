import { assign, Config } from './config';

export function defineConfig(config: Config) {
  const r = assign(config);
  return r;
}
