/* eslint-disable no-case-declarations */
import { existsSync, mkdirSync } from 'fs';
import { spinner } from '../../spinner';
import { installDependencies, installEngine } from './install';
import { usingLanguage } from './lang';

export async function add(command) {
  switch (command) {
    case 'cors':
      console.log();
      console.log(`Installing ${'cors'.cyan}`);
      console.log();

      const engine = installEngine();
      const download = spinner({});

      download.edit(`installing dependencies. ${`(using ${engine})`.gray}`);

      download.start();

      await installDependencies(['cors', '@prext/plugin-cors']);

      download.stop(`${'✓'.green} installed dependencies.\n`);

      const clone = spinner({
        message: 'cloning template',
      }).start();

      const plugin: typeof import('@prext/plugin-cors') = require('@prext/plugin-cors');

      if (!existsSync('middlewares')) mkdirSync('middlewares');

      plugin.clone(usingLanguage(), 'middlewares/cors.ts');

      clone.stop(`${'✓'.green} cloned template.\n`);

      console.log();
      console.log(`Please enable ${'"config.allowAutoMiddlewares"'.cyan}.`);
      console.log(
        'Documentation - https://prext.netlify.app/guide/middlewares#auto-mode'.gray
      );

      console.log();

      console.log('Happy Hacking!'.blue);

      break;
    default:
      break;
  }
}
