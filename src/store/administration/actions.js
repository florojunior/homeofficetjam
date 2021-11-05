import {
  listUsers,
  listUnidades,
  listAreas,
  listGrupos,
  listGestores,
  userByCpf,
  getUsetMetaByCPF,
  updateUserRegister,
  updateMetaUsuario,
  sendAvaliacao,
  enviarRelatorio
} from '@/services/api/user';

export const actions = {
  async fetchAvaliacao(state, payload) {
    try {
      const avaliacao = await sendAvaliacao(payload);
      state.dispatch(
        'snackbar/success',
        {
          message: 'Dados salvos com sucesso.',
        },
        { root: true }
      );
      return avaliacao.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchJustificativa(state, payload) {
    try {
      const metaAtualizada = await updateMetaUsuario(payload);
      state.dispatch(
        'snackbar/success',
        {
          message: 'Dados salvos com sucesso.',
        },
        { root: true }
      );
      return metaAtualizada.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUsersList(state, cpf) {
    try {
      const dataUsers = await listUsers(cpf);
      state.commit('setUsersList', dataUsers.data.data);
      return dataUsers;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUnidadesList(state) {
    try {
      const dataUnidades = await listUnidades();
      return dataUnidades.data.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchGruposList(state) {
    try {
      const dataGrupos = await listGrupos();
      return dataGrupos.data.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchGestorList(state) {
    try {
      const dataGestores = await listGestores();
      return dataGestores.data.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUpdateUsuarioData(state, upload) {
    try {
      await updateUserRegister(upload);
      state.dispatch(
        'snackbar/success',
        {
          message: 'Dados salvos com sucesso.',
        },
        { root: true }
      );
      return true;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchAreasList(state) {
    try {
      const dataUnidades = await listAreas();
      return dataUnidades.data.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUserGroupByCPF(state, idGroup) {
    try {
      //const dataUsers = await getUserGroupByCPF(cpf);
      state.commit('setUserGroup', {
        id: JSON.parse(localStorage.getItem('token_sistema_user_data')).data.grupousuario[0]
      });
      return true;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUsePeriodByCPF(state, cpf) {
    try {
      //const dataUsers = await getUsePeriodByCPF(cpf);
      state.commit('setUserPeriod', {
        id: JSON.parse(localStorage.getItem('token_sistema_user_data')).data.periodoteletrabalho[0]
      });

      return true;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUserByCpf(state, cpf) {
    try {
      const result = await userByCpf(cpf);
      return result.data.data;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchUseMetaByCPF(state, cpf) {
    try {
      const dataUsers = await getUsetMetaByCPF(cpf);
      if (dataUsers.data.data)
        state.commit('setUserMeta', dataUsers.data.data);
      return dataUsers;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchEnviarRelatorio(state, id) {
    try {
      await enviarRelatorio(id);
      state.dispatch(
        'snackbar/success',
        {
          message: 'Dados salvos com sucesso.',
        },
        { root: true }
      );
      return true;
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR',
        },
        {
          root: true,
        }
      );
    }
  }
};
