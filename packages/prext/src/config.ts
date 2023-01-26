import { existsSync } from 'fs';
import { SardRequest, SardResponse } from 'packages/sard/types';
import { join, relative } from 'path';
import { DEFAULT_CONFIG } from './constants';
import { typescriptLoader } from './loader';

// eslint-disable-next-line no-unused-vars
export type Middleware = (req: SardRequest, res: SardResponse) => void;

export interface Config {
  port?: number;
  routes?: string;
  middlewares?: Middleware[];
  base?: string;
}

export function assign(c: Config): Config {
  return {
    ...DEFAULT_CONFIG,
    ...c,
  };
}

export async function getConfig(target?: string): Promise<Config> {
  if (target) {
    return assign(require(relative(__dirname, target)));
  }

  if (existsSync('prext.config.js')) {
    return assign(require(relative(__dirname, join(process.cwd(), 'prext.config.js'))));
  }

  if (existsSync('prext.config.ts')) {
    return assign(
      await (
        await typescriptLoader(join(process.cwd(), 'prext.config.ts'))
      ).m.default
    );
  }

  return DEFAULT_CONFIG;
}
