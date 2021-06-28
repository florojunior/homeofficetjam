import httpClient from '@/plugins/axios';

/**
 * API to list users
 */
const listUsers = async () => {
  return httpClient.get(`/usuario/list`);
};

/**
 * API to get user group
 */
const getUserGroupByCPF = async (cpf) => {
  return httpClient.get(`/grupousuario/cpf/${cpf}`);
};

/**
 * API to get user period
 */
const getUsePeriodByCPF = async (cpf) => {
  return httpClient.get(`/periodoteletrabalho/${cpf}`);
};


/**
 * API to get user period
 */
const getUsetMetaByCPF = async (cpf) => {
  console.log(2)
  return httpClient.get(`/metausuario/cpf/${cpf}`);
};


/**
 * Protocol: 0002 - API to pre-register a new user
 */
const createUserPreRegister = async (user) => {
  return httpClient.post('/user', {
    usuario: {
      login: user.email,
      password: user.password,
    },
    pessoa: {
      naturalidade: 1,
      nome: user.name,
      nomeMae: '',
      dataNascimento: user.birthdate,
      sexo: user.gender,
      cpf: user.cpf,
      email: user.email,
      telefone1: user.telephone,
      telefone2: '',
    },
    profissional: {
      idconselho_profissional: user.professionalCouncil.idconselho_profissional,
      numero_conselho: user.professionalCouncilNumber,
      matricula: user.hospitalRegistration,
    },
    empresa: {
      idEmpresa: user.hospitalId,
    },
    profissional_ocupacao: {
      idOcupacao: user.professionalOccupationId,
    },
  });
};

/**
 * Protocol: 0010 - API to request a email to recover password
 */

const sendRecoverPasswordEmail = async (email) => {
  return httpClient.get('/user-password/?', {
    params: {
      email,
      method: 'reset',
    },
  });
};



/**
 * Protocol: 0016 - API to update user status
 */
const updateUserStatus = async (user) => {
  return httpClient.post('/companies-users', {
    idUsuario: user.idUsuario,
    idPerfil: user.idPerfil,
    ativo: user.ativo,
  });
};

const rejectUserStatus = async (user) => {
  return httpClient.post('/reject-companies-users', {
    idUsuario: user.idUsuario,
    idPerfil: user.idPerfil,
  });
};

const blockUserStatus = async (user) => {
  return httpClient.put(`/companies-users/block?idUsuario=${user.idusuario}`);
};

const unblockUserStatus = async (user) => {
  return httpClient.put(`/companies-users/unblock?idUsuario=${user.idusuario}`);
};

export {
  listUsers,
  getUserGroupByCPF,
  getUsePeriodByCPF,
  getUsetMetaByCPF,
  createUserPreRegister,
  updateUserStatus,
  rejectUserStatus,
  blockUserStatus,
  unblockUserStatus,
  sendRecoverPasswordEmail,
};
