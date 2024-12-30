import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state';
import { ApiRoute } from '../../consts';
import { Notification } from '../../types/notifcation';

const uploadNotifications = createAsyncThunk<
  Notification[],
  undefined,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('uploadNotifications', async (_args, { extra: api }) => {
  const { data } = await api.get<Notification[]>(ApiRoute.Notifications);
  return data;
});

const deleteNotification = createAsyncThunk<
  string,
  string,
  { dispatch: Dispatch; state: State; extra: AxiosInstance }
>('deleteNotification', async (notificationId, { extra: api }) => {
  await api.delete<void>(`${ApiRoute.Notifications}/${notificationId}`);
  return notificationId;
});

export {
  uploadNotifications,
  deleteNotification
};
