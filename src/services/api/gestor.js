import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getAllGestor = async () =>
  httpClient.get('/unidade/list');

  /**
 * Protocol: 0063 - delete Group
 */
const deleteGestor = async (idGestor) =>
httpClient.delete('/unidade',{
  data:{
    idGestor: idGestor
  }
});

/**
 * Protocol: 0061 - Create a new Group
 */
const createGestor = async (Gestor) =>
  httpClient.post('/unidade/add', Gestor);

  /**
 * Protocol: 0062 - Update a Group
 */
const updateGestor = async (Gestor) =>
  httpClient.post('/unidade/update', Gestor);

export {
  getAllGestor,
  deleteGestor,
  createGestor,
  updateGestor
};
