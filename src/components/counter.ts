import Vue from 'vue';

const counter = Vue.extend({
  props: {
    start: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: this.start
    }
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
  },
  render(h) {
    return h('span', 'Count');
  }
});

export default counter;
