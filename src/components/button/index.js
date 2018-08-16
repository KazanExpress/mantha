import './styles'
import render from './view'

import Vue from 'vue'

export default Vue.extend(render({
  name: 'KeButton',
  // render,
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
}))
