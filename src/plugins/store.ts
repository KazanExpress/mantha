import Vue from 'vue';
import Vuex from 'vuex';
import * as modules from '@/store';
import plugins from '@/store/plugins';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins
});

export default store;
