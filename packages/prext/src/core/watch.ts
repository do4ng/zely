import chokidar from 'chokidar';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { Config } from '../config';
import { CACHE_DIRECTORY, CACHE_FILE } from '../constants';
import { typescriptLoader } from '../loader';

export function Watch(config: Config) {
  const watcher = chokidar.watch('.', {
    cwd: join(process.cwd(), config.base || '.'),
    ignored: ['node_modules', '.prexty', '.prext'],
    ...(config.watch?.options || {}),
  });

  let isFirst = true;

  watcher.on('change', async (path) => {
    if (!existsSync(CACHE_FILE)) {
      return;
    }
    const { ext, name } = parse(path);

    if (isFirst) {
      console.log();
      isFirst = false;
    }

    // console.log(ext);

    if (ext === '.ts' || ext === '.js') {
      if (name === 'prext.config') {
        console.log(`${'•'.cyan} Config file changed. Please restart app.`);
      } else {
        const { dir, base } = parse(path.replace(/\\/g, '/'));
        console.log(`${'•'.green} ${`${dir}/`.gray}${base.bold}`);
      }

      const { filename } = await typescriptLoader(
        join(process.cwd(), config.base || '.', path),
        config
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
