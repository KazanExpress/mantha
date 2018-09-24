import { MutationTree } from 'vuex';
import { TestState } from './state';

const mutations = {
  set(state, payload) {
    state.test = payload;
  }
} as MutationTree<TestState>;

export default mutations;

export type TestMutations = typeof mutations;