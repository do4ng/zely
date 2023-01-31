import { build } from 'esbuild';
import { rmSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { Config } from './config';
import { CACHE_DIRECTORY } from './constants';
import { filenameToRoute, getPages } from './core';
import { error, info } from './logger';

export function exportsCode(config: Config) {
  return {
    import:
      'var { handles } = require("prext/dist/server");var { server } = require("sard.js");',
    init: 'var app = server();',
    listen: `app.listen(${config.port}, () => {console.log("Prext Server is running. " + "(localhost:${config.port})")});`,
  };
}

export async function exportServer(config: Config): Promise<void> {
  rmSync(CACHE_DIRECTORY, { recursive: true, force: true });
  console.log(`${'$'.gray} Exporting App.`.cyan);

  const start = performance.now();

  const out = join(CACHE_DIRECTORY, 'core.__build.js');
  const outDir = join(process.cwd(), config.base || '.', 'dist');
  const outFile = join(outDir, 'index.js');
  const pages = filenameToRoute(await getPages(config));

  const code = exportsCode(config);
  const pagesCode = {};

  const pagesJSONCode = [];

  pages.forEach((page, index) => {
    if (page.type === 'html') {
      error(
        `${page.file} isn't supported file (type: ${page.type}). Visit https://prext.netlify.app/guide/export for more information.`
      );
    } else {
      pagesCode[index] = `require("./${join(
        '',
        relative(CACHE_DIRECTORY, page.modulePath)
      ).replace(/\\/g, '\\\\')}")`;
    }
  });

  pages.forEach((page, index) => {
    if (page.type === 'module') {
      pagesJSONCode.push(
        `{file:"${page.file}",m:${pagesCode[index]},type:"${page.type}"}`
      );
    }
  });

  writeFileSync(
    out,
    `${code.import}${code.init};/*handle*/const prext_pages = [${pagesJSONCode.join(
      ','
    )}];app.all("*", (req,res) => {handles(req,res, prext_pages)});;${code.listen}`
  );

  info('success to create build file.');

  await build({
    entryPoints: [out],
    outfile: outFile,
    bundle: true,
    logLevel: 'error',
    platform: 'node',
    minify: true,
  });

  info('success to export app.');

  console.log(`${`\n  + ${out}`.green}`);
  console.log(
    `${`  + ${outFile}`.green}  ${'done in'.gray} ${
      (performance.now() - start).toFixed(2).bold
    } ms\n`
  );
}
