import './styles';
import render from './view';
import * as messages from './.locales';
import layoutable from 'plugins/mixins/layoutable';

export default render(Mantha.Page.withRefs<{
  myLink: typeof import('components/my-link');
}>().extend({
  name: 'home',
  mixins: [layoutable],
  components: use([
    'my-link'
  ]),
  i18n: { messages },
}));
