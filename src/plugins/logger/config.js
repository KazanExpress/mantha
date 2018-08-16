export const supportedFunctions = [
  'log',
  'info',
  'warn',
  'trace',
  'error',
]

export const defaultColors = {
  info: '#2196f3',
  warn: '#FFC107',
  error: '#e53935'
}

export const defaultCommands = supportedFunctions.reduce((obj, f) => {
  obj[f] = defaultColors[f] || ''
  return obj
}, {});
