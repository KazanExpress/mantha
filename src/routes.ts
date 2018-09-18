const component = { render: h => h('router-view') };

export const routes = {
  '/': {
    name: 'root',
    redirect: 'home',
    component,
    children: {
      'home': importPage('home')
    }
  },
  '*': importPage('404')
} as import('@/plugins/router/fromMap').IRouteMap;
