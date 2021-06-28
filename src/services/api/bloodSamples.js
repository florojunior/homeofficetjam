import httpClient from '@/plugins/axios';

/**
 * Protocol: 0017 - List requisition summaries
 */
const getRequisitionSummary = async (idRequisition) =>
  httpClient.get('/requisition-summary/?'+'idRequisition='+idRequisition);

/**
 * Protocol: 0073 - API to register new sample
 */
const createSample = async (sample) =>
  httpClient.post('/sample', sample);

/**
 * Protocol: 00-- - API to delete sample
 */
const deleteSample = async (sample) =>
  httpClient.put('/sample', sample);

/**
 * Protocol: 0076 - List requisition samples
 */
const getRequisitionSamples = async (idRequisition) =>
  httpClient.get('/requisition-samples/?'+'idRequisition='+idRequisition);



export default {
    getRequisitionSummary, createSample, deleteSample, getRequisitionSamples
};
