import {
  listUsers,
  getUserGroupByCPF,
  getUsePeriodByCPF,
  getUsetMetaByCPF
} from '@/services/api/user';

import {
  getAllPatients,
  deletePatient,
  createPatient,
  updatePatient,
  getPatientInformation,
} from '@/services/api/patients';
export const actions = {
  async fetchUsersList(state, status) {
    try {
      const dataUsers = await listUsers(status);
      console.log(dataUsers.data);
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
  async fetchUserGroupByCPF(state, cpf) {
    try {
      const dataUsers = await getUserGroupByCPF(cpf);
      state.commit('setUserGroup', dataUsers.data.data[0]);
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
  async fetchUsePeriodByCPF(state, cpf) {
    try {
      const dataUsers = await getUsePeriodByCPF(cpf);
      console.log(dataUsers);
      if (dataUsers.data.data)
      state.commit('setUserPeriod', dataUsers.data.data);
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
  async fetchUseMetaByCPF(state, cpf) {
    try {
      console.log(1)
      const dataUsers = await getUsetMetaByCPF(cpf);
      console.log(dataUsers);
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
  }
};
