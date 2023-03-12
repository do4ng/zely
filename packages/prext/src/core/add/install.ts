import { spawn } from 'child_process';
import { existsSync } from 'fs';

export function installEngine() {
  if (existsSync('yarn.lock')) {
    return 'yarn';
  }
  return 'npm';
}

export function installDependencies(devDependencies: string[]): Promise<void> {
  return new Promise((resolve) => {
    if (installEngine() === 'yarn') {
      const pro = spawn(`${/^win/.test(process.platform) ? 'yarn.cmd' : 'yarn'}`, [
        'add',
        '-D',
        devDependencies.join(' '),
      ]);
      pro.on('exit', () => {
        resolve();
      });
    } else {
      const pro = spawn(`${/^win/.test(process.platform) ? 'npm.cmd' : 'npm'}`, [
        'i',
        '--save-dev',
        devDependencies.join(' '),
      ]);

      pro.on('exit', () => {
        resolve();
      });
    }
  });
}
