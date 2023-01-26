import { SardRequest, SardResponse } from 'sard.js';
import { Config } from '.';

/*

Javascript API

*/

export function getPages(config: Config): Promise<
  {
    file: string;
    m: any;
  }[]
>;

export function filenameToRoute(map: Array<{ file: string; m: any }>): {
  file: string;
  m: any;
}[];

export function Handler(
  req: SardRequest,
  res: SardResponse,
  config: Config
): Promise<void>;

/**
 * load typescript file
 * @param target
 */
export function typescriptLoader(target: string): Promise<{ filename: string; m: any }>;
