import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getAllAtividade = async () =>
  httpClient.get('/atividade/list');

/**
* Protocol: 0064 - List all Groups
*/
const getAtividadeByCpf = async (cpf) =>
  httpClient.get('/atividade/cpf/'+cpf);

  /**
 * Protocol: 0063 - delete Group
 */
const deleteAtividade = async (idAtividade) =>
  httpClient.delete(`/atividade/${idAtividade}`);

/**
 * Protocol: 0061 - Create a new Group
 */
const createAtividade = async (Gestor) =>
  httpClient.post('/atividade/add', Gestor);

  /**
 * Protocol: 0062 - Update de atividade
 */
const updateAtividade = async (atividade) =>
  httpClient.post('/atividade/update', atividade);

const updateAtividadeAvaliacao = async (atividadeAvaliacao) =>
  httpClient.post('/atividadeavaliacao/update', atividadeAvaliacao);

const createAtividadeAvaliacao = async (atividadeAvaliacao) =>
  httpClient.post('/atividadeavaliacao/add', atividadeAvaliacao);

const createAtividadeAvaliacaoEmLote = async (atividadeAvaliacao) =>
  httpClient.put(`/atividadeavaliacao/approveall/${atividadeAvaliacao.cpf}/${atividadeAvaliacao.mes}/${atividadeAvaliacao.ano}`, atividadeAvaliacao);


const getAtividadeByUser = async (filtro) =>{
  return httpClient.get(`/atividade/listbyperiodo/${filtro.cpf}/${filtro.mes}/${filtro.ano}`);
}

export {
  getAllAtividade,
  deleteAtividade,
  createAtividade,
  updateAtividade,
  getAtividadeByCpf,
  getAtividadeByUser,
  updateAtividadeAvaliacao,
  createAtividadeAvaliacao,
  createAtividadeAvaliacaoEmLote
};
