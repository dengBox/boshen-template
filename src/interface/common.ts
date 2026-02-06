import type { AxiosRequestConfig } from 'axios';

export type HttpHeader = {
  tenantCode: string;
  sceneCode: string;
  serviceCode: string;
  businessEntityCode: string;
};

export type GlobalState = HttpHeader & {
  token: string;
};

export type RequestConfig = AxiosRequestConfig & {
  showLoading?: boolean;
};
