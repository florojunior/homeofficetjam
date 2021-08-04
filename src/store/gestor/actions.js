import { getAllGestor, createGestor, updateGestor, getGestorByCpf } from '@/services/api/gestor.js';

export const actions = {

  async getAll(state) {
    try {
      const dataGroups = await getAllGestor();
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
      const dataGroups = await getGestorByCpf(cpf);
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
  async createGestor (state, payload){
    try {
      const dataGroups = await createGestor(payload);
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
  async updateGestor (state, payload){
    try {
      await updateGestor(payload);
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
