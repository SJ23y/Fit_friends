import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, State } from '../../types/state';
import { ApiRoute, Setting } from '../../consts';
import { createQueryString, extactActionsType } from '../../utils';
import { addNewPurchase, reducePurchaseTrainings, uploadCoachOrders, uploadPurchaseByTrainingId, uploadPurchases } from './thunk-actions';
import { generateMockPurchase } from '../../mock-data/mock-purchases';
import { generateMockOrders } from '../../mock-data/mock-orders';
import { faker } from '@faker-js/faker';


describe('Purchase process async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const query = {
    page: Setting.DefaultStartPage,
    count: Setting.OrdersPerPageCount,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection
  }

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      Purchase: {
        purchases: null,
        currentTrainingPurchase: null,
        loadingStatus: false,
        coachOrders: null
      }
    });
  });

  it('should dispatch "uploadPurchases.pending" and "uploadPurchases.fulfilled" with thunk uploadPurchases and code 200', async () => {
    const returnedData = {
      entities: Array.from({length: 5}, () => ({...generateMockPurchase(), createdAt: ''})),
      totalPages: 2,
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 6,
      minPrice: 1000,
      maxPrice: 3000,
      minCallories: 1000,
      maxCallories: 2000
    };

    mockAxiosAdapter.onGet(`${ApiRoute.Purchases}/user?${createQueryString(query)}`).reply(200, returnedData);

    await store.dispatch(uploadPurchases(query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadPurchases.fulfilled>;

    expect(actions).toEqual([uploadPurchases.pending.type, uploadPurchases.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadCoachOrders.pending" and "uploadCoachOrders.fulfilled" with thunk uploadCoachOrders and code 200', async () => {
    const returnedData = {
      entities: Array.from({length: 5}, () => ({...generateMockOrders(), createdAt: ''})),
      totalPages: 2,
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 6,
      minPrice: 1000,
      maxPrice: 3000,
      minCallories: 1000,
      maxCallories: 2000
    };

    mockAxiosAdapter.onGet(`${ApiRoute.Purchases}/orders?${createQueryString(query)}`).reply(200, returnedData);

    await store.dispatch(uploadCoachOrders(query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadCoachOrders.fulfilled>;

    expect(actions).toEqual([uploadCoachOrders.pending.type, uploadCoachOrders.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadCoachOrders.pending" and "uploadCoachOrders.rejected" with thunk uploadCoachOrders and code 200', async () => {
    mockAxiosAdapter.onGet(`${ApiRoute.Purchases}/orders?${createQueryString(query)}`).reply(400);

    await store.dispatch(uploadCoachOrders(query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadCoachOrders.pending.type, uploadCoachOrders.rejected.type]);
  });

  it('should dispatch "uploadPurchaseByTrainingId.pending" and "uploadPurchaseByTrainingId.fulfilled" with thunk uploadPurchaseByTrainingId and code 200', async () => {
    const returnedData = {...generateMockPurchase(), createdAt: ''};
    const trainingId = faker.string.uuid();

    mockAxiosAdapter.onGet(`${ApiRoute.Purchases}/${trainingId}`).reply(200, returnedData);

    await store.dispatch(uploadPurchaseByTrainingId(trainingId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadPurchaseByTrainingId.fulfilled>;

    expect(actions).toEqual([uploadPurchaseByTrainingId.pending.type, uploadPurchaseByTrainingId.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadPurchaseByTrainingId.pending" and "uploadPurchaseByTrainingId.rejected" with thunk uploadPurchaseByTrainingId and code 400', async () => {
    const trainingId = faker.string.uuid();

    mockAxiosAdapter.onGet(`${ApiRoute.Purchases}/${trainingId}`).reply(400);

    await store.dispatch(uploadPurchaseByTrainingId(trainingId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([uploadPurchaseByTrainingId.pending.type, uploadPurchaseByTrainingId.rejected.type]);
  });

  it('should dispatch "addNewPurchase.pending" and "addNewPurchase.fulfilled" with thunk addNewPurchase and code 200', async () => {
    const returnedData = {...generateMockPurchase(), createdAt: ''};
    const fakeModule = {
      cb: () => 'addNewPurchase'
    };

    vitest.spyOn(fakeModule, 'cb');
    mockAxiosAdapter.onPost(`${ApiRoute.Purchases}`).reply(200, returnedData);

    await store.dispatch(addNewPurchase({newPurchase: returnedData, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof addNewPurchase.fulfilled>;

    expect(actions).toEqual([addNewPurchase.pending.type, addNewPurchase.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
    expect(fakeModule.cb).toBeCalledTimes(1);
  });

  it('should dispatch "addNewPurchase.pending" and "addNewPurchase.rejected" with thunk addNewPurchase and code 400', async () => {
    const returnedData = {...generateMockPurchase(), createdAt: ''};
    const fakeModule = {
      cb: () => 'addNewPurchase'
    };

    mockAxiosAdapter.onPost(`${ApiRoute.Purchases}`).reply(400);

    await store.dispatch(addNewPurchase({newPurchase: returnedData, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([addNewPurchase.pending.type, addNewPurchase.rejected.type]);
  });

  it('should dispatch "reducePurchaseTrainings.pending" and "reducePurchaseTrainings.fulfilled" with thunk reducePurchaseTrainings and code 200', async () => {
    const returnedData = {...generateMockPurchase(), createdAt: ''};
    const purchaseId = faker.string.uuid();

    mockAxiosAdapter.onPatch(`${ApiRoute.Purchases}/${purchaseId}`).reply(200, returnedData);

    await store.dispatch(reducePurchaseTrainings({
      purchaseId,
      trainId: faker.string.uuid(),
      trainCount: 1
    }));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof reducePurchaseTrainings.fulfilled>;

    expect(actions).toEqual([reducePurchaseTrainings.pending.type, reducePurchaseTrainings.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });
});
