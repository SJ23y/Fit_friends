import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from '../consts';
import { Token } from '../types/auth';

const getAccessToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

const getRefreshToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (accessToken: Token, refreshToken: Token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
};

const dropToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

export { getAccessToken, getRefreshToken, saveToken, dropToken };
