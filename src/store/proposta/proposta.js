import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  list : [],
  periodoList: [],
  statusList: []
};

export const proposta = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
