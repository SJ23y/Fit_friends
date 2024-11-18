import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute, AppRoute } from '../../consts';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, CoachQuestionnaire, TokenData, UpdateUser, UserData, UserQuestionnaire } from '../../types/auth';
import { redirectToRoute } from '../actions';


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
>('registerUser', async (newUser, { dispatch, extra: api }) => {

  const { data } = await api.post<UserData>(ApiRoute.Register, newUser);
  const { data:{accessToken, refreshToken} } = await api.post<TokenData>(ApiRoute.Login, {email: newUser.get('email'), password: newUser.get('password')});
  saveToken(accessToken, refreshToken);
  dispatch(redirectToRoute(AppRoute.Questionnaire));
  return data;
});

const saveQuestionnaireResult = createAsyncThunk<
  UserData,
  CoachQuestionnaire | UserQuestionnaire,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('saveQuestionnaireResult', async (questionnaire, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoute.UserUpdate, {questionnaire: questionnaire});
  return data;
});

const updateUser = createAsyncThunk<
  UserData,
  {user: UpdateUser, cb: () => void},
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
});

const getUserById = createAsyncThunk<
  UserData,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('getUserById', async (userId, { extra: api }) => {
  const { data } = await api.get<UserData>(`${ApiRoute.User}/${userId}`);
  return data;
});

export {
  checkAuthorization,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  saveQuestionnaireResult,
  getUserById
};
