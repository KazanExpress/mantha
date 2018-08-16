function importFactory(type) {
  return function(name) {
    return () => import('@/' + type + '/' + name)
  }
}

global.importComponent = importFactory('components')
global.importPage = importFactory('pages')
global.useComponents = componentsMap => Object.keys(componentsMap).reduce(
  (obj, name) => {
    obj[name] = importComponent(componentsMap[name])
    return obj
  },
{})

global.env = new class extends String {
  constructor() {
    super(process.env.NODE_ENV)
  }

  get isDevelopment() {
    return process.env.NODE_ENV === 'development'
  }
}();
