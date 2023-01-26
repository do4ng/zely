#!/usr/bin/env node

import program from 'animaux';

import pkg from '../../package.json';
import { getConfig } from '../config';
import { Watch } from '../core/watch';
import { info } from '../logger';
import { Prext } from '../server';

const app = program('prext');

app.version(pkg.version);

app
  .command('dev')
  .describe('Start Prext Server (development mode)')
  .option('--config, -c', 'Provide config file path.')
  .action(async (options) => {
    const config = await getConfig(options.config || null);
    const port = config.port || 5050;

    Prext(config).listen(port, () => {
      console.log('\nServer is Running~!'.green);
      console.log(` ${'├─'.gray} http://localhost:${String(port).cyan}`.bold);
      console.log(` ${'└─'.gray} http://127.0.0.1:${String(port).cyan}`.bold);
      console.log();
      Watch(config);

      info('Observer is watching your app.');
    });
  });

app.parse(process.argv);
