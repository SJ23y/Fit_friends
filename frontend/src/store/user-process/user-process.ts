import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Setting } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthorization, getUserById, loginUser, logoutUser, registerUser, saveQuestionnaireResult, updateUser, uploadUsers } from './thunk-actions';
import { UserData, UserFriend } from '../../types/auth';
import { Query } from '../../types/query';
import { TrainingRequest } from '../../types/training-request';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  loadingStatus: false,
  currentlyViewedUser: null,
  users: null,
  query: {
    count: Setting.MaxUserCatalogCount,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection,
    page: Setting.DefaultStartPage
  }
};

const userProcess = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {
    setCurrentlyViewedUser: (state, action: PayloadAction<UserData>) => {
      state.currentlyViewedUser = action.payload;
    },
    addNewRequest: (state, action: PayloadAction<TrainingRequest>) => {
      if (state.user) {
        if (action.payload.senderId === state.user.id) {
          state.user.requests.push(action.payload);
        }
        if (action.payload.recieverId === state.user.id) {
          state.user.recievedRequests.push(action.payload);
        }
      }
    },
    changeUserQuery: (state, action: PayloadAction<Partial<Query>>) => {
      state.query = {
        ...state.query,
        ...action.payload
      }
    },
    addFriendToUser: (state, action: PayloadAction<UserFriend>) => {
      if (state.currentlyViewedUser?.friends) {
        state.currentlyViewedUser.friends.push(action.payload);
      } else if (state.currentlyViewedUser) {
        state.currentlyViewedUser.friends = [action.payload]
      }
    },
    deleteFriendFromUser: (state, action: PayloadAction<string>) => {
      if (state.currentlyViewedUser?.friends) {
        const friends = state.currentlyViewedUser.friends.filter(
          (friend) => friend.friendId !== action.payload && friend.userId !== action.payload
        );
        state.currentlyViewedUser = {
          ...state.currentlyViewedUser,
          friends: friends
        }
      }
    }
  },
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
        state.user = {
          "id": action.payload.id,
          "email": action.payload.email,
          "name": action.payload.name,
          "password": action.payload.password,
          "avatar": action.payload.avatar,
          "gender": action.payload.gender,
          "birthDate": action.payload.birthDate,
          "description": action.payload.description,
          "location": action.payload.location,
          "questionnaire": action.payload.questionnaire,
          "role": action.payload.role,
          "backgroundImage": action.payload.backgroundImage,
          "trainings": action.payload.trainings,
          "requests": action.payload.requests,
          "recievedRequests": action.payload.recievedRequests,
          "friends": action.payload.friends
        };
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
        state.loadingStatus = false;
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
      .addCase(saveQuestionnaireResult.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(saveQuestionnaireResult.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(saveQuestionnaireResult.rejected, (state) => {
        state.loadingStatus = false;
      })
      .addCase(uploadUsers.fulfilled, (state, action) => {
        state.error = null;
        if (state.users && action.payload.currentPage > Setting.DefaultStartPage) {
          state.users = {
            ...action.payload,
            entities: [...state.users.entities, ...action.payload.entities]
          }
        } else {
          state.users = action.payload;
        }
      })
  },
});

const { setCurrentlyViewedUser, changeUserQuery, addFriendToUser, deleteFriendFromUser, addNewRequest } = userProcess.actions;

export { userProcess, setCurrentlyViewedUser, changeUserQuery, addFriendToUser, deleteFriendFromUser, addNewRequest };
