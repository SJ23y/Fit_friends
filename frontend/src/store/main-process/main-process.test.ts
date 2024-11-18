import { CITIES, DEFAULT_CITY, SortBy } from '../../consts';
import offers from '../../mocks/offers';
import { toggleFavoriteStatus, uploadOffers } from './thunk-actions';
import { changeCity, changeSortBy, mainProcess } from './main-process';
import { describe, it, expect } from 'vitest';

describe('Main-process slice', () => {
  const initialState = {
    city: DEFAULT_CITY,
    initialOffers: null,
    sortBy: SortBy.Popular,
    isLoading: false,
    errorStatus: false,
    favoriteOffers: null,
  };

  const state = {
    city: CITIES[2],
    initialOffers: offers,
    sortBy: SortBy.PriceDown,
    isLoading: false,
    errorStatus: false,
    favoriteOffers: null,
  };

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

  it('Should change sortBy', () => {
    const result = mainProcess.reducer(
      state,
      changeSortBy({ sortBy: SortBy.Rating }),
    );

    expect(result.sortBy).toBe(SortBy.Rating);
  });

  it('Should change city', () => {
    const result = mainProcess.reducer(state, changeCity({ city: CITIES[4] }));

    expect(result.city).toBe(CITIES[4]);
  });

  it('Should set isLoading to true with uploadOffers.pending', () => {
    const result = mainProcess.reducer(state, uploadOffers.pending);

    expect(result.isLoading).toBe(true);
  });

  it('Should set isLoading to false and set initialOffers to offers.slice(3) with uploadOffers.fulfilled', () => {
    const expectedValue = offers.slice(3);

    const result = mainProcess.reducer(
      state,
      uploadOffers.fulfilled(expectedValue, '', undefined),
    );

    expect(result.initialOffers).toEqual(expectedValue);
    expect(result.isLoading).toBe(false);
  });

  it('Should set isLoading to false and set errorStatus to true with uploadOffers.rejected', () => {
    const result = mainProcess.reducer(state, uploadOffers.rejected);

    expect(result.errorStatus).toBe(true);
    expect(result.isLoading).toBe(false);
  });

  it('Should replace currentOffer in initialOffers and favoriteOffers with toggleFavoriteStatus.fulfilled', () => {
    const currentOffer = {
      id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
      title: 'Beautiful studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
      isFavorite: true,
      isPremium: false,
      rating: 4,
      previewImage: 'img/apartment-01.jpg',
    };

    const result = mainProcess.reducer(
      state,
      toggleFavoriteStatus.fulfilled(currentOffer, '', {
        offerId: '1',
        status: 0,
      }),
    );

    expect(result.initialOffers?.[0]).toEqual(currentOffer);
    expect(
      result.favoriteOffers?.find((offer) => offer.id === currentOffer.id),
    ).toEqual(currentOffer);
  });
});
