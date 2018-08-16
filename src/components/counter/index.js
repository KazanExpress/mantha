import Vue from 'vue'

export default Vue.extend({
  render(h) {
    return h('span', ['Count is ' + this.count])
  },
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
    },
    decrement() {
      this.count--;
    }
  }
})
