import './global';

import Vue from 'vue';
import * as handlers from '@/.config/handlers';

import goodRefsPlugin from './goodRefsPlugin';

Vue.use(goodRefsPlugin);

Vue.config.devtools = env.isDevelopment;
Vue.config.silent = !env.isDevelopment;
Vue.config.productionTip = env.isDevelopment;
Vue.config.performance = !env.isDevelopment;
Vue.config.errorHandler = handlers.errorHandler;
Vue.config.warnHandler = handlers.warnHandler;
