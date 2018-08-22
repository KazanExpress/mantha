import './styles'
import render = require('./view')

import KeCounter from 'components/counter'
import KeButton from 'components/custom-button'

import Vue from 'vue'

export default render(Vue.withRefs<{
  counter: InstanceType<typeof KeCounter>
}>().extend({
  components: {
    KeButton,
    KeCounter
  },
  methods: {
    buttonClickInc () {
      this.$refs.counter.increment();
    },
    buttonClickDec () {
      this.$refs.counter.decrement();
    },
    otherButtonClick () {
      console.log('let it be mate')
    }
  }
}))

