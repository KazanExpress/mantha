import 'plugins'
import 'themes/default'

import Vue from 'vue'

window.app = new Vue({
  el: 'app',
  render: h => h('router-view'),
  router
})
