import render from './view';

import Vue from 'vue';

export default render(Vue.extend({
  props: {
    start: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: this.start
    };
  },
  methods: {
    increment() {
      this.count++;
      if (this.count > 0)
        console.log(this.count);
      else
        console.info(this.count);
    },
    decrement() {
      this.count--;
      if (this.count > 0)
        console.log(this.count);
      else
        console.info(this.count);
    }
  }
}));
