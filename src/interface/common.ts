export type HttpHeader = {
  tenantCode: string;
  sceneCode: string;
  serviceCode: string;
  businessEntityCode: string;
};

export type GlobalState = HttpHeader & {
  token: string;
};
