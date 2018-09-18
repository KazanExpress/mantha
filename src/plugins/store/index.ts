import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as modules from '@/store';

console.log(modules);

export default new Vuex.Store({
  modules
});
