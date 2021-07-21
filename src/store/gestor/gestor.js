import { actions } from './actions';
import { getters } from './getters';
import { mutations } from '../gestor/mutations';

const namespaced = true;

const state = {
  list : []
};

export const gestor = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
