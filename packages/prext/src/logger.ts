//
// https://www.npmjs.com/package/@do4ng/console
//
// $ npm i @do4ng/console
//

import 'colors';

const tab = '  ';

function parseError(err: Error) {
  const st = err.stack?.split('\n').slice(1);
  return st?.map((stack) => {
    stack = stack.slice(7);
    const $ = {
      at: '',
      loc: '',
    };

    $.loc = (/\([^)]*\)/.exec(stack) || [])[0] || '';
    $.at = stack.replace($.loc, '');

    return $;
  });
}

function error(err: Error | string) {
  if (typeof err === 'string') {
    console.log(`${'(@)'.red.bold} ${err.bold}`);
  } else {
    const stacks = parseError(err);

    console.log(`\n${' ERROR '.bgRed.black.bold} ${err.message.bold}\n`);

    stacks?.forEach((stack) => {
      console.log(`${tab}${'at'.gray} ${stack.at}${stack.loc.cyan}`);
    });
    console.log();
  }
}

function warn(message: string) {
  console.log(`${'(!)'.yellow.bold} ${message.bold}`);
}

function success(message: string) {
  console.log(`${'(✔)'.green.bold} ${message.bold}`);
}

function info(message: string) {
  console.log(`${'(i)'.blue.bold} ${message.bold}`);
}

/**
error(new Error('err'));
error('err');
warn('warn');
success('success');
info('info');
const p = print('0');
let index = 0;
const a = setInterval(() => {
  index++;
  p.edit(index.toString());

  if (index >= 10) {
    p.break();
    clearInterval(a);
    info('break!');
  }
}, 100);
*/

export { success, info, error, warn, parseError };