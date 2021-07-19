import { getAllUnits, createUnit, updateUnit } from '@/services/api/unit.js';

export const actions = {

  async getAll(state) {
    try {
      const dataGroups = await getAllUnits();
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
  async createUnit (state, payload){
    try {
      const dataGroups = await createUnit(payload);
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
  async updateUnit (state, payload){
    try {
      await updateUnit(payload);
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
