import { validateRecaptcha } from '@/services/api/recaptcha.js';
import {
  sendRecoverPasswordEmail,
} from '@/services/api/user.js';
import router from '@/router';
import authentication from '@/services/api/authentication';

export const actions = {
  setUser(state, payload) {
    state.commit('setUser', payload);
  },
  setMenu(state, payload) {
    state.commit('setMenu', payload);
  },
  setMode(state, payload) {
    state.commit('setMode', payload);
  },
  async handleLogin(state, payload) {
    try {
      state.commit('LOGIN_PENDING');

      const response = await authentication.loginUser(payload);

      state.commit('LOGIN_SUCCESS');

      state.dispatch(
        'snackbar/success',
        {
          message: 'Autenticação concluída',
        },
        { root: true }
      );
      console.log(response)

      localStorage.setItem('token_sistema', response.data.token);
      router.push('/users',{});
    } catch (error) {
      state.commit('LOGIN_ERROR', error);
    }
  },
  async fetchRecaptchaValidation(state, payload) {
    try {
      await validateRecaptcha(payload.token);
    } catch (error) {
      state.dispatch(
        'snackbar/warning',
        {
          message: 'Falha ao validar recaptcha, tente novamente.',
        },
        {
          root: true,
        }
      );

      throw new Error('Falha ao validar recaptcha, tente novamente.');
    }
  },
  async requestPasswordRecovery(state, payload) {
    try {
      await sendRecoverPasswordEmail(payload.email);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Verifique suas informações',
          message: 'Enviamos para você um e-mail para redefinir a sua senha.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Favor contatar o suporte',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  }
};
