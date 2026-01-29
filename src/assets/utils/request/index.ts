import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showLoadingToast, showToast, closeToast } from 'vant';
// import { clear } from '../storage';
import { useGlobalStore } from '@/store';
const globalState = useGlobalStore().globalState;

export const config = {
  withCredentials: false,
  timeout: 10 * 60 * 1000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

function setHeader(headers: InternalAxiosRequestConfig['headers']) {
  const config = {
    token: globalState.token,
  };

  if (import.meta.env.VITE_DEV_IS_LOCAL) {
    config.token = import.meta.env.VITE_USER_TOKEN;
  }

  headers.deviceType = 'H5';
  headers.Authorization = config.token;
  return config;
}

const service: AxiosInstance = axios.create({
  ...config,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { hideloading?: boolean }) => {
    setHeader(config.headers);
    // loading
    if (!config.hideloading) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    closeToast();
    const res = response.data;
    if (res.status !== 200) {
      showToast(res.msg);
      return Promise.reject(res.msg || 'Error');
    } else {
      return res.data;
    }
  },
  (error: AxiosError) => {
    closeToast();
    console.log('err：' + error);
    if (error.name === 'CanceledError') return;
    if (error.name === 'AxiosError' && error.message?.includes('timeout')) {
      showToast('超时');
      return Promise.reject(error);
    }
    showToast((error?.response?.data as any)?.message || 'Error');
    switch (true) {
      case !error.response:
        showToast('网络异常，请检查您的网络连接是否正常！');
        break;
      case error?.response?.status === 401:
        showToast('当前用户没有访问该页面资源的权限！');
        // if (window.shsc && typeof window.shsc.closePage === 'function') {
        //   window.shsc.closePage();
        // }
        break;
      case error?.response?.status === 404:
        showToast(error?.toString());
        break;
      case error?.response?.status === 403:
        showToast((error?.response?.data as any).message || 'Error');
        // if (window.shsc && typeof window.shsc.exitLogin === 'function') {
        //   window.shsc.exitLogin();
        // }
        // clear('', true);
        break;
      default:
        showToast('系统错误');
        break;
    }
    return Promise.reject(error);
  },
);

export const get = <T = any>({ url, config = {} }: { url: string; config?: AxiosRequestConfig }): Promise<T> => {
  return service.get(url, config);
};

export const post = <T = any>({ url, body = {}, config = {} }: { url: string; body?: object; config?: AxiosRequestConfig }): Promise<T> => {
  return service.post(url, body, config);
};

export const put = <T = any>({ url, body = {}, config }: { url: string; body?: object; config?: AxiosRequestConfig }): Promise<T> => {
  return service.put(url, body, config);
};

export const remove = <T = any>({ url, config = {} }: { url: string; config?: AxiosRequestConfig }): Promise<T> => {
  return service.delete(url, config);
};

export default service;
