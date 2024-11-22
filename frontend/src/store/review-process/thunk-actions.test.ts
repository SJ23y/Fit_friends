import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { addNewReview, uploadReviews } from './thunk-actions';
import { ApiRoute, Setting } from '../../consts';
import { generateMockReview } from '../../mock-data/mock-reviews';
import { faker } from '@faker-js/faker';
import { createQueryString, extactActionsType } from '../../utils';



describe('Review process async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  const query = {
    page: Setting.DefaultStartPage,
    count: Setting.OrdersPerPageCount,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection
  }

  beforeEach(() => {
    store = mockStoreCreator({Review: {
      reviews: null
     }});
  });

  it('should dispatch "uploadReviews.pending" and "uploadReviews.fulfilled" with thunk uploadReviews and code 200', async () => {
    const returnedData = Array.from({length: 5}, () => generateMockReview());
    const trainingId = faker.string.uuid();
    mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${trainingId}?${createQueryString(query)}`).reply(200, returnedData);

    await store.dispatch(uploadReviews({trainingId, query}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadReviews.fulfilled>;

    expect(actions).toEqual([uploadReviews.pending.type, uploadReviews.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "addNewReview.pending" and "addNewReview.fulfilled" with thunk addNewReview and code 200', async () => {
    const returnedData = generateMockReview();
    const fakeModule = {
      cb: () => 'add new review'
    }

    vi.spyOn(fakeModule, 'cb')
    mockAxiosAdapter.onPost(`${ApiRoute.Reviews}`).reply(200, returnedData);

    await store.dispatch(addNewReview({newReview: returnedData, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof addNewReview.fulfilled>;

    expect(actions).toEqual([addNewReview.pending.type, addNewReview.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
    expect(fakeModule.cb).toBeCalledTimes(1);
  });

  it('should dispatch "addNewReview.pending" and "addNewReview.rejected" with thunk addNewReview and code 400', async () => {
    const returnedData = generateMockReview();
    const fakeModule = {
      cb: () => 'add new review'
    }

    mockAxiosAdapter.onPost(`${ApiRoute.Reviews}`).reply(400);

    await store.dispatch(addNewReview({newReview: returnedData, cb: fakeModule.cb}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([addNewReview.pending.type, addNewReview.rejected.type]);
  });
});
