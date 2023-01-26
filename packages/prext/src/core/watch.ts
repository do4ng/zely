import chokidar from 'chokidar';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { Config } from '../config';
import { CACHE_DIRECTORY, CACHE_FILE } from '../constants';
import { typescriptLoader } from '../loader';

export function Watch(config: Config) {
  const watcher = chokidar.watch('.', { cwd: join(process.cwd(), config.base || '.') });

  watcher.on('change', async (path) => {
    const { ext } = parse(path);

    if (ext === 'ts' || ext === 'js') {
      const { filename } = await typescriptLoader(
        join(process.cwd(), config.base || '.', path)
      );

      const cache = JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));

      if (cache[path]) {
        rmSync(join(CACHE_DIRECTORY, cache[path]), {
          force: true,
          recursive: true,
        });
      }

      cache[path] = parse(filename).base;

      writeFileSync(CACHE_FILE, JSON.stringify(cache));
    }
  });
}
