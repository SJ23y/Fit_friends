import { NameSpace, Setting } from '../../consts';
import { generateMockTraining } from '../../mock-data/mock-trainings';
import { getErrorStatus, getFeaturedTrainings, getPopularlTrainings, getQuery, getSpecialTrainings, getTrainings } from './selectors';

describe('Main-process selectors', () => {
  const state = {
    [NameSpace.MAIN]: {
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
    },
  };

  it('Should return trainings from the State', () => {
    const { trainings } = state[NameSpace.MAIN];

    const result = getTrainings(state);

    expect(result).toEqual(trainings);
  });

  it('Should return specialTrainings from the State', () => {
    const { specialTrainings } = state[NameSpace.MAIN];

    const result = getSpecialTrainings(state);

    expect(result).toEqual(specialTrainings);
  });

  it('Should return popularTrainings from the State', () => {
    const { popularTrainings } = state[NameSpace.MAIN];

    const result = getPopularlTrainings(state);

    expect(result).toEqual(popularTrainings);
  });

 it('Should return featuredTrainings from the State', () => {
    const { featuredTrainings } = state[NameSpace.MAIN];

    const result = getFeaturedTrainings(state);

    expect(result).toEqual(featuredTrainings);
  });

  it('Should return query from the State', () => {
    const { query } = state[NameSpace.MAIN];

    const result = getQuery(state);

    expect(result).toEqual(query);
  });

  it('Should return errorStatus from the State', () => {
    const { errorStatus } = state[NameSpace.MAIN];

    const result = getErrorStatus(state);

    expect(result).toBe(errorStatus);
  });
});
