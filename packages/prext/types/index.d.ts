import { SardRequest, SardResponse } from 'sard.js';

export type Middleware = (req: SardRequest, res: SardResponse, next: () => void) => void;

export interface Config {
  port?: number;
  routes?: string;
  middlewares?: Middleware[];
  base?: string;
}

export * from './config';
export * from './constants';
export * from './core';
export * from './server';
export * from './method';
