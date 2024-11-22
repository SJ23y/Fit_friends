import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import { changeCurrentTraining, trainingProcess } from './training-process';
import { addNewTraining, updateTraining, uploadTrainingById } from './thunk-actions';

describe('Training-process slice', () => {
  const initialState = {
    currentTraining: null,
    loadingStatus: false
  };

  const state = {
    currentTraining: generateMockTraining(),
    loadingStatus: false
  }

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = trainingProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = trainingProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set currentTraining to newTraining with changeCurrentTraining', () => {
    const newTraining = generateMockTraining();

    const result = trainingProcess.reducer(state, changeCurrentTraining(newTraining));

    expect(result.currentTraining).toEqual(newTraining);
  });

  it('Should set loadingStatus to true with uploadTrainingById.pending', () => {
    const result = trainingProcess.reducer(state, uploadTrainingById.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentTraining to newTraining and loadingStatus to false with uploadTrainingById.fulfilled', () => {
    const newTraining = generateMockTraining();

    const result = trainingProcess.reducer(
      state,
      uploadTrainingById.fulfilled(
        newTraining,
        '',
        faker.string.uuid()
      ));

    expect(result.loadingStatus).toBe(false);
    expect(result.currentTraining).toEqual(newTraining);
  });

  it('Should set loading status to true with addNewTraining.pending', () => {
    const result = trainingProcess.reducer(state, addNewTraining.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentTraining to newTraining and loadingStatus to false with addNewTraining.fulfilled', () => {
    const newTraining = generateMockTraining();
    const data = new FormData();

    const result = trainingProcess.reducer(
      state,
      addNewTraining.fulfilled(
        newTraining,
        '',
        data
      ));

    expect(result.loadingStatus).toBe(false);
    expect(result.currentTraining).toEqual(newTraining);
  });

  it('Should set loadingStatus to false with addNewTraining.rejected', () => {
    const result = trainingProcess.reducer(state, addNewTraining.rejected);

    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to true with updateTraining.pending', () => {
    const result = trainingProcess.reducer(state, updateTraining.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentTraining to newTraining and loadingStatus to false with updateTraining.fulfilled', () => {
    const newTraining = generateMockTraining();
    const data = new FormData();

    const result = trainingProcess.reducer(
      state,
      updateTraining.fulfilled(
        newTraining,
        '',
        {newTraining: data, trainingId:  faker.string.uuid()}
      ));

    expect(result.loadingStatus).toBe(false);
    expect(result.currentTraining).toEqual(newTraining);
  });

  it('Should set loading status to false with updateTraining.rejected', () => {
    const result = trainingProcess.reducer(state, updateTraining.rejected);

    expect(result.loadingStatus).toBe(false);
  });


});
