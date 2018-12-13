import { env } from '../env';
window.env = env;

import { generateChunk } from './generateChunk';

export function importFactory(type: string, logStyle: string = '') {
  if (logStyle && env.isDevelopment) {
    console.log(type + ' will be highlighted on load with %c' + logStyle, logStyle);
  }

  return function (name: string, relativePath?: string) {
    const isRelative = !!relativePath;
    const generate = (p: string) => generateChunk(p, isRelative, logStyle);

    if (!relativePath) {
      return generate(type + '/' + name);
    }

    const normalizedPath = relativePath.replace(/\\/g, '/');
    const sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;

    return generate(sourceless + '/' + name);
  };
}
