import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { userProcess } from './user-process/user-process';
import { trainingProcess } from './training-process/training-process';
import { mainProcess } from './main-process/main-process';

const rootReducer = combineReducers({
  [NameSpace.USER]: userProcess.reducer,
  [NameSpace.TRAINING]: trainingProcess.reducer,
  [NameSpace.MAIN]: mainProcess.reducer,
});

export { rootReducer };
