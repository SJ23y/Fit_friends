import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { userProcess } from './user-process/user-process';
import { trainingProcess } from './training-process/training-process';
import { mainProcess } from './main-process/main-process';
import { reviewProcess } from './review-process/review-process';
import { purchaseProcess } from './purchase-process/purchase-process';
import { friendProcess } from './friends-process/friends-process';
import { notificationProcess } from './notification-process/notification-process';

const rootReducer = combineReducers({
  [NameSpace.USER]: userProcess.reducer,
  [NameSpace.TRAINING]: trainingProcess.reducer,
  [NameSpace.MAIN]: mainProcess.reducer,
  [NameSpace.REVIEW]: reviewProcess.reducer,
  [NameSpace.PURCHASE]: purchaseProcess.reducer,
  [NameSpace.FRIEND]: friendProcess.reducer,
  [NameSpace.NOTIFICATION]: notificationProcess.reducer,
});

export { rootReducer };
