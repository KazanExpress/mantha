import { RouteConfig } from 'vue-router';
import { Component, AsyncComponent } from 'vue';

interface EsModuleComponent {
  default: Component,
  routeConfig: Partial<RouteConfig>
}

// declare module 'vue/types/options' {
//   type AsyncComponent<Data, Methods, Computed, Props> = (
//     resolve?: (component: Component<Data, Methods, Computed, Props>) => void,
//     reject?: (reason?: any) => void
//   ) => Promise<Component | EsModuleComponent>;
// }

type RouteImportFunction = {
  (componentPath: string, routePath?: string, options?: Partial<RouteConfig>): RouteConfig
  (componentPath: string, routePath?: string, children?: Array<RouteConfig>): RouteConfig
  (component: Component<any, any>, routePath?: string, options?: Partial<RouteConfig>): RouteConfig
  (component: Component<any, any>, routePath?: string, children?: Array<RouteConfig>): RouteConfig
  (component: Component<any, any>, options?: RouteConfig): RouteConfig
}

export function baseRouteFactory(componentImportFunction: (path: string) => AsyncComponent): RouteImportFunction {
  return function (...args) {
    const componentPathOrObj: string | Component<any, any> = args[0];
    const routePath: string = args.length > 2 ? args[1] : typeof args[1] === 'string' ? args[1] : (args[1].path || args[0]);
    const options: Partial<RouteConfig> | RouteConfig | Array<RouteConfig> = args.length > 2 ? args[2] : args[1];

    let route: RouteConfig = { path: routePath };

    if (typeof componentPathOrObj === 'string') {
      const asyncComponent = componentImportFunction(componentPathOrObj)
      route.component = asyncComponent;
    } else {
      route.component = componentPathOrObj;
    }

    if (!Array.isArray(options)) {
      route = Object.assign(route, options);
    } else if (options) {
      route.children = options;
    }

    return route;
  }
}

export const componentRoute = baseRouteFactory(importComponent)
export const pageRoute = baseRouteFactory(importPage)

export const router_view = { render: h => h('router-view') }
