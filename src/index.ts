import 'normalize.css';
import 'themes/default/index.styl';
import ManthaApp from 'pages/mantha-app';

const app = new ManthaApp({
  el: '#app'
});

if (env.isDevelopment) {
  window.app = app;
}

export default app;
