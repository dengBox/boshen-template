import { get, post } from '@/assets/utils/request';

export const encryptTicket = () =>
  post({
    url: '/bi/api/shsc-bigdata-bi-api/dashboard/generateDisposableSecretKey',
    body: {},
  });

export const getAppCorp = (query: Corp) =>
  get({
    url: '/plan/model/planRecommend/planCorpUnsalablePeriod1d/appCorp',
    config: {
      params: query,
    },
  });
