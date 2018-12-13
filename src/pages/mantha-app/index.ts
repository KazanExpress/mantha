import Vue from 'vue';
import Enhance from 'plugins';

import './styles';
import render from './view';

export default render(Enhance(Vue, {
  defaultLocale: 'ru', // 'ru' is the default

  // initiate autocomplete here to see other options...
}).extend({
  name: 'App',
}));
