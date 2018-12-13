import './styles';
import render from './view';
import layoutable from 'plugins/mixins/layoutable';

export default render(Mantha.Component.extend({
  name: 'mantha-layout',
  mixins: [
    layoutable
  ],
  data() {
    return {
      importFactoryFunction: importComponent
    };
  },
  methods: {
    setScrollBody(isScroll: boolean, element: HTMLElement) {
      const actions = ['add', 'remove'];
      const _element = element || this.$el;

      if (_element) {
        _element.classList[actions[Number(isScroll)]]('scroll-disabled');
      }
    }
  },
  beforeDestroy() {
    this.$root.$off('set-scroll', this.setScrollBody);
  },
  mounted() {
    this.$root.$on('set-scroll', this.setScrollBody);
  },
}));
