import httpClient from '@/plugins/axios';

/**
 * List all periodos
 */
const getAllPropostaPeriodos = async () =>
  httpClient.get('/periodopropostameta/list');

/**
 * List all status periodos
 */
const getAllPropostaStatus = async () =>
  httpClient.get('/statuspropostameta/list');

/**
 * List all status periodos
 */
const getPropostasByCpf = async (cpf) =>
  httpClient.get(`/propostaMeta/findByCpf/${cpf}`);

  /**
 * Create a new Proposta
 */
const createProposta = async (proposta) =>
  httpClient.post('/propostaMeta/criarPropostaMeta', proposta);

  /**
 * Update a Proposta
 */
const updateProposta = async (proposta) =>
  httpClient.post('/propostaMeta/editarPropostaMeta', proposta);

/**
* Update a Proposta
*/
const avalivarProposta = async (proposta) =>
  httpClient.post('/propostaMeta/avaliarPropostaMeta', proposta);



export {
  getAllPropostaPeriodos,
  getAllPropostaStatus,
  getPropostasByCpf,
  createProposta,
  updateProposta,
  avalivarProposta
};
