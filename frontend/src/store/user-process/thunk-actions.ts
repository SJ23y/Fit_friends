import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, TokenData, UserData } from '../../types/auth';


const checkAuthorization = createAsyncThunk<
  UserData,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('checkAuthorization', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.post<UserData>(ApiRoute.Check);
    return data;
  } catch {
    const { data:{accessToken, refreshToken} } = await api.post<TokenData>(ApiRoute.Refresh);
    saveToken(accessToken, refreshToken);
  } finally {
     const { data } = await api.post<UserData>(ApiRoute.Check);
    return data;
  }
});

const registerUser = createAsyncThunk<
  UserData,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('registerUser', async (newUser, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.Register, newUser);
  const { data:{accessToken, refreshToken} } = await api.post<TokenData>(ApiRoute.Login, {email: newUser.get('email'), password: newUser.get('password')});
  saveToken(accessToken, refreshToken);
  return data;
});

const updateUser = createAsyncThunk<
  UserData,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('updateUser', async (newUser, { extra: api }) => {
  const { data } = await api.patch<UserData>(ApiRoute.UserUpdate, newUser);
  return data;
});


const loginUser = createAsyncThunk<
  UserData & TokenData,
  AuthData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('loginUser', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData & TokenData>(ApiRoute.Login, {
    email,
    password,
  });
  saveToken(data.accessToken, data.refreshToken);
  return data;
});

const logoutUser = createAsyncThunk<
  void,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('logoutUser', async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
});

export {
  checkAuthorization,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
};
