import { NameSpace } from '../../consts';
import { generateMockOrders } from '../../mock-data/mock-orders';
import { generateMockPurchase } from '../../mock-data/mock-purchases';
import { getOrders, getPurchaseLoadingStatus, getPurchases, getTrainingPurchase } from './selectors';

describe('Purchase-process selectors', () => {
  const state = {
    [NameSpace.PURCHASE]: {
      purchases: {
        entities: Array.from({length: 5}, () => generateMockPurchase()),
        totalPages: 2,
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 6,
        minPrice: 1000,
        maxPrice: 3000,
        minCallories: 1000,
        maxCallories: 2000
      },
      currentTrainingPurchase: generateMockPurchase(),
      loadingStatus: false,
      coachOrders: {
        entities: Array.from({length: 5}, () => generateMockOrders()),
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

  it('Should return purchases from the State', () => {
    const { purchases } = state[NameSpace.PURCHASE];

    const result = getPurchases(state);

    expect(result).toEqual(purchases);
  });

  it('Should return orders from the State', () => {
    const { coachOrders } = state[NameSpace.PURCHASE];

    const result = getOrders(state);

    expect(result).toEqual(coachOrders);
  });

  it('Should return currentTrainingPurchase from the State', () => {
    const { currentTrainingPurchase } = state[NameSpace.PURCHASE];

    const result = getTrainingPurchase(state);

    expect(result).toEqual(currentTrainingPurchase);
  });

  it('Should return loadingStatus from the State', () => {
    const { loadingStatus } = state[NameSpace.PURCHASE];

    const result = getPurchaseLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

});
