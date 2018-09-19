import { IRootState } from '.';

const state = {
  test: 'test'
};

export type TestState = typeof state;

export const test = {
  namespaced: true,
  state,
  mutations: {
    set(state, payload) {
      state.test = payload;
    }
  },
  actions: {
    set(context, payload) {
      return Promise.resolve().then(() => context.commit('set', payload));
    }
  }
} as import('vuex').Module<TestState, IRootState>;
