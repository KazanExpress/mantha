import './styles';
import render from './view';

import Vue from 'vue';

export default render(Vue.withRefs<{
  counter: typeof import('components/counter').default;
}>().extend({
  name: 'home',
  components: useComponents({
    KeButton: 'custom-button',
    JustButton: 'button',
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
      console.log('let it be mate');
    }
  },
}));
