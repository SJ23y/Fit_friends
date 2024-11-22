import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { checkAuthorization } from './thunk-actions';
import { extactActionsType } from '../utils';
import { ApiRoute, AuthorizationStatus } from '../consts';


describe('Async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      error: null,
      loadingStatus: false,
      currentlyViewedUser: null
    }});
  })

  it('should dispatch "checkAuthorization.pending" and "checkAuthorization.fulfilled" with thunk checkAuthorization and code 200', async () => {
    mockAxiosAdapter.onPost(ApiRoute.Check).reply(200);

    await store.dispatch(checkAuthorization());

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.fulfilled.type]);
  });

  it('should dispatch "checkAuthorization.pending" and "checkAuthorization.rejected" with thunk checkAuthorization and code 401', async () => {
    mockAxiosAdapter.onPost(ApiRoute.Check).reply(401);

    await store.dispatch(checkAuthorization());

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.rejected.type]);
  });

});
