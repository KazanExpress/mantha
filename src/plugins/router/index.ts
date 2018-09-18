import Vue from 'vue';
import Router from 'vue-router';
import { guard, options } from './config';

Vue.use(Router);

export default guard(new Router(options));
