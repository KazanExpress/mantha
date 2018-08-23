import Router, { RouterOptions, Route } from 'vue-router'

import { routes } from './routes'

/// TODO - move it to outer configs
export const options: RouterOptions = {
  routes,
  base: '/',
	mode: 'history',
	linkActiveClass: 'active-link',
	linkExactActiveClass: 'exact-active-link',
  fallback: false,
	scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollBehavior) {
      return to.meta.scrollBehavior(to, from, savedPosition);
    }

		if (to.hash) {
      return { selector: to.hash };
    }

    return savedPosition;
  }
}

// Reload protection
export function guard(router: Router): Router {
  router.beforeEach((to, from, next) => {
    return next();
  });

  router.afterEach((to, from) => {
  });

  return router;
}

export const going = (route: Route, path: string, startsWith?: string) =>
  route.fullPath === path || route.path === path || (startsWith && route.fullPath.startsWith(startsWith));
