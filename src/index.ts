import 'plugins';
import 'themes/default';

import Vue from 'vue';
import router from 'plugins/router';

window.app = new Vue({
  el: 'app',
  render: h => h('router-view'),
  router
});
