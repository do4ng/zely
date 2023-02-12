import { join } from 'path';
import { Config } from './config';

export const CACHE_DIRECTORY = join(__dirname, '../../', '.prext');
export const DEFAULT_CONFIG: Config = {
  port: 3000,
  routes: './pages',
  middlewares: [],
  base: '.',
  esbuild: {},
};

export const CACHE_FILE = join(CACHE_DIRECTORY, 'cache.json');
export const CACHE_VERSION = '220124';
