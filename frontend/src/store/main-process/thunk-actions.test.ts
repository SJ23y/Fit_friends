import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, State } from '../../types/state';
import { uploadFeaturedTrainings, uploadPopularTrainings, uploadSpecialTrainings, uploadTrainings } from './thunk-actions';
import { ApiRoute, Setting } from '../../consts';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import { faker } from '@faker-js/faker';
import { createQueryString, extactActionsType } from '../../utils';


describe('Main process async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  const initialState = {
    trainings: null,
    featuredTrainings: null,
    errorStatus: false,
    specialTrainings: null,
    popularTrainings: null,
    query: {
      count: Setting.TrainingsCatalogItemsPerPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection,
      page: Setting.DefaultStartPage,
      maxPrice: null,
      minPrice: null,
      maxCallories: null,
      minCallories: null,
      maxRating: null,
      minRating: null,
      type: null,
      free: null,
      durations: null
    }
  }

  let returnedData = {
    entities: Array.from({length: 3}, () => {
      const mockTraining = generateMockTraining();
      return {
        ...mockTraining,
        createdAt: '',
        coach: {
          ...mockTraining.coach,

          avatar: ''
        }
      }
    }),
    totalPages: faker.number.int(),
    currentPage: faker.number.int(),
    totalItems: faker.number.int(),
    itemsPerPage: faker.number.int(),
    minPrice: faker.number.int(),
    maxPrice: faker.number.int(),
    minCallories: faker.number.int(),
    maxCallories: faker.number.int()
  };

  beforeEach(() => {
    store = mockStoreCreator({
      MAIN: { ...initialState }
    });
  });

  it('should dispatch "uploadTrainings.pending" and "uploadTrainings.fulfilled" with thunk uploadTrainings and code 200', async () => {

    mockAxiosAdapter.onGet(`${ApiRoute.Trainings}?${createQueryString(initialState.query)}`).reply(200, returnedData);

    await store.dispatch(uploadTrainings(initialState.query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadTrainings.fulfilled>;

    expect(actions).toEqual([uploadTrainings.pending.type, uploadTrainings.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "uploadFeaturedTrainings.pending" and "uploadFeaturedTrainings.fulfilled" with thunk uploadFeaturedTrainings and code 200', async () => {
    mockAxiosAdapter.onGet(`${ApiRoute.Trainings}?${createQueryString(initialState.query)}`).reply(200, returnedData);

    await store.dispatch(uploadFeaturedTrainings(initialState.query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadFeaturedTrainings.fulfilled>;

    expect(actions).toEqual([uploadFeaturedTrainings.pending.type, uploadFeaturedTrainings.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData.entities);
  });

  it('should dispatch "uploadSpecialTrainings.pending" and "uploadSpecialTrainings.fulfilled" with thunk uploadSpecialTrainings and code 200', async () => {

    mockAxiosAdapter.onGet(`${ApiRoute.Trainings}?${createQueryString(initialState.query)}`).reply(200, returnedData);

    await store.dispatch(uploadSpecialTrainings(initialState.query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadSpecialTrainings.fulfilled>;

    expect(actions).toEqual([uploadSpecialTrainings.pending.type, uploadSpecialTrainings.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData.entities);
  });

  it('should dispatch "uploadPopularTrainings.pending" and "uploadPopularTrainings.fulfilled" with thunk uploadPopularTrainings and code 200', async () => {

    mockAxiosAdapter.onGet(`${ApiRoute.Trainings}?${createQueryString(initialState.query)}`).reply(200, returnedData);

    await store.dispatch(uploadPopularTrainings(initialState.query));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadPopularTrainings.fulfilled>;

    expect(actions).toEqual([uploadPopularTrainings.pending.type, uploadPopularTrainings.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData.entities);
  });
});
