import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, relative } from 'path';
import { SardRequest, SardResponse } from 'sard.js';
import { Config, FileData } from '../config';
import { CACHE_DIRECTORY, CACHE_FILE, CACHE_VERSION } from '../constants';
import { typescriptLoader } from '../loader';
import { readDirectory } from '../../lib/readDirectory';
import { transformFilename } from '../../lib/transform-filename';
import { prettyURL } from '../../lib/pretty-url';
import { error, success } from '../logger';
import { handles } from './handles';

export async function getPages(config: Config): Promise<FileData> {
  let __cache: Record<string, string> = {};

  if (existsSync(CACHE_FILE)) {
    const cacheFile = JSON.parse(readFileSync(CACHE_FILE).toString());

    if (cacheFile.__CACHE_VERSION === CACHE_VERSION.toString()) __cache = cacheFile;
  } else {
    success('success to create page cache file.');
  }

  const cache = new Map(Object.entries(__cache));

  const files = await Promise.all(
    readDirectory(config.routes || 'pages').map(async (file) => {
      file = relative(config.routes || 'pages', file);

      const { ext } = parse(file);
      const target = join(config.routes || 'pages', file);

      // already compiled
      if (cache.has(target)) {
        // load module
        const pageModule = require(relative(
          __dirname,
          join(CACHE_DIRECTORY, cache.get(target))
        ));

        // custom path
        const pagePath = pageModule?.$page?.path;

        return {
          file: pagePath || file,
          m: pageModule,
          modulePath: join(CACHE_DIRECTORY, cache.get(target)),
          type: 'module',
        };
      }

      // https://github.com/do4ng/prext/issues/1
      // html
      if (ext === '.html') {
        const data = readFileSync(target).toString();

        return {
          file,
          m: data,
          modulePath: '',
          type: 'html',
        };
      }

      // result

      let r = null;

      // apply plugin

      await Promise.all(
        (config.plugins || []).map(async (plugin) => {
          try {
            if (plugin.transform) {
              const result = await plugin.transform(
                target,
                readFileSync(target).toString()
              );
              r = result;

              return;
            }
          } catch (e) {
            error(`[${plugin.name}] ${e}`);
          }
        })
      );

      if (r) {
        // console.log(r);
        return r;
      }

      try {
        const output = await typescriptLoader(target, config);

        // https://github.com/do4ng/prext/issues/7
        // custom path feature
        const customPage = output?.m?.$page?.path;
        // console.log(customPage);

        cache.set(target, parse(output.filename).base);

        return {
          file: customPage || file,
          m: output.m,
          modulePath: output.filename,
          type: 'module',
        };
      } catch (e) {
        error(`Occur ERROR while building ${file}\n${e}`);
      }
    })
  );

  const cacheJSON = Object.fromEntries(cache);

  // cache version
  cacheJSON.__CACHE_VERSION = CACHE_VERSION.toString();

  if (!existsSync(CACHE_DIRECTORY)) mkdirSync(CACHE_DIRECTORY);

  writeFileSync(CACHE_FILE, JSON.stringify(cacheJSON));

  return files as any;
}

export function filenameToRoute(map: Array<FileData>) {
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
  try {
    const pages = await getPages(config);
    const routes = filenameToRoute(pages as any);

    // console.log(routes);

    if (config.handler) config.handler(req, res, routes);
    else handles(req, res, routes, config);
  } catch (e) {
    error(e);
  }
}
