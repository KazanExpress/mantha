import 'plugins';
import 'themes/default';

import Vue from 'vue';
import router from 'plugins/router';
import store from 'plugins/store';

const app = new Vue({
  render: h => h('router-view'),
  el: 'app',
  router,
  store
});

if (env.isDevelopment) {
  window.app = app;
}

export default app;
