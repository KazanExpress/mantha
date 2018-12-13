import Vue from 'vue';
import layoutRules from './layout-rules';

export default Vue.extend({
  data() {
    return {
      customLayoutRules: layoutRules,
      layoutComponent: null as any,
      importFactoryFunction: importPage,
      activeLayout: 'desktop'
    };
  },
  mounted() {
    this.activeLayout = Object.keys(this.customLayoutRules).find(r => this.customLayoutRules[r].includes(this.$media.size)) || 'desktop';
    this.layoutComponent = this.importFactoryFunction(`${this.$options.name}/${this.activeLayout}`);
  },
});
