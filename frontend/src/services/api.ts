import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiRoute, Setting } from '../consts';
import { getAccessToken, getRefreshToken, saveToken } from './token';
import { DetailMessageType } from '../types/error';
import { TokenData } from '../types/auth';
import { isTokenExpired } from '../utils';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Setting.BaseUrl,
    timeout: Setting.ApiTimeout,
  });

  api.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (refreshToken && config.headers && config.url === ApiRoute.Refresh) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    } else if (accessToken && config.headers && config.url !== ApiRoute.Register && config.url !== ApiRoute.Login) {
      if (isTokenExpired(accessToken)) {
        const {data} = await axios.post<TokenData>(
          `${Setting.BaseUrl}${ApiRoute.Refresh}`,
          {},
          {headers: {'Authorization': `Bearer ${refreshToken}`}
        })
        saveToken(data.accessToken, data.refreshToken);
        config.headers['Authorization'] = `Bearer ${data.accessToken}`;
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;


  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && error.response.data) {
        throw Promise.reject(error.response.data);
      }
      throw error
    }
);

  return api;
};

export { createAPI };
