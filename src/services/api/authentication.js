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

export default { loginUser };
