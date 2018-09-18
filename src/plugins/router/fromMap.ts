import { RouteConfig, PositionResult, Position, Route } from 'vue-router/types/router';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface RouteMapConfig extends Omit<RouteConfig, 'path' | 'children'> {
  children?: RouteMap
  meta?: {
    [key: string]: any;
    scrollBehaviour?: (to: Route, from: Route, savedPosition: Position) => PositionResult | Promise<PositionResult>
  }
}

export interface RouteMap {
  [path: string]: RouteMapConfig
}

export function routesFromMap(map: RouteMap): RouteConfig[] {
  const routes: RouteConfig[] = [];

  for (const path in map) {
    const route = map[path] as any;

    route.path = path;

    if (route.children) {
      route.children = routesFromMap(route.children);
    }

    routes.push(route);
  }

  return routes;
}
