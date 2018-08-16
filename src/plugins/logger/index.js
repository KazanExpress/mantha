import { consoleStyles } from './styles'
import { supportedFunctions, defaultCommands } from './config'

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

function loggerFactory(logFuncName, background, enableGrouping) {
  return function (...args) {
    if (env.isDevelopment) { // if dev mode
      let stack
      let caller
      let componentName = this ? (this.$options.name || (this.$vnode ? this.$vnode.componentOptions.tag : 'Root')) : 'Script'
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
      const styles = [
        consoleStyles.base + consoleStyles.componentName,
        consoleStyles.base + consoleStyles.caller + 'background:' + (background || consoleStyles.defaultBackground),
        'background:transparent;'
      ]

      if (enableGrouping) {
        if (lastComponentName !== componentName || lastLogFunc !== logFuncName || lastCaller !== caller) {
          unindent()

          indent(
            headerTemplate + new Date(Date.now()).toLocaleTimeString('en-us', {
              hour12: false,
              timeZoneName: 'short'
            }),
            ...styles
          )
        }

        console[logFuncName](...args)

        clearTimeout(groupEndTimeout)

        groupEndTimeout = setTimeout(() => {
          unindentAll()
          lastComponentName = ''
        }, 1000);
      } else {
        console[logFuncName](headerTemplate, ...styles, ...args)
      }

      lastComponentName = componentName
      lastLogFunc = logFuncName
      lastCaller = caller
    }
  }
}

export default function install(
  Vue,
  options = {}
) {
  options.commands = Object.assign(defaultCommands, options || {});

  supportedFunctions.forEach(f => Vue.prototype['$' + f] = loggerFactory(f, options.commands[f], options.enableGrouping))
}

export const $log = loggerFactory('log', defaultCommands.log)
export const $info = loggerFactory('info', defaultCommands.info)
export const $warn = loggerFactory('warn', defaultCommands.warn)
export const $trace = loggerFactory('trace', defaultCommands.trace)
export const $error = loggerFactory('error', defaultCommands.error)
