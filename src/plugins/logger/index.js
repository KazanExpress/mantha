let lastComponentName = ''
let groupEndTimeout = null

const consoleStyles = {
  base: 'padding: 1px; color: #fff; font-weight: 200;',
  componentName: 'background:#35495e; border-radius: 3px 0 0 3px;',
  caller: {
    base: 'border-radius: 0 3px 3px 0;',
    log: 'background:#41b883;',
    trace: 'background:#41b883;',
    warn: 'background:#FFC107; color: rgba(0,0,0,0.9);',
    error: 'background:#e53935;'
  }
}

function loggerFactory(logFuncName) {
  return function (...args) {
    if (true) { // if dev mode
      let stack
      let caller
      let componentName = this.$options.name || (this.$vnode ? this.$vnode.componentOptions.tag : 'Root')
      try {
        stack = new Error().stack
        caller = stack
          .split('\n')[2].trim()
          .split(' ')[1].trim()
          .replace('VueComponent.', '')
        if (caller.indexOf('//') >= 0) {
          caller = '<anonymous method>'
        }
      } catch (e) {
        caller = '<unknow stack>'
      }

      if (lastComponentName !== componentName) {
        console.groupEnd()
        console.group(`%c ${componentName} %c ${caller} %c`,
          consoleStyles.base + consoleStyles.componentName,
          consoleStyles.base + consoleStyles.caller.base + consoleStyles.caller[logFuncName],
          'background:transparent'
        )
      }

      console[logFuncName](...args)
      clearTimeout(groupEndTimeout)

      groupEndTimeout = setTimeout(() => {
        console.groupEnd()
        lastComponentName = ''
      }, 1000);

      lastComponentName = componentName
    }
  }
}

export default function install(Vue, options = {}) {
  Vue.prototype.$log = loggerFactory('log')
  Vue.prototype.$warn = loggerFactory('warn')
  Vue.prototype.$trace = loggerFactory('trace')
  Vue.prototype.$error = loggerFactory('error')
}
