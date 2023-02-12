#!/usr/bin/env node

import program from 'animaux';

import pkg from '../../package.json';
import { getConfig } from '../config';
import { Watch } from '../core/watch';
import { exportServer } from '../export';
import { error, info, warn } from '../logger';
import { Prext } from '../server/index';

const app = program('prext');

app.version(pkg.version);

app
  .command('dev')
  .describe('Start Prext Server (development mode)')
  .option('--config, -c', 'Provide config file path.')
  .action(async (options) => {
    const config = await getConfig(options.config || null);
    const port = config.port || 5050;
    const startTime = performance.now();

    try {
      Prext(config).listen(port, () => {
        console.log('\nServer is Running~!'.green);
        console.log(` ${'├─'.gray} http://localhost:${String(port).cyan}`.bold);
        console.log(` ${'└─'.gray} http://127.0.0.1:${String(port).cyan}`.bold);
        console.log();
        info(`Done in ${((performance.now() - startTime) / 1000).toFixed(2)}s`);

        if (config?.watch?.enable === true || !config?.watch) {
          Watch(config);
          info('Observer is watching your app.');
        } else {
          warn('Observer has been disabled.');
        }
      });
    } catch (e) {
      error(e);
    }
  });

app
  .command('export', ['build'])
  .describe('Export Prext Server')
  .action(async (options) => {
    const config = await getConfig(options.config || null);

    exportServer(config);
  });

app
  .command('analyze')
  .describe('Analyze Prext Application')
  .action(async () => {
    try {
      const { core } = require('prext-analyst');
      core();
    } catch (e) {
      error(
        `Cannot find module "prext-analyst"\n\nRun:\n${
          '$'.grey
        } npm i --save-dev prext-analyst\n`
      );
    }
  });

app.parse(process.argv);
