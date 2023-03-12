import { existsSync } from 'fs';

export function usingLanguage(): 'js' | 'ts' {
  if (existsSync('prext.config.ts')) return 'ts';
  return 'js';
}
