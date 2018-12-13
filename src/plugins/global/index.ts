import features from '@/.features';
import { importFactory, use, importComponent, importPage } from './imports';

window.importFactory = importFactory;
window.use = use;
window.importComponent = importComponent;
window.importPage = importPage;

window.features = features;


export default function (Vue: typeof import('vue').default) {
  window.Mantha = {
    Page: require('pages/mantha-page').default,
    Component: require('@/components/mantha-component').default
  };
}
