import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { Plugin } from 'prext';
import { join, parse, relative } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

function generateRandomString() {
  return Math.random().toString(36).substr(2, 11);
}

export function randomFilename(original: string): string {
  const { dir, name } = parse(original);

  return join(dir, `${name}.${generateRandomString()}.js`);
}

export interface ReactLoaderConfig {
  indexHTML?: string;
}

export function react(config: ReactLoaderConfig = {}): Plugin {
  return {
    name: 'prexty/react-loader',

    async transform(id) {
      const CACHE_DIRECTORY = join(process.cwd(), '.prexty');

      // console.log(`BuildingReact${id}`);
      let cached = {};

      if (!existsSync(CACHE_DIRECTORY)) mkdirSync(CACHE_DIRECTORY);

      if (existsSync(join(CACHE_DIRECTORY, 'react.prexty.json'))) {
        cached = JSON.parse(
          readFileSync(join(CACHE_DIRECTORY, 'react.prexty.json')).toString()
        );
      }

      if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
        let out = randomFilename(join(CACHE_DIRECTORY, parse(id).base));

        if (cached[id]) {
          out = cached[id];
        } else {
          cached[id] = out;
        }

        await build({
          entryPoints: [id],
          outfile: out,
          format: 'cjs',
          bundle: true,
          minify: true,
          plugins: [nodeExternalsPlugin() as any],
        });

        const index = readFileSync(
          config.indexHTML || join(process.cwd(), 'public/index.html')
        ).toString();

        writeFileSync(join(CACHE_DIRECTORY, 'index.html'), index);

        // server

        writeFileSync(
          out.replace('.js', '.server.js'),
          `const react=require("react");const server=require("react-dom/server");
          module.exports.get=async function(req,res){var m=require("./${relative(
            CACHE_DIRECTORY,
            out
          ).replace(/\\/g, '/')}");res.setHeader('Content-Type', 'text/html');
          var i=require("fs").readFileSync(require("path").join(__dirname, "index.html")).toString();
          var props = (m.data ? await m.data({req, res}) : {});
          /*console.log(props)*/
          res.end(i.replace("<!--body-->", \`<script id="__DATA" type="text/json">\${JSON.stringify(props)}</script><div id="app">\${
            server.renderToString(react.createElement(m.default, props.props))
          }</div><script src="/.prexty/${parse(out).base.replace(
            '.js',
            '.client.js'
          )}"></script>\`));}`
        );

        // client

        writeFileSync(
          out.replace('.js', '.client.js'),
          `const react=require("react");const {hydrateRoot}=require("react-dom/client");var m=require("./${relative(
            CACHE_DIRECTORY,
            out
          )}");var props=JSON.parse(document.getElementById("__DATA").innerText)?.props || {};hydrateRoot(document.getElementById("app"), react.createElement(m.default, props))`
        );

        // console.log(`Building ${out.replace('.js', '.client.js')} ${CACHE_DIRECTORY}`);

        await build({
          entryPoints: [out.replace('.js', '.client.js')],
          outfile: out.replace('.js', '.client.js'),
          allowOverwrite: true,
          bundle: true,
          treeShaking: true,
          minify: true,
          platform: 'browser',
        });

        // console.log(join(CACHE_DIRECTORY, 'react.prexty.json'));

        writeFileSync(join(CACHE_DIRECTORY, 'react.prexty.json'), JSON.stringify(cached));

        return {
          file: parse(id).name,
          modulePath: '',
          origin: null,
          type: 'module',
          m: require(`./${relative(__dirname, out.replace('.js', '.server.js'))}`),
        };
      }
    },
  };
}
