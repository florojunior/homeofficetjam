import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getAllGroups = async () =>
  httpClient.get('/grupo/list');

  /**
 * Protocol: 0063 - delete Group
 */
const deleteGroup = async (idGroup) =>
httpClient.delete('/group-delete',{
  data:{
    idGroupa: idGroup
  }
});

/**
 * Protocol: 0061 - Create a new Group
 */
const createGroup = async (Group) =>
  httpClient.post('/grupo/add', Group);

  /**
 * Protocol: 0062 - Update a Group
 */
const updateGroup = async (Group) =>
  httpClient.post('/grupo/update', Group);

export {
  getAllGroups,
  deleteGroup,
  createGroup,
  updateGroup
};
