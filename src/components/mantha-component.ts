import Vue from 'vue';

export default Vue.emits<{
  ready(componentName: string | undefined);
}>('ready').extend({
  name: 'ManthaComponent',
  created() {
    this.$emit.ready(this.$options.name);
  },
});
