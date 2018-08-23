import 'plugins';
import 'themes/default';

import Vue from 'vue';
import router from 'plugins/router';

window.app = new Vue({
  render: h => h('router-view'),
  el: 'app',
  router
});
