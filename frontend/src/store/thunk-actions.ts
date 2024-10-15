import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../types/state';
import { ApiRoute } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, TokenData, UserData } from '../types/auth';

/*
const uploadGuitars = createAsyncThunk<Guitars, GuitarQuery, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadGuitars', async (query, {extra: api}) => {
  const { data } = await api.get<Guitars>(`${ApiRoute.Guitars}?${createQueryString(query)}`);
  return data;
});

const saveNewGuitar = createAsyncThunk<
  Guitar | undefined,
  {formData: FormData, disableForm: (status?: boolean) => void},
  {dispatch: Dispatch; state: State; extra: AxiosInstance}
  >('saveNewGuitar', async ({formData, disableForm}, { extra: api}) => {
  try {
    const { data } = await api.post<Guitar>(ApiRoute.Guitars, formData);
    disableForm(true);
    return data;
  } catch {
    disableForm(false);
  }
});

const updateGuitar = createAsyncThunk<
  Guitar | undefined,
  {formData: FormData, disableForm: (status?: boolean) => void, guitarId: string},
  {dispatch: Dispatch; state: State; extra: AxiosInstance}
  >('updateGuitar', async ({formData, disableForm, guitarId }, { extra: api}) => {
  try {
    const { data } = await api.patch<Guitar>(`${ApiRoute.Guitars}/${guitarId}`, formData);
    disableForm(true);
    return data;
  } catch {
    disableForm(false);
  }
});*/

const checkAuthorization = createAsyncThunk<UserData, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('checkAuthorization', async (_arg, {extra: api}) => {
  try {
    const { data } = await api.post<UserData>(ApiRoute.Check);
    return data;
  } catch {
    const { data:{accessToken, refreshToken} } = await api.post<TokenData>(ApiRoute.Refresh, {});
    saveToken(accessToken, refreshToken);
  } finally {
     const { data } = await api.post<UserData>(ApiRoute.Check);
    return data;
  }
});

const loginUser = createAsyncThunk<UserData & TokenData, AuthData, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('loginUser', async ({ email, password }, { extra: api}) => {
  const { data } = await api.post<UserData & TokenData>(ApiRoute.Login, {email, password});
  saveToken(data.accessToken, data.refreshToken);
  return data;
});

const logoutUser = createAsyncThunk<void, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('logoutUser', async (_arg, {extra: api}) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
});

/*
const uploadGuitarById = createAsyncThunk<Guitar | void, string, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadGuitarById', async (guitarId, { extra: api}) => {
  const { data } = await api.get<Guitar>(`${ApiRoute.Guitars}/${guitarId}`);
    return data;
  });*/

export {
  checkAuthorization,
  loginUser,
  logoutUser
};


