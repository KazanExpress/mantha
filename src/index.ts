import 'plugins';
import 'themes/default';

import Vue from 'vue';
import router from 'plugins/router';

const app = new Vue({
  render: h => h('router-view'),
  el: 'app',
  router
});

if (env.isDevelopment) {
  window.app = app;
}
