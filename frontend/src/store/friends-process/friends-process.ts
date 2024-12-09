import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { uploadFriends } from './thunk-actions';
import { FriendsProcess } from '../../types/state';

const initialState: FriendsProcess = {
  friends: null
};

const friendProcess = createSlice({
  name: NameSpace.TRAINING,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadFriends.fulfilled, (state, action) => {
        if (state.friends && action.payload.currentPage > 1) {
          state.friends = {
            ...action.payload,
            entities: [...state.friends.entities, ...action.payload.entities]
          }
        } else {
            state.friends = action.payload;
        }
      })
  },
});


export { friendProcess };
