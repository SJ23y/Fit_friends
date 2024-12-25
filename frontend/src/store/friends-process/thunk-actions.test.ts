import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, State } from '../../types/state';
import { addNewFriend, deleteFriend, sendTrainingRequest, uploadFriends} from './thunk-actions';
import { ApiRoute, RequestStatus, Setting } from '../../consts';
import { faker } from '@faker-js/faker';
import { createQueryString, extactActionsType } from '../../utils';
import { generateMockUser } from '../../mock-data/mock-users';


describe('Friend process async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  const initialState = {
    friends: null 
  }

  
  beforeEach(() => {
    store = mockStoreCreator({
      Friend: { ...initialState }
    });
  });

  it('should dispatch "addNewFriend.pending" and "addNewFriend.fulfilled" with thunk addNewFriend and code 200', async () => {
    const friendId = faker.string.uuid();
    mockAxiosAdapter.onPost(`${ApiRoute.Friends}/${friendId}`).reply(200);

    await store.dispatch(addNewFriend(friendId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([addNewFriend.pending.type, addNewFriend.fulfilled.type]);
  });

  it('should dispatch "deleteFriend.pending" and "deleteFriend.fulfilled" with thunk deleteFriend and code 200', async () => {
    const friendId = faker.string.uuid();
    mockAxiosAdapter.onDelete(`${ApiRoute.Friends}/${friendId}`).reply(200);

    await store.dispatch(deleteFriend(friendId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([deleteFriend.pending.type, deleteFriend.fulfilled.type]);
  });

  it('should dispatch "uploadFriends.pending" and "uploadFriends.fulfilled" with thunk uploadFriends and code 200', async () => {
    const query = {
      count: Setting.FriendsPerPageCount,
      page: Setting.DefaultStartPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    };
    const returnedData = {
            entities: Array.from({length: 5}, () => ({...generateMockUser(), 'trainingRequests': true, 'trainTypes': [], avatar: ''})),
            totalPages: 2,
            currentPage: 1,
            totalItems: 10,
            itemsPerPage: 6        
          }

    mockAxiosAdapter.onGet(`${ApiRoute.Friends}?${createQueryString(query)}`).reply(200, returnedData);

    await store.dispatch(uploadFriends(query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadFriends.fulfilled>;

    expect(actions).toEqual([uploadFriends.pending.type, uploadFriends.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "sendTrainingRequest.pending" and "sendTrainingRequest.fulfilled" with thunk sendTrainingRequest and code 200', async () => {
    const fakeModule = {
      cb: () => 'send request for training'
    }

    const requestData = {
      senderId: faker.string.uuid(), 
      recieverId: faker.string.uuid(), 
      status: RequestStatus.APPROVED      
    }
    
    vi.spyOn(fakeModule, 'cb');
    mockAxiosAdapter.onPost(ApiRoute.Requests).reply(200);

    await store.dispatch(sendTrainingRequest({...requestData, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([sendTrainingRequest.pending.type, sendTrainingRequest.fulfilled.type]);
    expect(fakeModule.cb).toBeCalledTimes(1);
  });

});