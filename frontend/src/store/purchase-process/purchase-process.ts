import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace /*Setting, SortBy, SortDirection*/ } from '../../consts';
import { PurchaseProcess } from '../../types/state';
import {
  addNewPurchase,
  reducePurchaseTrainings,
  uploadPurchaseByTrainingId,
  uploadPurchases
} from './thunk-actions';

const initialState: PurchaseProcess = {
  purchases: null,
  currentTrainingPurchase: null,
};

const purchaseProcess = createSlice({
  name: NameSpace.PURCHASE,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadPurchases.fulfilled, (state, action) => {
        if (state.purchases && action.payload.currentPage > 1) {
          state.purchases = {
            ...action.payload,
            entities: [...state.purchases.entities, ...action.payload.entities]
          }
        } else {
          state.purchases = action.payload;
        }
      })
      .addCase(addNewPurchase.fulfilled, (state, action) => {
        if (state.purchases) {
          state.purchases.entities = [action.payload, ...state.purchases.entities];
        }
        state.currentTrainingPurchase = action.payload;
      })
      .addCase(uploadPurchaseByTrainingId.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
      })
      .addCase(uploadPurchaseByTrainingId.rejected, (state) => {
        state.currentTrainingPurchase = null;
      })
      .addCase(reducePurchaseTrainings.fulfilled, (state, action) => {
        state.currentTrainingPurchase = action.payload;
      })
  },
});

//const {  changeSort, changeFilters, changeCurrentPage } = ReviewProcess.actions;

export {   purchaseProcess, /*changeSort, changeFilters, changeCurrentPage*/ };
