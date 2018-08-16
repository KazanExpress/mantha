import { consoleStyles } from './styles'
import { defaultOptions, supportedFunctions } from './config'

let lastComponentName = ''
let lastLogFunc = ''
let lastCaller = ''
let groupEndTimeout = null
let indentation = 0

function indent(...args) {
  console.groupCollapsed(...args)
  indentation++
}

function unindent() {
  console.groupEnd()
  indentation--
}

function unindentAll() {
  for (let i = 0; i < indentation; i++)
    console.groupEnd()

  indentation = 0
}

function loggerFactory(logFuncName, background) {
  return function (...args) {
    if (env.isDevelopment) { // if dev mode
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

      const headerTemplate = `%c ${componentName} %c ${caller} %c `

      if (lastComponentName !== componentName || lastLogFunc !== logFuncName || lastCaller !== caller) {
        unindent()

        if (args.length > 1) {
          indent(
            headerTemplate + new Date(Date.now()).toLocaleTimeString('en-us', {
              hour12: false,
              timeZoneName: 'short'
            }),
            consoleStyles.base + consoleStyles.componentName,
            consoleStyles.base + consoleStyles.caller + 'background:' + (background || consoleStyles.defaultBackground),
            'background:transparent;'
          )
        }
      }

      clearTimeout(groupEndTimeout)

      groupEndTimeout = setTimeout(() => {
        unindentAll()
        lastComponentName = ''
      }, 1000);

      lastComponentName = componentName
      lastLogFunc = logFuncName
      lastCaller = caller
    }
  }
}

export default function install(
  Vue,
  options
) {
  options = Object.assign(defaultOptions, options || {});

  supportedFunctions.forEach(f => Vue.prototype['$' + f] = loggerFactory(f, options[f]))
}
