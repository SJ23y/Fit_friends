import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, Setting, /*Setting, SortBy, SortDirection*/ } from '../../consts';
import { MainProcess } from '../../types/state';
import {
  uploadTrainings,
  uploadFeaturedTrainings,
  uploadSpecialTrainings,
  uploadPopularTrainings
} from './thunk-actions';

const initialState: MainProcess = {
  trainings: null,
  featuredTrainings: null,
  errorStatus: false,
  specialTrainings: null,
  popularTrainings: null,
  query: {
    count: Setting.DefaultTrainingPerPage,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection,
    page: Setting.DefaultStartPage
  }

};

const mainProcess = createSlice({
  name: NameSpace.MAIN,
  initialState,
  reducers: {
    /*changeSort: (state, action: PayloadAction<{ sortBy: SortBy, sortDirection: SortDirection }>) => {
      state.query.sortBy = action.payload.sortBy;
      state.query.sortDirection = action.payload.sortDirection;
    },
    changeFilters: (state, action: PayloadAction<{ selectedTypes: string[], selectedStrings: number[] }>) => {
      state.query.types = action.payload.selectedTypes;
      state.query.strings = action.payload.selectedStrings;
      state.query.page = Setting.DefaultStartPage;
    },
    changeCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.query.page = action.payload.page;
    }*/
  },
  extraReducers(builder) {
    builder
      .addCase(uploadTrainings.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload;
      })
      .addCase(uploadTrainings.rejected, (state) => {
        state.errorStatus = true;
      })
      .addCase(uploadFeaturedTrainings.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadFeaturedTrainings.fulfilled, (state, action) => {
        state.featuredTrainings = action.payload;
      })
      .addCase(uploadFeaturedTrainings.rejected, (state) => {
        state.errorStatus = true;
      })
      .addCase(uploadSpecialTrainings.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadSpecialTrainings.fulfilled, (state, action) => {
        state.specialTrainings = action.payload;
      })
      .addCase(uploadSpecialTrainings.rejected, (state) => {
        state.errorStatus = true;
      })
      .addCase(uploadPopularTrainings.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadPopularTrainings.fulfilled, (state, action) => {
        state.popularTrainings = action.payload;
      })
      .addCase(uploadPopularTrainings.rejected, (state) => {
        state.errorStatus = true;
      })
  },
});

//const {  changeSort, changeFilters, changeCurrentPage } = mainProcess.actions;

export {   mainProcess, /*changeSort, changeFilters, changeCurrentPage*/ };
