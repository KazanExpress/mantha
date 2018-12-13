import Router from 'vue-router';
import { guard, options } from './config';

export default function (Vue: typeof import('vue').default) {
  Vue.use(Router);

  return guard(new Router(options));
}
