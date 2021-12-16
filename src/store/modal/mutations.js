export const mutations = {
  SHOW_MODAL(state, payload) {
    state.modal = {
      title: payload.title,
      message: payload.message,
      buttonText: payload.buttonText,
      show: true,
    };
  },
  CLOSE_MODAL(state) {
    state.modal = {
      title: '',
      message: '',
      buttonText: '',
      show: false,
    };
  },
  setModalAvaliacao(state, payload) {
    state.modalAvaliacao = payload;
  },
  setModalMeta(state, payload) {
    state.modalMeta = payload;
  },
  setModalJustificateServidor(state, payload) {
    state.modalJustificativaServidor = payload;
  },
  setModalAlterarDados(state, payload) {
    state.modalAlterarDados = payload;
  },
  setModalDeclineUsers(state, payload) {
    state.modalDeclineUsers = payload;
  },
  setBlockUserModal(state, payload) {
    state.modalBlockUser = payload;
  },
  setUnblockUserModal(state, payload) {
    state.modalUnblockUser = payload;
  },
  addHealthcare() {},
  editHealthcare() {},
  deleteHealthcare() {},
  setHealthcare(state, payload) {
    state.healthcare = {
      id: payload.idconvenio,
      description: payload.descricao,
      status: payload.ativo,
    };
  },
  addHealthcareAssociation() {},
  editHealthcareAssociation() {},
  blockHealthcareAssociation() {},
  deletePatient() {},
  addPatient() {},
  editMetas() {},
  cancelTransfusionRequisition() {},
  addAtividade() { },
  editAtividade() { },

  addProposta(){},
  editProposta(){},
  closeProposta(){},

  avaliarAtividade() { },
  closeAvaliarAtividade() { }
};
