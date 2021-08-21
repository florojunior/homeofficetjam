import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  modal: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalAcceptUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalDeclineUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalBlockUser: {
    show: false,
  },
  modalUnblockUser: {
    show: false,
  },
  modalDeletePatient: {
    show: false,
  },
  modalMeta: {
    show: false,
  },
  modalJustificativaServidor: {
    show: false,
  },
  modalAvaliacao: {
    show: false,
  },
  modalAtividade: {
    show: false,
  },
  modalAlterarDados:{
    show: false,
    data: null
  },
  modalAvaliarAtividade: {
    show: false,
  }
};

export const modal = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
