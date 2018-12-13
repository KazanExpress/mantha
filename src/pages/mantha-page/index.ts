import Vue from 'vue';

// Common page styles
import './styles';

export default Vue.extend({
  name: 'ManthaPage',

  components: use([
    'mantha-layout'
  ]),
  data() {
    return {
      readyComponents: [] as string[]
    };
  },
  methods: {
    isComponentReady(...components: string[]) {
      let result = true;
      components.forEach(component => {
        if (!this.readyComponents.includes(component)) {
          result = false;
        }
      });

      return result;
    },
    onComponentReady(name: string) {
      if (!this.readyComponents.includes(name)) {
        this.readyComponents.push(name);
      }
    }
  }
});
