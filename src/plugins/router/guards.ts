import Vue from 'vue';
import VueRouter, { Route, RawLocation } from 'vue-router';

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void;

/**
 * Determine if user is going to %path%
 *
 * @param route the current route object
 * @param path a desirable path you want to check for
 * @param startsWith (optional) restrict check to routes only starting with %startsWith%
 */
export const going = (route: Route, path: string, startsWith?: string) =>
  route.fullPath === path || route.path === path || (startsWith && route.fullPath.startsWith(startsWith));

export const beforeEach = (router: VueRouter) => (to: Route, from: Route, next: Next) => {
  return next();
};

export const afterEach = (router: VueRouter) => (to: Route, from: Route) => {

};
