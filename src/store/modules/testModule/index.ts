import { IRootState } from 'store';
import { Module } from 'vuex';
import state, { getters, TestState } from './state';
import mutations from './mutations';
import actions from './actions';

export const test = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} as Module<TestState, IRootState>;

export { TestState, TestGetters } from './state';
export { TestMutations } from './mutations';
export { TestActions } from './actions';