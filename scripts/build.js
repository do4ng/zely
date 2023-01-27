const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { join } = require('path');

/** @type {import("esbuild").BuildOptions } */
const base = {
  target: 'esnext',
  bundle: true,
  platform: 'node',
};

const build = (
  pkg,
  entryPoint = 'src/index.ts',
  out = { cjs: 'dist/index.js', esm: 'dist/index.esm.js' },
  cfg = {}
) => {
  /** @type {import("esbuild").BuildOptions } */
  const pkgBase = {
    entryPoints: [join(process.cwd(), 'packages', pkg, entryPoint)],
    plugins: [
      nodeExternalsPlugin({
        packagePath: join(process.cwd(), 'packages', pkg, 'package.json'),
      }),
    ],
  };
  // @ts-ignore
  esbuild.build({
    outfile: join(process.cwd(), 'packages', pkg, out.cjs),
    ...pkgBase,
    ...base,
    ...cfg,
    format: 'cjs',
    define: {
      __ESM__: 'false',
    },
  });
  // @ts-ignore
  esbuild.build({
    outfile: join(process.cwd(), 'packages', pkg, out.esm),
    ...pkgBase,
    ...base,
    ...cfg,
    format: 'esm',
    define: {
      __ESM__: 'true',
    },
  });
};

build('sard');
build('prext');
// cli
build('prext', 'src/bin/index.ts', { cjs: 'dist/bin.js', esm: 'dist/bin.esm.js' });
build('create-prext', 'src/bin.ts', { cjs: 'dist/bin.js', esm: 'dist/bin.esm.js' });
