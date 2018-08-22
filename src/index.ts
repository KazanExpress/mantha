import 'plugins';
import 'themes/default';

import App from 'pages/home';

window.app = new App({
  el: 'app',
  // render: h => h('router-view'),
  // router
});
