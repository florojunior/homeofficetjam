import { actions } from './actions';
import { getters } from './getters';
import { mutations } from '../gestor/mutations';

const namespaced = true;

const state = {
  list : []
};

export const unit = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
