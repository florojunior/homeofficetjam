import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  userSelected:{
    data:{
      group: null,
      period: null,
      meta: []
    }
  },
  healthcareList: [],
  healthcareListLoading: false,
  healthcaresAssociatedToHospital: [],
  healthcaresAssociatedToHospitalLoading: false,
  activeHealthcareListDisponibleForAssociation: [],
  activeHealthcareListDisponibleForAssociationLoading: false,
  pendingUsers: {
    list: [],
    loading: false,
  },
  profiles: [],
  clinicList: [],
  clinicListLoading: false,
  users: {
    list: [],
    loading: false,
  },
  patientInformation: {
    loading: false,
    error: null,
    data: null,
  },
  cities: {
    list: [],
    loading: false,
  },
};

export const administration = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
