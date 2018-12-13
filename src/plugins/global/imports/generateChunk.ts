function logChunk(path: string, typeStyle?: string, type: 'info' | 'error' = 'info', e?) {
  if (env.isDevelopment) {
    const componentName = /\/((?:(?:[^\/\n]+\/){0,1})(?:.(?!\/))+)$/g;
    const formattedName = path.includes('/') ? path.replace(componentName, '/%c$1') : ('%c' + path);
    const message = type === 'info' ? 'Chunk loaded' : 'Error loading chunk';
    const resultingColor = type === 'info' ? 'green' : 'red';
    const ambientColor = 'grey';

    console[type](
      `%c${message}: %c${formattedName}` + (!e ? '' : `\n\n${e instanceof Error ? e.message : String(e)}`),
      `color: ${resultingColor}`,
      `color: ${ambientColor}`,
      typeStyle
    );
  }
}

export function generateChunk(path: string, isRelative: boolean, logStyle?: string) {
  return () => import(
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    // Exclude themes, assets, types and misc files from compilation
    /* webpackExclude: /.*(((assets|themes|types)(\/|\\).*)|\.styl|\.css|\.html|\.pug|\.json)$/ */ //|-s(ensei|ama).*
    '@/' + path
  ).then(chunk => {
    logChunk(path, logStyle);

    return chunk;
  }).catch(e => {
    logChunk(path, logStyle, 'error', e);

    return {
      __esModule: true
    };
  });
}

/* webpackInclude: /(pages|components|plugins|mixins|router|api|store|\.text)?(?:(?:\/|\\)(.*)?)+\.(ts|js|json)$/ */
