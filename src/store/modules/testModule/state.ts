import { GetterTree } from 'vuex';
import { IRootState } from 'store';

const state = {
  test: 'test'
};

export const getters = {
  tested(state) {
    return state.test + 'ed';
  }
} as GetterTree<TestState, IRootState>;

export default state;
export type TestState = typeof state;
export type TestGetters = typeof getters;