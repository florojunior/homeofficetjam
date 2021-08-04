import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getAllGestor = async () =>
  httpClient.get('/gestor/list');

/**
* Protocol: 0064 - List all Groups
*/
const getGestorByCpf = async (cpf) =>
  httpClient.get('/gestorusuario/gestores/'+cpf);

  /**
 * Protocol: 0063 - delete Group
 */
const deleteGestor = async (idGestor) =>
httpClient.delete('/gestor',{
  data:{
    idGestor: idGestor
  }
});

/**
 * Protocol: 0061 - Create a new Group
 */
const createGestor = async (Gestor) =>
  httpClient.post('/gestor/add', Gestor);

  /**
 * Protocol: 0062 - Update a Group
 */
const updateGestor = async (Gestor) =>
  httpClient.post('/gestor/update', Gestor);

export {
  getAllGestor,
  deleteGestor,
  createGestor,
  updateGestor,
  getGestorByCpf
};
