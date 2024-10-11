import axios, { AxiosInstance } from 'axios';
import { Setting } from '../consts';
//import { getToken } from './token';
//import { DetailMessageType } from '../types/error';
//import { toast } from 'react-toastify';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Setting.BaseUrl,
    timeout: Setting.ApiTimeout,
  });

  api.interceptors.request.use((config) => {
    /*const token = getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }*/

    return config;
  });

  /*api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        toast.warn(
          `[${error.response.status}] ${error.response.data.error}`);
        if (error.response.data.details) {
          error.response.data.details.forEach(({property, messages}) => {
            toast.warn(`[${property}] ${messages}`);

        });
      }
      throw error;
    }
});*/

  return api;
};

export { createAPI };
