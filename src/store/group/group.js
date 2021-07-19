import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  list : []
};

export const group = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
