import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { PurchaseProcess } from '../../types/state';
import {
  addNewPurchase,
  reducePurchaseTrainings,
  uploadCoachOrders,
  uploadPurchaseByTrainingId,
  uploadPurchases
} from './thunk-actions';

const initialState: PurchaseProcess = {
  purchases: null,
  currentTrainingPurchase: null,
  loadingStatus: false,
  coachOrders: null
};

const purchaseProcess = createSlice({
  name: NameSpace.PURCHASE,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadPurchases.pending, (state) => {
        if (!state.purchases) {
          state.loadingStatus = true;
        }
      })
      .addCase(uploadPurchases.fulfilled, (state, action) => {
        if (state.purchases && action.payload.currentPage > 1) {
          state.purchases = {
            ...action.payload,
            entities: [...state.purchases.entities, ...action.payload.entities]
          }
        } else {
          state.purchases = action.payload;
        }
        state.loadingStatus = false;
      })
      .addCase(addNewPurchase.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(addNewPurchase.fulfilled, (state, action) => {
        if (state.purchases) {
          state.purchases.entities = [action.payload, ...state.purchases.entities];
        }
        state.currentTrainingPurchase = action.payload;
        state.loadingStatus = false;
      })
      .addCase(addNewPurchase.rejected, (state) => {
        state.loadingStatus = false;
      })
      .addCase(uploadPurchaseByTrainingId.pending, (state) => {
        state.loadingStatus = true
      })
      .addCase(uploadPurchaseByTrainingId.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
        state.loadingStatus = false
      })
      .addCase(uploadPurchaseByTrainingId.rejected, (state) => {
        state.loadingStatus = false;
      })
      .addCase(reducePurchaseTrainings.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
      })
      .addCase(uploadCoachOrders.pending, (state) => {
        if (!state.coachOrders) {
          state.loadingStatus = true;
        }
      })
      .addCase(uploadCoachOrders.fulfilled, (state, action) => {
        if (state.coachOrders && action.payload.currentPage > 1) {
          state.coachOrders = {
            ...action.payload,
            entities: [...state.coachOrders.entities, ...action.payload.entities]
          }
        } else {
          state.coachOrders = action.payload;
        }
        state.loadingStatus = false
      })
      .addCase(uploadCoachOrders.rejected, (state) => {
        state.loadingStatus = false;
      })
  },
});

export { purchaseProcess };
