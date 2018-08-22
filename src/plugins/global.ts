declare var global: any;

export function importFactory(type: string) {
  return function(name: string) {
    return () => import('@/' + type + '/' + name)
  }
}

global.importComponent = importFactory('components');
global.importPage = importFactory('pages');
global.useComponents = componentsMap => Object.keys(componentsMap)
  .reduce((obj, name) => ((obj[name] = global.importComponent(componentsMap[name])), obj), {} as ComponentImportPromiseMap);

class Env extends String {
  constructor() {
    super(process.env.NODE_ENV)
  }

  get isDevelopment() {
    return process.env.NODE_ENV === 'development'
  }
};

global.env = new Env();
