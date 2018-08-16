import './styles'
import template from './view'

import Vue from 'vue'

export default Vue.extend({
  name: 'KeButton',
  template,
  created() {
    this.baseMethod();
  },
  methods: {
    baseMethod () {
      this.$warn('BASE METHOD SPEAKS TO YOU: ', this)
    },
    onClick (e) {
      this.$emit('click', e)
    }
  }
})
