import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, NewUser, Token, UserData } from '../../types/auth';


const checkAuthorization = createAsyncThunk<
  Boolean,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('checkAuthorization', async (_arg, { extra: api }) => {
  const { data } = await api.get<Boolean>(ApiRoute.Login);
  return data;
});

const registerUser = createAsyncThunk<
  Omit<UserData, Token>,
  NewUser,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('loginUser', async (newUser, { extra: api }) => {
  const { data } = await api.post<Omit<UserData, Token>>(ApiRoute.Register, {
    ...newUser
  });
  console.log('data: ', data);
  return data;
});


const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('loginUser', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
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
  registerUser
};
