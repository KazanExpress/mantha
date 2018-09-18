const router_view = { component: { render: h => h('router-view') } };

export const routes = {
  '/': {
    name: 'root',
    redirect: 'home',
    component: router_view,
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
} as import('@/plugins/router/fromMap').IRouteMap;
