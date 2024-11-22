import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { addNewTraining, updateTraining, uploadTrainingById } from './thunk-actions';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import { ApiRoute } from '../../consts';
import { extactActionsType } from '../../utils';
import { faker } from '@faker-js/faker';




describe('Async actions', () => {
  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({TRAINING: {
      currentTraining: null,
      loadingStatus: false
    }});
  });

  it('should dispatch "addNewTraining.pending" and "addNewTraining.fulfilled" with thunk addNewTraining and code 200', async () => {
    const mockTraining = generateMockTraining();
    const returnedData =  {
      ...mockTraining,
      createdAt: '',
      coach: {...mockTraining.coach, avatar: ''}
    }
    const data = new FormData();
    mockAxiosAdapter.onPost(ApiRoute.Trainings).reply(200, returnedData);

    await store.dispatch(addNewTraining(data));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof addNewTraining.fulfilled>;

    expect(actions).toEqual([addNewTraining.pending.type, addNewTraining.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "addNewTraining.pending" and "addNewTraining.rejected" with thunk addNewTraining and code 400', async () => {
    const data = new FormData();
    mockAxiosAdapter.onPost(ApiRoute.Trainings).reply(400);

    await store.dispatch(addNewTraining(data));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([addNewTraining.pending.type, addNewTraining.rejected.type]);
  });

  it('should dispatch "updateTraining.pending" and "updateTraining.fulfilled" with thunk updateTraining and code 200', async () => {
    const mockTraining = generateMockTraining();
    const returnedData =  {
      ...mockTraining,
      createdAt: '',
      coach: {...mockTraining.coach, avatar: ''}
    }
    const data = new FormData();
    const trainingId = faker.string.uuid();

    mockAxiosAdapter.onPost(`${ApiRoute.Trainings}/update/${trainingId}`).reply(200, returnedData);

    await store.dispatch(updateTraining({newTraining: data, trainingId}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof updateTraining.fulfilled>;

    expect(actions).toEqual([updateTraining.pending.type, updateTraining.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

  it('should dispatch "updateTraining.pending" and "updateTraining.rejected" with thunk updateTraining and code 200', async () => {
    const data = new FormData();
    const trainingId = faker.string.uuid();

    mockAxiosAdapter.onPost(`${ApiRoute.Trainings}/update/${trainingId}`).reply(400);

    await store.dispatch(updateTraining({newTraining: data, trainingId}));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);

    expect(actions).toEqual([updateTraining.pending.type, updateTraining.rejected.type]);
  });

  it('should dispatch "uploadTrainingById.pending" and "uploadTrainingById.fulfilled" with thunk uploadTrainingById and code 200', async () => {
    const mockTraining = generateMockTraining();
    const returnedData =  {
      ...mockTraining,
      createdAt: '',
      coach: {...mockTraining.coach, avatar: ''}
    }
    const trainingId = faker.string.uuid();

    mockAxiosAdapter.onGet(`${ApiRoute.Trainings}/${trainingId}`)
    .reply(200, returnedData);

    await store.dispatch(uploadTrainingById(trainingId));

    const emittedActions = store.getActions();
    const actions = extactActionsType(emittedActions);
    const receivedData = emittedActions.at(1) as ReturnType<typeof uploadTrainingById.fulfilled>;

    expect(actions).toEqual([uploadTrainingById.pending.type, uploadTrainingById.fulfilled.type]);
    expect(receivedData.payload).toEqual(returnedData);
  });

});
