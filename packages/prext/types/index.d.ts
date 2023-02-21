import { WatchOptions } from 'chokidar';
import { BuildOptions } from 'esbuild';
import { SardRequest, SardResponse, Server } from 'sard.js';
import { FileData } from './core';

export type Middleware = (req: SardRequest, res: SardResponse) => void;

export type HandlerType = (
  req: SardRequest,
  res: SardResponse,
  routes: FileData[]
) => void;

export type PluginOutput = FileData | null | undefined | void;

export interface Plugin {
  name: string;
  transform?: (id: string, code: string) => PluginOutput | Promise<PluginOutput>;
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
  // https://github.com/do4ng/prext/issues/7
  // error handling
  error?(req: SardRequest, res: SardResponse): void | Promise<void>;
}

export * from './config';
export * from './constants';
export * from './core';
export * from './server';
export * from './method';
