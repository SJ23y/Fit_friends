import { describe, it, expect } from 'vitest';
import { Setting } from '../../consts';
import { faker } from '@faker-js/faker';
import { generateMockReview } from '../../mock-data/mock-reviews';
import { reviewProcess } from './review-process';
import { addNewReview, uploadReviews } from './thunk-actions';
import { getRandomInteger } from '../../utils';

describe('Review-process slice', () => {
  const initialState = {
    reviews: null,
  };

  const state = {
    reviews: {
      entities: Array.from({length: 5}, () => generateMockReview()),
      totalPages: 2,
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 6,
      minPrice: 1000,
      maxPrice: 3000,
      minCallories: 1000,
      maxCallories: 2000
    }
  }

  const query = {
    page: Setting.DefaultStartPage,
    count: Setting.OrdersPerPageCount,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection
  }


  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = reviewProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = reviewProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set reviews to newReviews uploadReviews.fulfilled', () => {
    const newReviews = {
        entities: Array.from({length: 5}, () => generateMockReview()),
        totalPages: getRandomInteger(1,50),
        currentPage: getRandomInteger(1,50),
        totalItems: getRandomInteger(1,50),
        itemsPerPage: getRandomInteger(1,50),
        minPrice: getRandomInteger(1,50),
        maxPrice: getRandomInteger(1,50),
        minCallories: getRandomInteger(1,50),
        maxCallories: getRandomInteger(1,50)
    }

    const result = reviewProcess.reducer(
      state,
      uploadReviews.fulfilled(
        newReviews,
        '',
      {
        trainingId: faker.string.uuid(),
        query
      })
    );

    expect(result.reviews)
      .toEqual(newReviews);
  });

  it('Should push newReviews to reviews.entities with addNewReview.fulfilled', () => {
    const newReview = generateMockReview();

    const result = reviewProcess.reducer(
      state,
      addNewReview.fulfilled(
        newReview,
        '',
        {newReview, cb: () => 'fulfilled'}
      ));

    expect(result.reviews?.entities).toContain(newReview);
  });
});
