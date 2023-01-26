import { build } from 'esbuild';
import { join, parse, relative } from 'path';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import randomFilename from '../../lib/random-filename';
import { CACHE_DIRECTORY } from '../constants';

export function typescriptLoader(target: string): Promise<{ filename: string; m: any }> {
  const dist = join(CACHE_DIRECTORY, parse(randomFilename(target)).base);

  return new Promise((resolve, reject) => {
    build({
      entryPoints: [target],
      // node_modules/.prext/~
      outfile: dist,

      bundle: true,
      minify: true,

      platform: 'node',
      format: __ESM__ ? 'esm' : 'cjs',
      plugins: [nodeExternalsPlugin() as any],
    })
      .then(() => {
        resolve({ filename: dist, m: require(relative(__dirname, dist)) });
      })
      .catch((e) => {
        reject(e);
      });
  });
}
