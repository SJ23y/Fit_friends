import { createSlice } from '@reduxjs/toolkit';
import { NameSpace /*Setting, SortBy, SortDirection*/ } from '../../consts';
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
  loadinStatus: false,
  coachOrders: null
};

const purchaseProcess = createSlice({
  name: NameSpace.PURCHASE,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadPurchases.pending, (state) => {
        state.loadinStatus = true;
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
        state.loadinStatus = false;
      })
      .addCase(addNewPurchase.pending, (state) => {
        state.loadinStatus = true;
      })
      .addCase(addNewPurchase.fulfilled, (state, action) => {
        if (state.purchases) {
          state.purchases.entities = [action.payload, ...state.purchases.entities];
        }
        state.currentTrainingPurchase = action.payload;
        state.loadinStatus = false;
      })
      .addCase(addNewPurchase.rejected, (state) => {
        state.loadinStatus = false;
      })
      .addCase(uploadPurchaseByTrainingId.pending, (state) => {
        state.loadinStatus = true
      })
      .addCase(uploadPurchaseByTrainingId.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
        state.loadinStatus = false
      })
      .addCase(uploadPurchaseByTrainingId.rejected, (state) => {
        state.currentTrainingPurchase = null;
        state.loadinStatus = false;
      })
      .addCase(reducePurchaseTrainings.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
      })
      .addCase(uploadCoachOrders.pending, (state) => {
        state.loadinStatus = true
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
        state.loadinStatus = false
      })
      .addCase(uploadCoachOrders.rejected, (state) => {
        state.currentTrainingPurchase = null;
        state.loadinStatus = false;
      })
  },
});

export {   purchaseProcess };
