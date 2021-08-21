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
  httpClient.delete('/atividade',{
  data:{
    idAtividade: idAtividade
  }
});

/**
 * Protocol: 0061 - Create a new Group
 */
const createAtividade = async (Gestor) =>
  httpClient.post('/atividade/add', Gestor);

  /**
 * Protocol: 0062 - Update a Group
 */
const updateAtividade = async (Gestor) =>
  httpClient.post('/atividade/update', Gestor);

export {
  getAllAtividade,
  deleteAtividade,
  createAtividade,
  updateAtividade,
  getAtividadeByCpf
};
