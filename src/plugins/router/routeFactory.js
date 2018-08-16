import { RouteConfig } from 'vue-router';
import { Component } from 'vue';

/**
 *
 *
 * @param {() => Component} componentImportFunction
 * @returns
 */
function baseRouteFactory(componentImportFunction) {
  /**
   *
   *
   * @param {string | Component} component
   * @param {*} name
   * @param {Array<Component> | RouteConfig} options
   */
  return function (componentPathOrObj, name, path, options) {
    /**
     * @type RouteConfig
     */
    const route = { path, name }

    if (typeof componentPathOrObj === 'string') {
      route.component = componentImportFunction(componentPathOrObj)
    } else {
      route.component = componentPathOrObj;
    }

    if (!Array.isArray(options)) {
      route = Object.assign(route, options)
    } else {
      route.children = options
    }

    return route
  }
}

export const componentRoute = baseRouteFactory(component)
export const pageRoute = baseRouteFactory(page)

const router_view = { render: h => h('router-view') }


const routes = [
  pageRoute('home', 'home', '/')
  /*
  * {
  *   path: '/',
  *   name: 'home',
  *   component: () => import('@/pages/home')
  * }
  */
]
