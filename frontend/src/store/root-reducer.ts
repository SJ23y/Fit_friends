import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { userProcess } from './user-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.USER]: userProcess.reducer,
});

export { rootReducer };
