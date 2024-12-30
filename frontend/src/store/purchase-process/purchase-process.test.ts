import { describe, it, expect } from 'vitest';
import { generateMockPurchase } from '../../mock-data/mock-purchases';
import { generateMockOrders } from '../../mock-data/mock-orders';
import { purchaseProcess } from './purchase-process';
import { addNewPurchase, reducePurchaseTrainings, uploadCoachOrders, uploadPurchaseByTrainingId, uploadPurchases } from './thunk-actions';
import { Setting } from '../../consts';
import { faker } from '@faker-js/faker';

describe('Purchase-process slice', () => {
  const initialState = {
    purchases: null,
    currentTrainingPurchase: null,
    loadingStatus: false,
    coachOrders: null
  };

  const state = {
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
  }

  const query = {
    page: Setting.DefaultStartPage,
    count: Setting.OrdersPerPageCount,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection
  }


  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = purchaseProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = purchaseProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set loadingStatus to true with uploadPurchases.pending', () => {
    const result = purchaseProcess.reducer(
      initialState,
      uploadPurchases.pending
    );

    expect(result.loadingStatus).toBe(true);
  });


  it('Should set purchases to newPurchases and loadingStatus to false with uploadPurchases.fulfilled', () => {
    const result = purchaseProcess.reducer(
      state,
      uploadPurchases.fulfilled(state.purchases, '', query),
    );

    expect(result.purchases).toEqual(state.purchases);
    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to true with addNewPurchase.pending', () => {
    const result = purchaseProcess.reducer(state, addNewPurchase.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentTrainingPurchase to newPurchase and set loading status to false and push newPurchase to purchases with addNewPurchase.fulfilled', () => {
    const newPurchase = generateMockPurchase();

    const result = purchaseProcess.reducer(
      state,
      addNewPurchase.fulfilled(
        newPurchase, '',
        {newPurchase: newPurchase, cb: () => 'fulfilled'}
      ));

    expect(result.currentTrainingPurchase).toEqual(newPurchase);
    expect(result.loadingStatus).toBe(false);
    expect(result.purchases?.entities).toContain(newPurchase);
  });

  it('Should set loadingStatus to false with addNewPurchase.rejected', () => {
    const result = purchaseProcess.reducer(state, addNewPurchase.rejected);

    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to true with uploadPurchaseByTrainingId.pending', () => {
    const result = purchaseProcess.reducer(state, uploadPurchaseByTrainingId.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentTrainingPurchase to purchase and set loading status to false with uploadPurchaseByTrainingId.fulfilled', () => {
    const purchase = generateMockPurchase();

    const result = purchaseProcess.reducer(
      state,
      uploadPurchaseByTrainingId.fulfilled(
        purchase,
        '',
        faker.string.uuid()
      ));

    expect(result.currentTrainingPurchase).toEqual(purchase);
    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to false with uploadPurchaseByTrainingId.rejected', () => {
    const result = purchaseProcess.reducer(state, uploadPurchaseByTrainingId.rejected);

    expect(result.loadingStatus).toBe(false);
  });

  it('Should set currentTrainingPurchase to purchase with reducePurchaseTrainings.fulfilled', () => {
    const purchase = generateMockPurchase();

    const result = purchaseProcess.reducer(
      state,
      reducePurchaseTrainings.fulfilled(
        purchase,
        '',
        {
          purchaseId: faker.string.uuid(),
          trainId: faker.string.uuid(),
          trainCount: 1
        }
      ));

    expect(result.currentTrainingPurchase).toEqual(purchase);
  });

  it('Should set loadingStatus to true with uploadCoachOrders.pending', () => {
    const result = purchaseProcess.reducer(initialState, uploadCoachOrders.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set coachOrders to state.coachOrders and set loading status to false with uploadCoachOrders.fulfilled', () => {
    const result = purchaseProcess.reducer(
      state,
      uploadCoachOrders.fulfilled(
        state.coachOrders,
        '',
        query
      ));

    expect(result.coachOrders).toEqual(state.coachOrders);
    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to false with uploadCoachOrders.rejected', () => {
    const result = purchaseProcess.reducer(state, uploadCoachOrders.rejected);

    expect(result.loadingStatus).toBe(false);
  });
});
