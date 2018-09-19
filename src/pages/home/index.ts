import './styles';
import render from './view';

import KeCounter from 'components/counter';
import KeButton from 'components/custom-button';

import Vue from 'vue';

export default render(Vue.withRefs<{
  counter: InstanceType<typeof KeCounter>;
}>().extend({
  name: 'home',
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
      console.log('let it be mate');
    }
  },
}));
