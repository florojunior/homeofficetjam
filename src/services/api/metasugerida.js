import httpClient from '@/plugins/axios';

/**
 * Protocol: 0064 - List all Groups
 */
const getMetaSugerida = async (id_periodo) =>
  httpClient.get(`/metasugerida/${id_periodo}`);

export {
  getMetaSugerida
};
