import './styles'
import template from './view'

import Vue from 'vue'

export default Vue.extend({
  template,
  components: {
    KeButton: component('custom-button'),
    KeCounter: component('counter')
  },
  methods: {
    buttonClickInc () {
      this.$refs.counter.increment();
    },
    buttonClickDec () {
      this.$refs.counter.decrement();
    },
    otherButtonClick () {
      this.$log('let it be mate')
    }
  }
})
