import { env } from './env';
window.env = env;

import {
  createAsyncUsage,
  cachePlugin,
  ProfilePlugin,
  IChunkPlugin
} from 'async-usage/src';

const importFactory = (path: string) => import(
  /* webpackChunkName: "[request]" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackInclude: /.*?((modules(\/\/?|\\\\?)\.?[a-z_-]+(\/|\\\\?)(components|pages|submodules|business))|components|pages|\.[a-z\d_-]+)((\/|\\\\?)[a-z\d_-]+)+(\.ts)?$/gmi */
  '@/' + path
);

const plugins = (base: string, logStyle: string) => [
  {
    name: 'ErrorHandler',
    rejected(path: string, name: string, error: Error) {
      throw error;
    }
  },
  cachePlugin,
  env.isDevelopment ? new ProfilePlugin(base, logStyle) : {},
] as IChunkPlugin[];

const cmpBasePath = 'components';
const pgBasePath = 'pages';

export const use = createAsyncUsage(importFactory, {
  basePath: cmpBasePath,
  plugins: plugins(cmpBasePath, 'color: blue')
});

export const importComponent = use;
export const importPage = createAsyncUsage(importFactory, {
  basePath: pgBasePath,
  plugins: plugins(pgBasePath, 'color: #e53935')
});
