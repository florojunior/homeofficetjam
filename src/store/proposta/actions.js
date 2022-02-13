import { getAllPropostaPeriodos, getAllPropostaStatus, createProposta, updateProposta, getPropostasByCpf, avalivarProposta  } from '@/services/api/proposta.js';
import { getMetaSugerida } from '@/services/api/metasugerida.js';


export const actions = {

  async avaliar(state, proposta) {
    try {
      const data = await avalivarProposta(proposta);
      state.dispatch(
        'snackbar/success',
        { message: 'Avaliado com sucesso' },
        { root: true }
      );
      return data;
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
  async getByCpf(state, cpf) {
    try {
      const data = await getPropostasByCpf(cpf);
      state.commit('setList', data.data.data);
      return data;
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
  async getPropostaPeriodos(state) {
    try {
      const data = await getAllPropostaPeriodos();
      state.commit('setListPropostaPeriodos', data.data.data);
      return data;
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
  async getPropostaStatus(state) {
    try {
      const data = await getAllPropostaStatus();
      state.commit('setListPropostaStatus', data.data.data);
      return data;
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
  async create(state, payload) {
    try {
      await createProposta(payload);
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
  async getSugerida(state, payload){
    try {
      return await getMetaSugerida(payload);
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
  async update(state, payload) {
    try {
      await updateProposta(payload);
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
