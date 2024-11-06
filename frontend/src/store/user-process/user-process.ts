import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthorization, getUserById, loginUser, logoutUser, registerUser, updateUser } from './thunk-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  loadingStatus: false,
  currentlyViewedUser: null
};

const userProcess = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorization.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(checkAuthorization.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loadingStatus = false;
        state.user = payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loadingStatus = false;
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.error = null;
        state.loadingStatus = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.error;
        state.loadingStatus = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.error;
        state.loadingStatus = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loadingStatus = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.currentlyViewedUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loadingStatus = false;
      })
  },
});

export { userProcess };
