export const getters = {
  getPendingUsersList: (state) => state.pendingUsers.list,
  getPorfileslist: (state) => state.profiles,
  getHealthcareList: (state) => state.healthcareList,
  getHealthcareListLoading: (state) => state.healthcareListLoading,
  getClinicList: (state) => state.clinicList,
  getClinicListLoading: (state) => state.clinicListLoading,
  getHealthcaresAssociatedToHospital: (state) =>
    state.healthcaresAssociatedToHospital,
  getHealthcaresAssociatedToHospitalLoading: (state) =>
    state.healthcaresAssociatedToHospitalLoading,
  getActiveHealthcareListDisponibleForAssociation: (state) =>
    state.activeHealthcareListDisponibleForAssociation,
  getActiveHealthcareListDisponibleForAssociationLoading: (state) =>
    state.activeHealthcareListDisponibleForAssociationLoading,
  getUsersList: (state) => state.users.list,
  getUserSelectedGroup: (state) => state.userSelected.data.group,
  getUserSelectedPeriod: (state) => state.userSelected.data.period,
  getUserSelectedMeta: (state) => state.userSelected.data.meta,
  getUsersListLoading: (state) => state.users.loading,
  //PATIENT INFORMATION
  getPatientInformation: (state) => state.patientInformation.data,
  getPatientInformationLoading: (state) => state.patientInformation.loading,
  getPatientInformationFailed: (state) =>
    state.patientInformation.error !== null,
  getPatientInformationError: (state) => state.patientInformation.error,
  getCitiesList: (state) => state.cities.list,
  getCitiesListLoading: (state) => state.cities.loading,
  isGestor: (state) => localStorage.getItem('sistema_perfil') == 'GESTOR'

};
