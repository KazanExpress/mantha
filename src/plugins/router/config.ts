import Router, { RouterOptions } from 'vue-router';

import { routes as routeMap } from '@/routes';
import { afterEach, beforeEach } from './guards';

import { routesFromMap } from './fromMap';


export const options: RouterOptions = {
  base: '/',
  mode: 'history',
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  fallback: false,
  routes: routesFromMap(routeMap),
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollBehavior) {
      return to.meta.scrollBehavior(to, from, savedPosition);
    }

    if (to.hash) {
      return { selector: to.hash };
    }

    return savedPosition;
  }
};

// Reload protection
export function guard(router: Router): Router {
  router.beforeEach(beforeEach(router));

  router.afterEach(afterEach(router));

  return router;
}
