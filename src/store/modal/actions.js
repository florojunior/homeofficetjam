export const actions = {
  showModal(state, payload) {
    state.commit('SHOW_MODAL', payload);
  },
  closeModal(state) {
    state.commit('CLOSE_MODAL');
  },
  setModalMeta(state, payload) {
    state.commit('setModalMeta', payload);
  },
  setModalAlterarDados(state, payload) {
    state.commit('setModalAlterarDados', payload);
  },
  setModalJustificativaServidor(state, payload) {
    state.commit('setModalJustificateServidor', payload);
  },
  setModalAvaliacao(state, payload) {
    state.commit('setModalAvaliacao', payload);
  },
  setModalAcceptUsers(state, payload) {
    state.commit('setModalAcceptUsers', payload);
  },
  setModalDeclineUsers(state, payload) {
    state.commit('setModalDeclineUsers', payload);
  },
  setModalBlockUserModal(state, payload) {
    state.commit('setBlockUserModal', payload);
  },
  setModalUnblockUserModal(state, payload) {
    state.commit('setUnblockUserModal', payload);
  },
  addHealthcare() { },
  editHealthcare() { },
  deleteHealthcare() { },
  addClinic() { },
  editClinic() { },
  deleteClinic() { },
  addHealthcareAssociation() { },
  editHealthcareAssociation() { },
  blockHealthcareAssociation() { },
  deletePatient() { },
  addPatient() { },
  editPatient() { },
  cancelTransfusionRequisition() { },
  addPreTransfusion() {
  },
  closeRequisition() {
  },
  editTransfusion(state, idRequistion) {
    state.commit('setModalAcceptUsers', idRequistion);
  },
  seeTransfusion() {
  },
  closeSeeTransfusion() { },
  rejectTransfusionRequisition() { },
  checkIntegrity(){},
  closeCheckIntegrity(){},

  addGroup(){},


  addUnit(){},
  editUnit(){},

  addGestor(){},
  editGestor(){},


};
