import { NameSpace, SortBy } from '../../consts';
import offers from '../../mocks/offers';
import {
  getCurrentCity,
  getErrorStatus,
  getFavoriteOffers,
  getInitialOffers,
  getLoadingStatus,
  getSortBy,
} from './selectors';

describe('Main-process selectors', () => {
  const state = {
    [NameSpace.OFFERS]: {
      city: 'Paris',
      initialOffers: offers,
      offers: offers,
      sortBy: SortBy.Popular,
      isLoading: false,
      errorStatus: false,
      favoriteOffers: offers,
    },
  };

  it('Should return SorBy from the State', () => {
    const { sortBy } = state[NameSpace.OFFERS];

    const result = getSortBy(state);

    expect(result).toBe(sortBy);
  });

  it('Should return initialOffers from the State', () => {
    const { initialOffers } = state[NameSpace.OFFERS];

    const result = getInitialOffers(state);

    expect(result).toEqual(initialOffers);
  });

  it('Should return offers from the State', () => {
    const { offers: filteredOffers } = state[NameSpace.OFFERS];

    const result = getInitialOffers(state);

    expect(result).toEqual(filteredOffers);
  });

  it('Should return loadingStatus from the State', () => {
    const { isLoading } = state[NameSpace.OFFERS];

    const result = getLoadingStatus(state);

    expect(result).toBe(isLoading);
  });

  it('Should return loadingStatus from the State', () => {
    const { city } = state[NameSpace.OFFERS];

    const result = getCurrentCity(state);

    expect(result).toBe(city);
  });

  it('Should return errorStatus from the State', () => {
    const { errorStatus } = state[NameSpace.OFFERS];

    const result = getErrorStatus(state);

    expect(result).toBe(errorStatus);
  });

  it('Should return loadingStatus from the State', () => {
    const { favoriteOffers } = state[NameSpace.OFFERS];

    const result = getFavoriteOffers(state);

    expect(result).toEqual(favoriteOffers);
  });
});
