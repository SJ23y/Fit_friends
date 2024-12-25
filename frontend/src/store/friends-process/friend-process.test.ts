import { Setting } from '../../consts';
import { describe, it, expect } from 'vitest';
import { uploadFriends } from './thunk-actions';
import { generateMockUser } from '../../mock-data/mock-users';
import { friendProcess } from './friends-process';

describe('Friend-process slice', () => {
  const initialState = {
    friends: null
    };
  

  const state = {
    friends: {
      entities: Array.from({length: 5}, () => ({...generateMockUser(), 'trainingRequests': true, 'trainTypes': []})),
        totalPages: 2,
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 6        
      }
    }    

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = friendProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = friendProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });  

  it('Should set friends to newFriends with uploadFriends.fulfilled', () => {
    const newFriends = {
      entities: Array.from({length: 5}, () => ({...generateMockUser(), 'trainingRequests': true, 'trainTypes': []})),
      totalPages: 2,
      currentPage: 2,
      totalItems: 10,
      itemsPerPage: 6        
    };

    const query = {
      count: Setting.FriendsPerPageCount,
      page: Setting.DefaultStartPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    };

    const result = friendProcess.reducer(
      state,
      uploadFriends.fulfilled(newFriends, '', query),
    );

    expect(result.friends).toEqual({...newFriends, entities: [...state.friends.entities, ...newFriends.entities]});
  });
});
