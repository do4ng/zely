import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, relative } from 'path';
import url from 'url';
import { pathToRegexp, SardRequest, SardResponse } from 'sard.js';
import { Config } from '../config';
import { CACHE_DIRECTORY, CACHE_FILE, CACHE_VERSION } from '../constants';
import { typescriptLoader } from '../loader';
import { readDirectory } from '../../lib/readDirectory';
import { transformFilename } from '../../lib/transform-filename';
import { prettyURL } from '../../lib/pretty-url';
import { ObjectkeysMap } from '../../lib/chageKeys';
import { info } from '../logger';

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
          type: 'module',
        };
      }

      if (ext === '.html') {
        const data = readFileSync(target).toString();

        return {
          file,
          m: data,
          type: 'html',
        };
      }

      const output = await typescriptLoader(target);

      cache.set(target, parse(output.filename).base);

      return {
        file,
        m: output.m,
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

export function filenameToRoute(map: Array<{ file: string; m: any; type: string }>) {
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

    return { file, m: page.m, type: page.type };
  });
}

export async function Handler(req: SardRequest, res: SardResponse, config: Config) {
  const pages = await getPages(config);
  const routes = filenameToRoute(pages);

  const parsed = url.parse(req.url);

  // @ts-ignore
  res.json = function (data: any) {
    res.end(JSON.stringify(data));
  };

  routes.forEach((page) => {
    const { pattern, params } = pathToRegexp(page.file, false);

    if (pattern.test(parsed.pathname)) {
      // match!

      if (page.type === 'html') {
        // html

        res.setHeader('Content-Type', 'text/html');
        res.end(page.m);
      } else {
        // module

        page.m = ObjectkeysMap(page.m, (key) => key.toLowerCase());

        Object.keys(page.m).forEach((pageHandler) => {
          if (pageHandler === req.method.toLowerCase() || pageHandler === 'all') {
            const execd = new URL(req.url, `http://${req.headers.host}`).pathname.match(
              pattern
            );
            params.forEach((param, index) => {
              req.params[param] = execd[index + 1] || null;
            });

            page.m[pageHandler](req, res);
          }
        });
      }
    }
  });
}
