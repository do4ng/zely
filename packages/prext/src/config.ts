/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { build, BuildOptions } from 'esbuild';
import { existsSync } from 'fs';
import { Server, SardRequest, SardResponse } from 'sard.js';
import { join, relative } from 'path';
import { WatchOptions } from 'chokidar';
import { CACHE_DIRECTORY, DEFAULT_CONFIG } from './constants';
import { typescriptLoader } from './loader';

export type FileType = 'html' | 'module';

export type FileData = {
  file: string;
  m: any;
  type: FileType;
  modulePath: string;
};

export type Middleware = (req: SardRequest, res: SardResponse) => void;

export type Routes = {
  file: string;
  m: any;
  modulePath: string;
  type: string;
}[];

export type HandlerType = (req: SardRequest, res: SardResponse, routes: Routes) => void;

export interface Plugin {
  name: string;
  transform?: (id: string, code: string) => FileData;
  server?: (server: Server) => void;
}

export interface Config {
  port?: number;
  routes?: string;
  middlewares?: Middleware[];
  base?: string;
  handler?: HandlerType;
  esbuild?: BuildOptions;
  plugins?: Plugin[];
  watch?: {
    enable: boolean;
    options?: WatchOptions;
  };
  build?: {};
  error?(req: SardRequest, res: SardResponse): void | Promise<void>;
  middlewareDirectory?: string;
  allowAutoMiddlewares?: boolean;
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

export async function configDev(): Promise<string> {
  if (existsSync('prext.config.js')) {
    await build({
      entryPoints: ['prext.config.js'],
      outfile: join(CACHE_DIRECTORY, 'core.config.js'),
      budnle: true,
      minify: true,
    });

    return join(CACHE_DIRECTORY, 'core.config.js');
  }

  if (existsSync('prext.config.ts')) {
    const built = await typescriptLoader(join(process.cwd(), 'prext.config.ts'));

    return built.filename;
  }

  return null;
}
