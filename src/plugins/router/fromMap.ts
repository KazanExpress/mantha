import { RouteConfig, PositionResult, Position, Route } from 'vue-router/types/router';
import { AsyncComponent } from 'vue';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IRouteMapConfig extends Omit<RouteConfig, 'path' | 'children'> {
  children?: IRouteMap;
  meta?: {
    [key: string]: any;
    scrollBehaviour?: (to: Route, from: Route, savedPosition: Position) => PositionResult | Promise<PositionResult>;
  };
}

export interface IRouteMap {
  [path: string]: IRouteMapConfig | AsyncComponent;
}

export function routesFromMap(map: IRouteMap): RouteConfig[] {
  const routes: RouteConfig[] = [];

  for (const path in map) {
    const route = map[path] as any;

    if (typeof route === 'function') {
      routes.push({ component: route, path });
      continue;
    }

    route.path = path;

    if (!route.name && /^\w+$/g.test(path)) {
      route.name = path;
    }

    if (route.children) {
      route.children = routesFromMap(route.children);
    }

    routes.push(route);
  }

  return routes;
}
