export const mutations = {
  setPendingUsersList(state, pendingUsersList) {
    state.pendingUsers.list = pendingUsersList;
  },
  setPendingUsersLoading(state, pendingUsersList) {
    state.pendingUsers.list = pendingUsersList;
  },
  setProfiles(state, profiles) {
    state.profiles = profiles;
  },
  setHealthcareList(state, payload) {
    state.healthcareList = payload;
  },
  setHealthcareListLoading(state, payload) {
    state.healthcareListLoading = payload;
  },
  setHealthcaresListAssociatedToHospital(state, payload) {
    state.healthcaresAssociatedToHospital = payload;
  },
  setHealthcaresListAssociatedToHospitalLoading(state, payload) {
    state.healthcaresAssociatedToHospitalLoading = payload;
  },
  setActiveHealthcareListDisponibleForAssociation(state, payload) {
    state.activeHealthcareListDisponibleForAssociation = payload;
  },
  setActiveHealthcareListDisponibleForAssociationLoading(state, payload) {
    state.activeHealthcareListDisponibleForAssociationLoading = payload;
  },
  setClinicListLoading(state, clinicList) {
    state.clinicListLoading = clinicList;
  },
  setClinicList(state, clinicList) {
    state.clinicList = clinicList;
  },
  setUsersList(state, payload) {
    state.users.list = payload;
  },
  setUserGroup(state, group) {
    state.userSelected.data.group = group;
  },
  setUserPeriod(state, period) {
    state.userSelected.data.period = period;
  },
  setUserMeta(state, meta) {
    state.userSelected.data.meta = meta;
  },
  setUsersListLoading(state, payload) {
    state.users.loading = payload;
  },
  LIST_PATIENT_INFORMATION_LOADING(state) {
    state.patientInformation.loading = true;
  },
  LIST_PATIENT_INFORMATION_SUCCESS(state, patientInformation ) {
    state.patientInformation.data = patientInformation;
    state.patientInformation.error = null;
    state.patientInformation.loading = false;
  },
  LIST_PATIENT_INFORMATION_ERROR(state, { error }) {
    state.patientInformation.error = error;
    state.patientInformation.data = null;
    state.patientInformation.loading = false;
  },
  setCitiesList(state, payload) {
    state.cities.list = payload;
  },
  setCitiesListLoading(state, payload) {
    state.cities.loading = payload;
  },
};
