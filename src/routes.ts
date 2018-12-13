const component = { render: h => h('router-view'), name: 'Nested' };

export const routes = {
  '/': {
    component,
    children: {
      '': {
        name: 'home',
        component: importPage('home'),
      }
    }
  },
  '*': importPage('404')
} as import('@/plugins/router/fromMap').IRouteMap;
