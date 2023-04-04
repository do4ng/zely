import { WatchOptions } from 'chokidar';
import { BuildOptions } from 'esbuild';
import { Request, Response, OsikServer } from 'osik';
import { FileData } from './core';

export type Middleware = (req: Request, res: Response, next: any) => void;

export type HandlerType = (req: Request, res: Response, routes: FileData[]) => void;

export type PluginOutput = FileData | null | undefined | void;

export interface Plugin {
  name: string;
  transform?: (id: string, code: string) => PluginOutput | Promise<PluginOutput>;
  server?: (server: OsikServer) => void;
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
  // https://github.com/do4ng/prext/issues/7
  // error handling
  error?(req: Request, res: Response): void | Promise<void>;

  // auto middleware

  middlewareDirectory?: string;
  allowAutoMiddlewares?: boolean;
}

export function showListen(port: string | number): void;

export * from './config';
export * from './constants';
export * from './core';
export * from './server';
export * from './method';
export * from './dependencies';
