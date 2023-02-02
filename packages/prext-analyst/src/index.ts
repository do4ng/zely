import * as prext from 'prext';
import 'colors';
import { join, normalize, relative } from 'path';
import { readdirSync, statSync } from 'fs';
import { CACHE_DIRECTORY } from 'prext';

function clean(path: string) {
  path = normalize(path);
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (!path.endsWith('/')) {
    path = `${path}/`;
  }
  return path;
}

async function core() {
  const config = await prext.getConfig();

  const pages = await prext.getPages(config);
  const routes = await prext.filenameToRoute(pages);

  console.log('');

  pages.forEach((page, index) => {
    const sliced = relative(process.cwd(), routes[index].modulePath)
      .replace(/\\/g, '/')
      .split('/');
    console.log(
      `${`${index + 1}.`.cyan} ${`${clean(config.routes || '/routes/')}`.grey}${
        page.file.replace(/\\/g, '/').bold
      } => ${routes[index].file.green} ${
        `(${sliced.slice(0, -1).join('/').dim}/${sliced[sliced.length - 1].bold})`.yellow
      }`
    );
  });

  let sized = 0;

  readdirSync(CACHE_DIRECTORY).forEach((f) => {
    const { size } = statSync(join(CACHE_DIRECTORY, f));

    sized += size;
  });

  console.log('');
  console.log(`Dist Directory - ${prext.CACHE_DIRECTORY.grey}`);
  console.log(`Cache File - ${prext.CACHE_FILE.grey}`);
  console.log(`Size - ${`${sized} byte`.grey}`);

  console.log('');
  console.log(`${String(pages.length).green.bold} pages found.\n`);
}

export { core };
