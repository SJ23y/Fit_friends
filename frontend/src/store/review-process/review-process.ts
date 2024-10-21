import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace /*Setting, SortBy, SortDirection*/ } from '../../consts';
import { ReviewProcess } from '../../types/state';
import {
  uploadReviews,
  addNewReview
} from './thunk-actions';

const initialState: ReviewProcess = {
  reviews: null,
};

const reviewProcess = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        if (state.reviews) {
          state.reviews.entities = [action.payload, ...state.reviews.entities];
        }
      })
  },
});

//const {  changeSort, changeFilters, changeCurrentPage } = ReviewProcess.actions;

export {   reviewProcess, /*changeSort, changeFilters, changeCurrentPage*/ };