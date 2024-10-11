import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { uploadGuitarById } from './thunk-actions';
import { GuitarProcess } from '../../types/state';
import { Guitar } from '../../types/guitars';
import { updateGuitar } from '../thunk-actions';

const initialState: GuitarProcess = {
  currentGuitar: null
};

const guitarProcess = createSlice({
  name: NameSpace.GUITAR,
  initialState,
  reducers: {
    changeCurrentGuitar: (state, action: PayloadAction<Guitar>) => {
      console.log('[guitar process] ction.payload', action.payload);
      state.currentGuitar = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadGuitarById.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentGuitar = action.payload;
        }
      })
      .addCase(updateGuitar.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentGuitar = action.payload;
        }
      });
      ;
  },
});

const { changeCurrentGuitar } = guitarProcess.actions;

export { guitarProcess, changeCurrentGuitar };
