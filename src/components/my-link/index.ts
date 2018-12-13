import './styles';
import render from './view';

export default render(Mantha.Component.extend({
  name: 'Link',
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    isInternal(): boolean {
      return typeof this.to !== 'string' || !/^\w+:/.test(this.to);
    }
  }
}));
