import render from './view';
import HomePage from '../';

export default render(HomePage.withRefs<{
  myLink: typeof import('components/my-link');
}>().extend({
  name: 'HomeMobile'
}));
