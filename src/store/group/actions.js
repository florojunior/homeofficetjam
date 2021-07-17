import { getAllGroups } from '@/services/api/group.js';

export const actions = {

  async getAll(state) {
    try {
      const dataGroups = await getAllGroups();
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
  async createGroup (state, payload){

  }
};
