import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, Setting, SortBy, SortDirection } from '../../consts';
import { MainProcess } from '../../types/state';
import {
  uploadGuitars,
} from './thunk-actions';

const initialState: MainProcess = {
  initialGuitars: null,
  errorStatus: false,
  query: {
    count: Setting.DefaultGuitarPerPage,
    sortBy: Setting.DefaultSortBy,
    sortDirection: Setting.DefaultSortDirection,
    page: Setting.DefaultStartPage,
    types: [],
    strings: []
  }

};

const mainProcess = createSlice({
  name: NameSpace.GUITARS,
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<{ sortBy: SortBy, sortDirection: SortDirection }>) => {
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(uploadGuitars.pending, (state) => {
        state.errorStatus = false;
      })
      .addCase(uploadGuitars.fulfilled, (state, action) => {
        state.initialGuitars = action.payload;
      })
      .addCase(uploadGuitars.rejected, (state) => {
        state.errorStatus = true;
      });
  },
});

const {  changeSort, changeFilters, changeCurrentPage } = mainProcess.actions;

export {  changeSort, mainProcess, changeFilters, changeCurrentPage };
