import { actions } from './actions';
import { getters } from './getters';
import { mutations } from '../atividades/mutations';

const namespaced = true;

const state = {
  list : []
};

export const atividade = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
