import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { addNewTraining, uploadTrainingById } from './thunk-actions';
import { TrainingProcess } from '../../types/state';
import { Training } from '../../types/trainings';

const initialState: TrainingProcess = {
  currentTraining: null,
  loadingStatus: false
};

const trainingProcess = createSlice({
  name: NameSpace.TRAINING,
  initialState,
  reducers: {
    changeCurrentTraining: (state, action: PayloadAction<Training>) => {
      console.log('[Training process] action.payload', action.payload);
      state.currentTraining = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadTrainingById.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(uploadTrainingById.fulfilled, (state, action) => {
        state.loadingStatus = false;
        if (action.payload) {
          state.currentTraining = action.payload;
        }
      })
      .addCase(addNewTraining.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(addNewTraining.fulfilled, (state, action) => {
        state.loadingStatus = false;
        if (action.payload) {
          state.currentTraining = action.payload;
        }
      })
  },
});

const { changeCurrentTraining } = trainingProcess.actions;

export { trainingProcess, changeCurrentTraining };
