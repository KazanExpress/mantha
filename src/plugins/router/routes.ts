import { pageRoute } from './routeFactory';

/// TODO - move it to outer configs
export const routes = [
  pageRoute('home', '/', { name: 'root' }),
  pageRoute('home', '/home', { name: 'home' }),
  pageRoute('404', '*', { name: '404' })
]
