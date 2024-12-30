import { Setting } from '../../consts';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import {  changeQuery, mainProcess } from './main-process';
import { describe, it, expect } from 'vitest';
import { uploadFeaturedTrainings, uploadPopularTrainings, uploadSpecialTrainings, uploadTrainings } from './thunk-actions';
import { faker } from '@faker-js/faker';

describe('Main-process slice', () => {
  const initialState = {
    trainings: null,
    loadingStatus: false,
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
  };

  const state = {
      trainings: {
        entities: Array.from({length: 5}, () => generateMockTraining()),
        totalPages: 2,
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 6,
        minPrice: 1000,
        maxPrice: 3000,
        minCallories: 1000,
        maxCallories: 2000
      },
      featuredTrainings: Array.from({length: 3}, () => generateMockTraining()),
      errorStatus: false,
      specialTrainings: Array.from({length: 3}, () => generateMockTraining()),
      popularTrainings: Array.from({length: 3}, () => generateMockTraining()),
      loadingStatus: false,
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

    let newTrainings = {
      entities: Array.from({length: 3}, () => generateMockTraining()),
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
    newTrainings = {
      entities: Array.from({length: 3}, () => generateMockTraining()),
      totalPages: faker.number.int(),
      currentPage: faker.number.int(),
      totalItems: faker.number.int(),
      itemsPerPage: faker.number.int(),
      minPrice: faker.number.int(),
      maxPrice: faker.number.int(),
      minCallories: faker.number.int(),
      maxCallories: faker.number.int()
    };
  })

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = mainProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = mainProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should change query', () => {
    const newQuery = {
      ...state.query,
      minCallories: 1000,
      maxRating: 3,
      minRating: 1,
    }

    const result = mainProcess.reducer(
      state,
      changeQuery(newQuery),
    );

    expect(result.query).toEqual(newQuery);
  });

  it('Should set trainings to newTrainings.entities with uploadTrainings.fulfilled', () => {
    const result = mainProcess.reducer(
      state,
      uploadTrainings.fulfilled(newTrainings, '', state.query),
    );

    expect(result.trainings).toEqual({...newTrainings, entities: [...state.trainings.entities, ...newTrainings.entities]});
  });

  it('Should set featuredTrainings to newTrainings to true with uploadFeaturedTrainings.fulfilled', () => {
    const result = mainProcess.reducer(state, uploadFeaturedTrainings.fulfilled(newTrainings.entities, '', initialState.query));

    expect(result.featuredTrainings).toEqual(newTrainings.entities);
  });

  it('Should set popularTrainings to newTrainings.entities to true with uploadPopularTrainings.fulfilled', () => {
    const result = mainProcess.reducer(state, uploadPopularTrainings.fulfilled(newTrainings.entities, '', initialState.query));

    expect(result.popularTrainings).toEqual(newTrainings.entities);
  });

  it('Should set specialTrainings to newTrainings.entities to true with uploadSpecialTrainings.fulfilled', () => {
    const result = mainProcess.reducer(state, uploadSpecialTrainings.fulfilled(newTrainings.entities, '', initialState.query));

    expect(result.specialTrainings).toEqual(newTrainings.entities);
  });
});
