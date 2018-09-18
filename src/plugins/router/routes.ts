import { routesFromMap } from './fromMap';

export const routes = routesFromMap({
  '/': {
    name: 'root',
    component: importPage('home'),
    children: {
      'home': {
        name: 'home',
        component: importPage('home')
      }
    }
  },
  '*': {
    name: '404',
    component: importPage('404')
  }
})
