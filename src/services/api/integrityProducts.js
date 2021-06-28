import httpClient from '@/plugins/axios';

/**
 * Protocol: 00XX - API to create a non-compliance blood components
 */
const createNonCompliance = async (send) => {
  return httpClient.post('/blood-components-integrity', send);
}

/**
 * Protocol: 00XX - API to create a integrity check
 */
const createCheckIntegrity = async (product) => {
  return httpClient.post('/integrity-check', product);
}

/**
 * Protocol: 00XX - API to list codes non-compliance
 */
const listNonConformities = async () => {
  return httpClient.get('/codes-non-conformities');
}

/**
 * Protocol: 00XX - API to list codes products
 */
 const listCodesProduct = async () => {
    return httpClient.get('/products-codes');
}

/**
 * Protocol: 00XX - API to list blood components integrity by requisition
 */
const getBloodComponentsByIdRequisition = async (idRequisicao) => {
  return httpClient.get(`/blood-components-integrity/?idRequisition=${idRequisicao}`);
}

export default { createNonCompliance, createCheckIntegrity, listNonConformities, listCodesProduct, getBloodComponentsByIdRequisition };