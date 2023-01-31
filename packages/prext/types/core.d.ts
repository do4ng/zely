import { SardRequest, SardResponse } from 'sard.js';
import { Config } from '.';

/*

Javascript API

*/

export type FileData = {
  file: string;
  m: any;
  type: string;
  modulePath: string;
};

export function getPages(config: Config): Promise<FileData[]>;

export function filenameToRoute(map: FileData[]): FileData[];

export function Handler(
  req: SardRequest,
  res: SardResponse,
  config: Config
): Promise<void>;

export function handles(req: SardRequest, res: SardResponse, routes: FileData[]): void;

/**
 * load typescript file
 * @param target
 */
export function typescriptLoader(target: string): Promise<{ filename: string; m: any }>;
