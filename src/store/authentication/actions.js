import { validateRecaptcha } from '@/services/api/recaptcha.js';
import {
  sendRecoverPasswordEmail
} from '@/services/api/user.js';

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

      let response;
      if (payload.perfil == 'GESTOR') {
        response = await authentication.loginUserGestor(payload);
      }else{
        response = await authentication.loginUserServidor(payload);
      }

      state.commit('LOGIN_SUCCESS');

      state.dispatch(
        'snackbar/success',
        {
          message: 'Autenticação concluída',
        },
        { root: true }
      );
      localStorage.setItem('token_sistema', response.data.data.token);
      localStorage.setItem('sistema_perfil', payload.perfil);
      localStorage.setItem('token_sistema_user_name', response.data.data.userData.nomeUsuario);
      return response.data.data.userData.nomeUsuario;
    } catch (error) {
      state.dispatch(
        'snackbar/error',
        {
          message: 'Falha na  Autenticação',
        },
        { root: true }
      );
      state.commit('LOGIN_ERROR');
    }
  },
  async getManagerInformation(state, payload) {
    try {
      const response = await authentication.getManagerInformation(payload);
      localStorage.setItem('token_sistema_gestor_data', JSON.stringify(response.data.data));
      return true;
    } catch (error) {
      state.dispatch(
        'snackbar/error',
        {
          message: 'Falha na  Autenticação',
        },
        { root: true }
      );
      state.commit('LOGIN_ERROR');
    }
  },
  async checkUserInformation(state, payload) {
    try {
      const response = await authentication.checkUserInformation(payload);
      localStorage.setItem('token_sistema_user_data', JSON.stringify(response.data));
      if (response.data.data.id_unidade != null) {
        return response.data.data.cpf_usuario;
      }else{
        state.dispatch(
          'modal/setModalAlterarDados',
          {
            show: true
          },
          { root: true }
        );
        return false;
      }
    } catch (error) {
      state.dispatch(
        'snackbar/error',
        {
          message: 'Falha na  Autenticação',
        },
        { root: true }
      );
      state.commit('LOGIN_ERROR');
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
