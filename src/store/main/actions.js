import router from '@/router';

export const actions = {
  setMensagemSucesso(state, mensagem, error) {
    state.commit('setMensagemSucesso', {
      mensagem,
      error,
    });
  },
  setAuthenticated(state, authenticated) {
    console.log(authenticated)
    state.commit('setAuthenticated', authenticated);
  },
  handleLogOut(state) {
    localStorage.setItem('token_sistema', null);
    state.commit('setAuthenticated', false);
    router.push({ name: 'login' });
  },
};
