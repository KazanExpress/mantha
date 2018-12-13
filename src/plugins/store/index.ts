import Vuex from 'vuex';
import * as modules from '@/store';
import plugins from './plugins';

export default function (Vue: typeof import('vue').default) {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules,
    plugins
  });
}
