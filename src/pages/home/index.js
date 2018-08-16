import './styles'
import render from './view'

import Vue from 'vue'

export default Vue.extend(render({
  components: useComponents({
    KeButton: 'custom-button',
    KeCounter: 'counter'
  }),
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
}))
