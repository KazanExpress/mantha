import Vue from 'vue';

export default Vue.emitsEvents<{
  ready: [string];
}>().extend({
  name: 'ManthaComponent',
  created() {
    this.$emit('ready', this.$options.name);
  },
});
