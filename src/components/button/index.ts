import './styles'
import render = require('./view')

import Vue from 'vue'

export default render(Vue.extend({
  name: 'KeButton',
  created() {
    this.baseMethod();
  },
  data: () => ({
    test: 'test'
  }),
  methods: {
    baseMethod () {
      console.warn('BASE METHOD SPEAKS TO YOU:', this.test)
    },
    onClick (e) {
      this.$emit('click', e)
    }
  }
}));
