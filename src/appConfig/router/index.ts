import { RouterOptions } from 'vue-router';

export const routerConfig: RouterOptions = {
  base: '/',
	mode: 'history',
	linkActiveClass: 'active-link',
	linkExactActiveClass: 'exact-active-link',
  fallback: false,
}

export * from './guards'
export * from './routes'
