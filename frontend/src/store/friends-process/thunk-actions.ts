import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { PaginatedResult } from '../../types/paginatedResult';
import { Friend } from '../../types/auth';
import { Query } from '../../types/query';
import { createQueryString } from '../../utils';


const addNewFriend = createAsyncThunk<
  void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('addNewFriend', async (friendId, { extra: api }) => {
  await api.post<void>(`${ApiRoute.Friends}/${friendId}`);

});

const deleteFriend = createAsyncThunk<
  void,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('deleteFriend', async (friendId, { extra: api }) => {
  await api.delete<void>(`${ApiRoute.Friends}/${friendId}`);

});

const uploadFriends = createAsyncThunk<
  PaginatedResult<Friend>,
  Query,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadFriends', async (query, { extra: api }) => {
  const {data} = await api.get<PaginatedResult<Friend>>(`${ApiRoute.Friends}?${createQueryString(query)}`);
  return data;
});

export {
  addNewFriend,
  deleteFriend,
  uploadFriends
}
