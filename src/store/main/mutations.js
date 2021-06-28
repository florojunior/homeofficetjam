export const mutations = {
  setMensagemSucesso(state, mensagemSucesso) {
    state.mensagemSucesso = mensagemSucesso;
  },
  setAuthenticated(state, authenticated) {
    console.log('chamou ' + authenticated)
    state.authenticated = authenticated;
  },
};
