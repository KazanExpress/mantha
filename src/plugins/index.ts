import './global';

import Vue from 'vue';
import * as handlers from 'config/handlers';

import goodRefsPlugin from './goodRefsPlugin';

Vue.use(goodRefsPlugin);

Vue.config = {
  ...Vue.config,
  devtools: env.isDevelopment,
  silent: !env.isDevelopment,
  productionTip: env.isDevelopment,
  performance: !env.isDevelopment,
  ...handlers
}
