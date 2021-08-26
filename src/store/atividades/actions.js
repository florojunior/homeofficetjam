import { getAllAtividade, createAtividade, updateAtividade, getAtividadeByCpf, deleteAtividade, getAtividadeByUser, updateAtividadeAvaliacao, createAtividadeAvaliacao, createAtividadeAvaliacaoEmLote } from '@/services/api/atividade.js';

export const actions = {


  async getAtividadeByUser(state, filtro) {
    try {
      const dataGroups = await getAtividadeByUser(filtro);
      // state.commit('setList', dataGroups.data.data);
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
      //await state.dispatch('getAll');

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
  async createAtividadeAvaliacaoEmLote(state, payload) {
    try {
      await createAtividadeAvaliacaoEmLote(payload);

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
  async createAtividadeAvaliacao(state, payload) {
    try {
      await createAtividadeAvaliacao(payload);
      //await state.dispatch('getAll');

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
  async updateAtividadeAvaliacao(state, payload) {
    try {
      await updateAtividadeAvaliacao(payload);
      //await state.dispatch('getAll');

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
      await deleteAtividade(payload.id);
      //await state.dispatch('getAll');

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
