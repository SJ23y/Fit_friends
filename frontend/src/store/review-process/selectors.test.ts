import { NameSpace } from '../../consts';
import { generateMockReview } from '../../mock-data/mock-reviews';
import { getReviews } from './selectors';

describe('Review-process selectors', () => {
  const state = {
    [NameSpace.REVIEW]: {
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
    },
  };

  it('Should return reviews from the State', () => {
    const { reviews } = state[NameSpace.REVIEW];

    const result = getReviews(state);

    expect(result).toEqual(reviews);
  });
});
