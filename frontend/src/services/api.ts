import axios, { AxiosError, AxiosInstance } from 'axios';
import { Setting } from '../consts';
import { getAccessToken, getRefreshToken } from './token';
import { DetailMessageType } from '../types/error';
//import { toast } from 'react-toastify';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Setting.BaseUrl,
    timeout: Setting.ApiTimeout,
  });

  api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    else if (refreshToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      /*if (error.response) {
        toast.warn(
          `[${error.response.status}] ${error.response.data.error}`);}
      */
        if (error.response && error.response.data) {
          throw error.response.data;
        };
      throw error;
    }
);

  return api;
};

export { createAPI };
