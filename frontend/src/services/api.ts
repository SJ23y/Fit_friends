import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiRoute, Setting } from '../consts';
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
    if (refreshToken && config.headers && config.url === ApiRoute.Refresh) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    else if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && error.response.statusText === 'Unauthorised') {
        console.log('unauthorised')
      }
      if (error.response && error.response.data) {
          throw error.response.data;
      };
      throw error;
    }
);

  return api;
};

export { createAPI };
