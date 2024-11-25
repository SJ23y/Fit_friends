import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { ApiRoute, AuthorizationStatus } from '../../consts';
import { extactActionsType } from '../../utils';
import { AuthData, } from '../../types/auth';
import { redirectToRoute } from '../actions';
import * as tokenStorage from '../../services/token';
import { checkAuthorization, getUserById, loginUser, /*logoutUser,*/ registerUser, saveQuestionnaireResult, updateUser } from './thunk-actions';
import { faker } from '@faker-js/faker';
import { generateMockUser } from '../../mock-data/mock-users';


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
  });

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

  it('should dispatch "registerUser.pending", "loginUser.pending", "redirectToRoute" and "registerUser.fulfilled" with thunk registerUser and code 200', async () => {
    const returnedData = {...generateMockUser(), avatar: ''};
    const data = new FormData();

    mockAxiosAdapter.onPost(ApiRoute.Register).reply(200, returnedData);

    await store.dispatch(registerUser(data));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(3) as ReturnType<typeof registerUser.fulfilled>;

    expect(actions).toEqual([registerUser.pending.type, loginUser.pending.type, redirectToRoute.type, registerUser.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "registerUser.pending" and "registerUser.rejected" with thunk registerUser and code 400', async () => {
    const data = new FormData();

    mockAxiosAdapter.onPost(ApiRoute.Register).reply(400);
    await store.dispatch(registerUser(data));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([registerUser.pending.type, registerUser.rejected.type]);
  });

  it('should dispatch "saveQuestionnaireResult.pending" and "saveQuestionnaireResult.fulfilled" with thunk saveQuestionnaireResult and code 200', async () => {
    const returnedData = generateMockUser();

    mockAxiosAdapter.onPost(ApiRoute.UserUpdate).reply(200, returnedData.questionnaire);
    await store.dispatch(saveQuestionnaireResult(returnedData.questionnaire));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof saveQuestionnaireResult.fulfilled>;

    expect(actions).toEqual([saveQuestionnaireResult.pending.type, saveQuestionnaireResult.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData.questionnaire);
  });

  it('should dispatch "saveQuestionnaireResult.pending" and "saveQuestionnaireResult.rejected" with thunk saveQuestionnaireResult and code 400', async () => {
    const returnedData = generateMockUser();

    mockAxiosAdapter.onPost(ApiRoute.UserUpdate).reply(400);
    await store.dispatch(saveQuestionnaireResult(returnedData.questionnaire));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([saveQuestionnaireResult.pending.type, saveQuestionnaireResult.rejected.type]);
  });

  it('should dispatch "updateUser.pending" and "updateUser.fulfilled" with thunk updateUser and code 200', async () => {
    const returnedData = generateMockUser();
    const data = new FormData();
    const fakeModule = {
      cb: () => 'update user'
    }

    vi.spyOn(fakeModule, 'cb');

    mockAxiosAdapter.onPost(ApiRoute.UserUpdate).reply(200, {...returnedData, avatar: ''});
    await store.dispatch(updateUser({user: data, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof updateUser.fulfilled>;

    expect(actions).toEqual([updateUser.pending.type, updateUser.fulfilled.type]);
    expect(receivedData.payload).toEqual({...returnedData, avatar: ''});
    expect(fakeModule.cb).toBeCalledTimes(1);
  });

  it('should dispatch "updateUser.pending" and "updateUser.rejected" with thunk updateUser and code 400', async () => {
    const data = new FormData();
    const fakeModule = {
      cb: () => 'update user'
    }

    mockAxiosAdapter.onPost(ApiRoute.UserUpdate).reply(400);
    await store.dispatch(updateUser({user: data, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([updateUser.pending.type, updateUser.rejected.type]);
  });

  it('should dispatch "getUserById.pending" and "getUserById.fulfilled" with thunk getUserById and code 200', async () => {
    const returnedData = {...generateMockUser(), avatar: ''};
    const userId = faker.string.uuid();

    mockAxiosAdapter.onGet(`${ApiRoute.User}/${userId}`).reply(200, returnedData);
    await store.dispatch(getUserById(userId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof getUserById.fulfilled>;

    expect(actions).toEqual([getUserById.pending.type, getUserById.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "getUserById.pending" and "getUserById.rejected" with thunk getUserById and code 400', async () => {
    const userId = faker.string.uuid();

    mockAxiosAdapter.onGet(`${ApiRoute.User}/${userId}`).reply(400);
    await store.dispatch(getUserById(userId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([getUserById.pending.type, getUserById.rejected.type]);
  });

  it('should dispatch "loginUser.pending" and "loginUser.rejected" with thunk loginUser and code 400', async () => {
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);

    await store.dispatch(loginUser(userData));

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([loginUser.pending.type, loginUser.rejected.type]);
  });

  it('should dispatch "loginUser.pending" and "loginUser.fulfilled" with thunk loginUser and code 200', async () => {
    const returnedData = { asseccToken: faker.internet.jwt(), refreshToken: faker.internet.jwt()};
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};

    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, returnedData);
    await store.dispatch(loginUser(userData));

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([loginUser.pending.type, loginUser.fulfilled.type]);
  });

  it('should dispatch "loginUser.pending" and "loginUser.rejected" with thunk loginUser and code 400', async () => {
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);

    await store.dispatch(loginUser(userData));

    const actions = extactActionsType(store.getActions());

    expect(actions).toEqual([loginUser.pending.type, loginUser.rejected.type]);
  });

  it('should call saveToken function one time with token with thunk loginUser and code 200', async () => {
    const returnedData = { accessToken: faker.internet.jwt(), refreshToken: faker.internet.jwt()};
    const userData: AuthData = {password: '121121', email: 'aaaa@aaaa.com'};
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, returnedData);

    const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

    await store.dispatch(loginUser(userData));

    expect(mockSaveToken).toBeCalledTimes(1);
    expect(mockSaveToken).toBeCalledWith(returnedData.accessToken, returnedData.refreshToken);
  });
  /*
  it('should dispatch "logoutUser.pending" and "logoutUser.fulfilled" with thunk logoutUser and code 204', async () => {

    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    await store.dispatch(logoutUser());

    const actions = extactActionsType(store.getActions());
    expect(actions).toEqual([logoutUser.pending.type, logoutUser.fulfilled.type]);
  });

  it('should call dropToken one time with thunk logotUser', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    vi.spyOn(tokenStorage, 'dropToken');

    await store.dispatch(logoutUser());

    expect(tokenStorage.dropToken).toBeCalledTimes(1);
  });*/
});
