import { build } from 'esbuild';
import { rmSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { performance } from 'perf_hooks';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { Config, configDev } from './config';
import { CACHE_DIRECTORY, DEFAULT_CONFIG } from './constants';
import { filenameToRoute, getPages } from './core';
import { success } from './logger';

export function exportsCode(config: Config) {
  return {
    import:
      'var { handles, applyPlugins } = require("prext/server");var { osik } = require("osik");',
    init: 'var app = osik();',
    listen: `app.listen(${config.port}, () => {console.log("Prext Server is running.".grey + " - " + "http://localhost:${config.port}".cyan)});`,
  };
}

export async function exportServer(
  config: Config,
  bundleModules: boolean = true
): Promise<void> {
  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });
  console.log(`${'$'.gray} Exporting App.\n`.cyan);

  const start = performance.now();

  const out = join(CACHE_DIRECTORY, 'core.__build.js');
  const outDir = join(process.cwd(), config.base || '.', 'dist');
  const outFile = join(outDir, 'index.js');
  const pages = filenameToRoute((await getPages(config)) as any);

  const code = exportsCode(config);
  const pagesCode = {};

  const pagesJSONCode = [];

  // get bundled config file
  const configData = await configDev();

  if (!configData) {
    writeFileSync(
      join(CACHE_DIRECTORY, 'core.config.json'),
      JSON.stringify(DEFAULT_CONFIG)
    );
  }

  // import pages
  pages.forEach((page, index) => {
    if (page.type === 'html') {
      pagesCode[index] = `\`${page.m.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``;
    } else {
      pagesCode[index] = `require("./${join(
        '',
        relative(CACHE_DIRECTORY, page.modulePath)
      ).replace(/\\/g, '\\\\')}")`;
    }
  });

  pages.forEach((page, index) => {
    pagesJSONCode.push(`{file:"${page.file}",m:${pagesCode[index]},type:"${page.type}"}`);
  });

  writeFileSync(
    out,
    `const __userconfig = require("./${relative(CACHE_DIRECTORY, configData).replace(
      /\\/g,
      '/'
    )}");
${code.import}
${code.init}
const prext_pages = [${pagesJSONCode.join(',')}];
applyPlugins(app, __userconfig);
(__userconfig.default.middlewares || []).forEach((middleware) => app.use(middleware));
app.use((req,res) => {handles(req,res, prext_pages)});
${code.listen}`
  );

  success('success to create build file.');

  await build({
    entryPoints: [out],
    outfile: outFile,
    bundle: true,
    logLevel: 'error',
    platform: 'node',
    minify: true,
    ...(!bundleModules ? { plugins: [nodeExternalsPlugin() as any] } : {}),
  });

  success('success to export app.');

  console.log(`\n${`  ${'-'.grey} ${(configData || '').yellow.dim}`}`);
  console.log(`${`  ${'-'.grey} ${out.yellow.dim}`}\n`);
  console.log(
    `${`  ${'+'.green} ${outFile.cyan}`}  ${'done in'.gray} ${
      (performance.now() - start).toFixed(2).bold
    } ms\n`
  );
}
