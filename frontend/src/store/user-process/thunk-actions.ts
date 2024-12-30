import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute, AppRoute, Role } from '../../consts';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, CoachQuestionnaire, TokenData, UserData, UserQuestionnaire } from '../../types/auth';
import { redirectToRoute } from '../actions';
import { Query } from '../../types/query';
import { PaginatedResult } from '../../types/paginatedResult';
import { createQueryString } from '../../utils';
import { Subscription } from '../../types/subscription';

const checkAuthorization = createAsyncThunk<
  UserData,
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('checkAuthorization', async (_arg, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.Check);
  return data;
});

const registerUser = createAsyncThunk<
  UserData,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('registerUser', async (newUser, { dispatch, extra: api }) => {

  const { data } = await api.post<UserData>(ApiRoute.Register, newUser);
  await dispatch(loginUser( {email: <string>newUser.get('email'), password: <string>newUser.get('password')}))
  dispatch(redirectToRoute(AppRoute.Questionnaire));
  return data;
});

const saveQuestionnaireResult = createAsyncThunk<
  UserData,
  CoachQuestionnaire | UserQuestionnaire,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('saveQuestionnaireResult', async (questionnaire, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.UserUpdate, {questionnaire: questionnaire});
  dispatch(redirectToRoute((data.role === Role.COACH) ? AppRoute.Account : AppRoute.Main));
  return data;
});

const updateUser = createAsyncThunk<
  UserData,
  {user: FormData, cb: () => void},
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('updateUser', async ({user, cb}, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.UserUpdate, user);
  cb();
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
  return;
});

const getUserById = createAsyncThunk<
  UserData | void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('getUserById', async (userId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(`${ApiRoute.User}/${userId}`);
    return data;
  } catch(error) {
    dispatch(redirectToRoute(AppRoute.NotFound));
  }

});

const uploadUsers = createAsyncThunk<
  PaginatedResult<UserData>,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadUsers', async (query, { extra: api }) => {
  const { data } = await api.get<PaginatedResult<UserData>>(`${ApiRoute.User}?${createQueryString(query)}`);
  return data;
});

const addSubscription = createAsyncThunk<
  Subscription,
  Subscription,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addSubscription', async (subscription, { extra: api }) => {
  await api.post<void>(ApiRoute.Subscription, subscription);
  return subscription;
});

const deleteSubscription = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('deleteSubscription', async (coachId, { extra: api }) => {
  await api.delete<void>(`${ApiRoute.Subscription}/${coachId}`);
  return coachId;
});

const addNewSertificate = createAsyncThunk<
  string,
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewSertificate', async (formData, { extra: api }) => {
  const {data} = await api.post<string>(`${ApiRoute.Sertificate}/upload`, formData);
  return data;
});

const updateSertificate = createAsyncThunk<
  {newSertificate: string, oldSertificate: string},
  FormData,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('updateSertificate', async (formData, { extra: api }) => {
  const {data} = await api.post<string>(`${ApiRoute.Sertificate}/upload`, formData);
  return {newSertificate: data, oldSertificate: formData.get('path') as string};
});

const deleteSertificate = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('deleteSertificate', async (path, { extra: api }) => {
  await api.post(`${ApiRoute.Sertificate}/delete`, {path});
  return path;
});

export {
  checkAuthorization,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  saveQuestionnaireResult,
  getUserById,
  uploadUsers,
  deleteSubscription,
  addSubscription,
  addNewSertificate,
  updateSertificate,
  deleteSertificate
};
