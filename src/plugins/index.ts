import global from './global';
import storePlugin from './store';
import routerPlugin from './router';
import goodRefsPlugin from './advancedInheritance';
import manthaMediaMixin from './mixins/mantha-media';
import i18nPlugin from './i18n';
import directives from './directives';

export default function (Vue: typeof import('vue').default, options: IPluginsOptions) {
  Vue.use(goodRefsPlugin);
  Vue.use(global);
  Vue.use(directives);

  if (options.errorHandler) {
    Vue.config.errorHandler = options.errorHandler;
  }
  if (options.warnHandler) {
    Vue.config.warnHandler = options.warnHandler;
  }

  Vue.config.ignoredElements = [/* TODO: ignore some elements from vue compilation for better production performance */];
  Vue.config.productionTip = false;
  Vue.config.performance = !env.isDevelopment;
  Vue.config.devtools = env.isDevelopment;
  Vue.config.silent = !env.isDevelopment;

  const store = storePlugin(Vue);
  const router = routerPlugin(Vue);
  const MediaMixin = manthaMediaMixin(Vue);
  const i18n = i18nPlugin(Vue);

  const VueSama = MediaMixin.extend({
    store,
    router,
    i18n: i18n(options.defaultLocale),

  });

  return VueSama;
}

interface IPluginsOptions {
  defaultLocale: string;
  errorHandler?: import('vue/types/vue').VueConfiguration['errorHandler'];
  warnHandler?: import('vue/types/vue').VueConfiguration['warnHandler'];
}
