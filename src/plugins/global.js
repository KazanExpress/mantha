global.component = function component(name) {
  return () => import('@/components/' + name)
}

global.env = new class extends String {
  constructor() {
    super(process.env.NODE_ENV)
  }

  get isDevelopment() {
    return process.env.NODE_ENV === 'development'
  }
}();
