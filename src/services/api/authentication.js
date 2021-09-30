import httpClient from '@/plugins/axios';

/**
 * Protocol: 0001 - Initial authentication API that returns a token to validate
 * access to other API's endpoints
 */
const loginUser = async ({ login, senha, cpf }) =>
  httpClient.post('/authenticate/operador', {
    login,
    senha,
  });

/**
 * Protocol: 0001 - Initial authentication API that returns a token to validate
 * access to other API's endpoints
 */
const loginUserServidor = async ({ login, senha, cpf }) => {
  return httpClient.post('/authenticate/servidor', {
    username: login,
    password: senha,
    perfil: 'SERVIDOR',
    cpf
  }) };

/**
 * Protocol: 0001 - Initial authentication API that returns a token to validate
 * access to other API's endpoints
 */
const loginUserGestor = async ({ login, senha, cpf }) => {
  return httpClient.post('/authenticate/gestor', {
    username: login,
    password: senha,
    perfil: 'GESTOR',
    cpf
  })};

/**
* Protocol: 0001 - Initial authentication API that returns a token to validate
* access to other API's endpoints
*/
const checkUserInformation = async (isGestor) =>{
  if(!isGestor){
    return httpClient.get('/usuario/');
  }else{
    return httpClient.get('/gestor/');
  }
}


  //httpClient.get('/usuario/byName/' + nome );


const getManagerInformation = async (cpf) =>
  httpClient.get('/gestor/');

export default { loginUser, checkUserInformation, getManagerInformation, loginUserServidor, loginUserGestor };
