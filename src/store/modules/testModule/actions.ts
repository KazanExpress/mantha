import { ActionTree } from 'vuex';
import { IRootState } from 'store';
import { TestState } from './state';

const actions = {
  set(context, payload) {
    return Promise.resolve().then(() => context.commit('set', payload));
  }
} as ActionTree<TestState, IRootState>;

export default actions;

export type TestActions = typeof actions;