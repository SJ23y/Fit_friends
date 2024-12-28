import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, Setting } from '../../consts';
import { MainProcess } from '../../types/state';
import {
  uploadTrainings,
  uploadFeaturedTrainings,
  uploadSpecialTrainings,
  uploadPopularTrainings
} from './thunk-actions';
import { Query } from '../../types/query';

const initialState: MainProcess = {
  trainings: null,
  featuredTrainings: null,
  loadingStatus: false,
  errorStatus: false,
  specialTrainings: null,
  popularTrainings: null,
  query: {
    count: Setting.TrainingsCatalogItemsPerPage,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection,
    page: Setting.DefaultStartPage,
    maxPrice: null,
    minPrice: null,
    maxCallories: null,
    minCallories: null,
    maxRating: null,
    minRating: null,
    type: null,
    free: null,
    durations: null
  }

};

const mainProcess = createSlice({
  name: NameSpace.MAIN,
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<Query>) => {
      state.query = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(uploadTrainings.pending, (state) => {
        if (!state.trainings) {
          state.loadingStatus = true;
        }
      })
      .addCase(uploadTrainings.fulfilled, (state, action) => {
        if (state.trainings && action.payload.currentPage > 1) {
          state.trainings = {
            ...action.payload,
            entities: [...state.trainings.entities, ...action.payload.entities]
          }
        } else {
          state.trainings = action.payload;
        }
        state.loadingStatus = false;
      })
      .addCase(uploadFeaturedTrainings.fulfilled, (state, action) => {
        state.featuredTrainings = action.payload;
      })
      .addCase(uploadSpecialTrainings.fulfilled, (state, action) => {
        state.specialTrainings = action.payload;
      })
      .addCase(uploadPopularTrainings.fulfilled, (state, action) => {
        state.popularTrainings = action.payload;
      })
  },
});

const { changeQuery } = mainProcess.actions;

export {   mainProcess, changeQuery };
