import { getAllAtividade, createAtividade, updateAtividade, getAtividadeByCpf, deleteAtividade } from '@/services/api/atividade.js';

export const actions = {

  async getAll(state) {
    try {
      const dataGroups = await getAllAtividade();
      state.commit('setList', dataGroups.data.data);
      return dataGroups;
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
  async getByCpfServidor(state, cpf) {
    try {
      const dataGroups = await getAtividadeByCpf(cpf);
      state.commit('setList', dataGroups.data.data);
      return dataGroups.data.data;
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
  async createAtividade (state, payload){
    try {
      const dataGroups = await createAtividade(payload);
      await state.dispatch('getAll');

      state.dispatch(
        'snackbar/success',
        { message: 'Adicionado com sucesso' },
        { root: true }
      );
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
  async updateAtividade (state, payload){
    try {
      await updateAtividade(payload);
      await state.dispatch('getAll');

      state.dispatch(
        'snackbar/success',
        { message: 'Atualizado com sucesso' },
        { root: true }
      );
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
  async deleteAtividade(state, payload) {
    try {
      await deleteAtividade(payload);
      await state.dispatch('getAll');

      state.dispatch(
        'snackbar/success',
        { message: 'Atualizado com sucesso' },
        { root: true }
      );
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
