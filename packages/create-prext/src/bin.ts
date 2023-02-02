#!/usr/bin/env node

import program from 'animaux';
import 'colors';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import pkg from '../package.json';

const $ = {
  ts: [
    'prext.config.ts',
    'pages/index.ts',
    'pages/users/$id.ts',
    'middlewares/message.ts',
  ],
  js: [
    'prext.config.js',
    'pages/index.js',
    'pages/users/$id.js',
    'middlewares/message.js',
  ],
};

const msg = {
  success: 'success'.green,
  $: '$'.gray,
  '>': '>'.red,
};

const app = program('prext');

function clone(
  target: string,
  files: string[],
  type: 'with-javascript' | 'with-typescript'
) {
  files.forEach((file) => {
    const data = readFileSync(join(__dirname, '../assets', type, file));

    writeFileSync(join(target, file), data);
  });
}

app
  .version(pkg.version)
  .option('--with-javascript', 'Javascript template', true)
  .option('--with-typescript', 'Typescript template', false);

app.action((options) => {
  const target = options.__.join(' ');

  mkdirSync(target, { recursive: true });
  mkdirSync(join(target, 'pages'), { recursive: true });
  mkdirSync(join(target, 'pages/users'), { recursive: true });
  mkdirSync(join(target, 'middlewares'), { recursive: true });

  if (options['with-typescript']) {
    clone(target, $.ts, 'with-typescript');
  } else {
    clone(target, $.js, 'with-javascript');
  }

  const pkgJSON = JSON.stringify(
    {
      name: 'prext-app',
      version: '1.0.0',
      dependencies: { prext: '*' },
      scripts: { dev: 'prext dev', build: 'prext build' },
    },
    null,
    2
  );

  writeFileSync(join(target, 'package.json'), pkgJSON);

  console.log(`${msg.success} template cloned!`);

  console.log(`\n  ${msg.$} cd ${target}`);
  console.log(`  ${msg.$} npm i`);
  console.log(`  ${msg.$} npm run dev\n`);

  console.log('Happy hacking'.cyan);
});

app.parse(process.argv);
