import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { NotificationProcess } from '../../types/state';
import { deleteNotification, uploadNotifications } from './thunk-actions';

const initialState: NotificationProcess = {
    notifications: null,
    loadingStatus: false
  }

const notificationProcess = createSlice({
  name: NameSpace.MAIN,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadNotifications.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(uploadNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loadingStatus = false;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        if (state.notifications) {
          state.notifications = state.notifications?.filter((item) => item.id !== action.payload);
        }
      })
  },
});

export { notificationProcess };
