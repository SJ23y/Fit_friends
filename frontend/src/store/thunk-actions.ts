import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../types/state';
import { ApiRoute } from '../consts';
import { saveToken } from '../services/token';
import { TokenData, UserData } from '../types/auth';


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

export {
  checkAuthorization
};


