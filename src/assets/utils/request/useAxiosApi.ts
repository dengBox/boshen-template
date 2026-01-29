import type { AxiosRequestConfig } from 'axios';
import { useAxios } from '@vueuse/integrations';
import service from './index';

// https://vueuse.org/integrations/useAxios/#usage

export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, service);
}

export const useAxiosGet = (url: string, config?: AxiosRequestConfig) => {
  return useAxios(url, { method: 'GET', ...(config || {}) }, service);
};

export const useAxiosPost = (url: string, config?: AxiosRequestConfig) => {
  return useAxios(url, { method: 'POST', ...(config || {}) }, service);
};

export const useAxiosPut = (url: string, config?: AxiosRequestConfig) => {
  return useAxios(url, { method: 'PUT', ...(config || {}) }, service);
};

export const useAxiosDelete = (url: string, config?: AxiosRequestConfig) => {
  return useAxios(url, { method: 'DELETE', ...(config || {}) }, service);
};
