import httpClient from '@/plugins/axios';

/**
 * Protocol: 0001 - Initial authentication API that returns a token to validate
 * access to other API's endpoints
 */
const loginUser = async ({ login, senha }) =>
  httpClient.post('/authenticate/operador', {
    login,
    senha,
  });

/**
* Protocol: 0001 - Initial authentication API that returns a token to validate
* access to other API's endpoints
*/
const checkUserInformation = async (cpf) =>
  httpClient.get('/usuario/' + cpf);
  //httpClient.get('/usuario/byName/' + nome );


const getManagerInformation = async (cpf) =>
  httpClient.get('/gestor/cpf/' + cpf);

export default { loginUser, checkUserInformation, getManagerInformation };
