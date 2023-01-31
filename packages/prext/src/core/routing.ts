import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, relative } from 'path';
import { SardRequest, SardResponse } from 'sard.js';
import { Config } from '../config';
import { CACHE_DIRECTORY, CACHE_FILE, CACHE_VERSION } from '../constants';
import { typescriptLoader } from '../loader';
import { readDirectory } from '../../lib/readDirectory';
import { transformFilename } from '../../lib/transform-filename';
import { prettyURL } from '../../lib/pretty-url';
import { info } from '../logger';
import { handles } from './handles';

export async function getPages(config: Config) {
  let __cache: Record<string, string> = {};

  if (existsSync(CACHE_FILE)) {
    const cacheFile = JSON.parse(readFileSync(CACHE_FILE).toString());

    if (cacheFile.__CACHE_VERSION === CACHE_VERSION.toString()) __cache = cacheFile;
  } else {
    info('Success to create cache file.');
  }

  const cache = new Map(Object.entries(__cache));

  const files = await Promise.all(
    readDirectory(config.routes || 'pages').map(async (file) => {
      file = relative(config.routes || 'pages', file);

      const { ext } = parse(file);
      const target = join(config.routes || 'pages', file);

      if (cache.has(target)) {
        // already compiled

        return {
          file,
          m: require(relative(__dirname, join(CACHE_DIRECTORY, cache.get(target)))),
          modulePath: join(CACHE_DIRECTORY, cache.get(target)),
          type: 'module',
        };
      }

      if (ext === '.html') {
        const data = readFileSync(target).toString();

        return {
          file,
          m: data,
          modulePath: '',
          type: 'html',
        };
      }

      const output = await typescriptLoader(target);

      cache.set(target, parse(output.filename).base);

      return {
        file,
        m: output.m,
        modulePath: output.filename,
        type: 'module',
      };
    })
  );

  const cacheJSON = Object.fromEntries(cache);

  // cache version
  cacheJSON.__CACHE_VERSION = CACHE_VERSION.toString();

  writeFileSync(CACHE_FILE, JSON.stringify(cacheJSON));

  return files;
}

export function filenameToRoute(
  map: Array<{ file: string; m: any; type: string; modulePath: string }>
) {
  return map.map((page) => {
    let { file } = page;
    // eslint-disable-next-line prefer-const
    let { dir, name } = parse(file);

    if (name === 'index') {
      name = '';
    }

    file = join(dir, name);
    file = file.replace(/\\/g, '/');
    file = transformFilename(file);
    file = prettyURL(file);

    return { file, m: page.m, type: page.type, modulePath: page.modulePath };
  });
}

export async function Handler(req: SardRequest, res: SardResponse, config: Config) {
  const pages = await getPages(config);
  const routes = filenameToRoute(pages);

  handles(req, res, routes);
}
