import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getAllUnits = async () =>
  httpClient.get('/unidade/list');

  /**
 * Protocol: 0063 - delete Group
 */
const deleteGroup = async (idGroup) =>
httpClient.delete('/unidade',{
  data:{
    idGroupa: idGroup
  }
});

/**
 * Protocol: 0061 - Create a new Group
 */
const createUnit = async (Group) =>
  httpClient.post('/unidade/add', Group);

  /**
 * Protocol: 0062 - Update a Group
 */
const updateUnit = async (Group) =>
  httpClient.post('/unidade/update', Group);

export {
  getAllUnits,
  deleteGroup,
  createUnit,
  updateUnit
};
