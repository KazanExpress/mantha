import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import { guard } from './config'

Vue.use(Router)

export default options => guard(new Router(options));
