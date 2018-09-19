function importFactory(type: string) {
  return function (name: string) {
    return () => import(
      /* webpackChunkName: "[request]" */
      /* webpackMode: "lazy" */
      /* webpackExclude: /.*((le|c)ss|\.html|\.pug|tsconfig\.json|\.d\.ts)$/ */
      '@/' + type + '/' + name);
  };
}

window.importComponent = importFactory('components');
window.importPage = importFactory('pages');
window.useComponents = componentsMap => Object.keys(componentsMap)
  .reduce((obj, name) => ((obj[name] = importComponent(componentsMap[name])), obj), {} as ComponentImportPromiseMap);

class Env extends String {
  constructor() {
    super(process.env.NODE_ENV);
  }

  get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }
}

window.env = new Env();

