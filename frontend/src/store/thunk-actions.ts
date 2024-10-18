import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../types/state';
import { ApiRoute } from '../consts';
import { dropToken, saveToken } from '../services/token';
import { AuthData, TokenData, UserData } from '../types/auth';
import { PaginatedResult } from '../types/paginatedResult';
import { Training, Trainings } from '../types/trainings';
import { createQueryString } from '../utils';
import { Query } from '../types/query';

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

const uploadTrainings = createAsyncThunk<
  PaginatedResult<Training>,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Data: ', data);
  return data;
});

const uploadFeaturedTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadFeaturedTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Featured: ', data);
  return data.entities;
});

const uploadSpecialTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadSpecialTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Special: ', data);
  return data.entities;
});

const uploadPopularTrainings = createAsyncThunk<
  Trainings,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadPopularTrainings', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<Training>>(`${ApiRoute.Trainings}?${createQueryString(query)}`);
  console.log('Popular: ', data);
  return data.entities;
});

export {
  checkAuthorization,
  loginUser,
  logoutUser,
  uploadFeaturedTrainings,
  uploadSpecialTrainings,
  uploadPopularTrainings,
  uploadTrainings
};


