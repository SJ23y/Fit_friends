import { SerializedError, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts';
import { store } from '../store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { Friend, UserData } from './auth';
import { Training, Trainings } from './trainings';
import { PaginatedResult, TrainingPaginatedResult } from './paginatedResult';
import { Query } from './query';
import { Review } from './review';
import { Order, Purchase } from './purchase';
import { Notification } from './notifcation';

export type MainProcess = {
  trainings: null | TrainingPaginatedResult<Training>;
  featuredTrainings: null | Trainings;
  specialTrainings: null | Trainings;
  popularTrainings: null | Trainings;
  errorStatus: boolean;
  loadingStatus: boolean;
  query: Query;
};

export type NotificationProcess = {
  notifications: null | Notification[];
  loadingStatus: boolean;
};

export type ReviewProcess = {
  reviews: null | PaginatedResult<Review>;
};

export type PurchaseProcess = {
  purchases: null | PaginatedResult<Purchase>;
  currentTrainingPurchase: null | Purchase;
  coachOrders: null | PaginatedResult<Order>;
  loadingStatus: boolean;
};

export type TrainingProcess = {
  currentTraining: null | Training;
  loadingStatus: boolean
};

export type FriendsProcess = {
  friends: null | PaginatedResult<Friend>;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: SerializedError | null;
  loadingStatus: boolean;
  currentlyViewedUser: UserData | null;
  users: PaginatedResult<UserData> | null;
  query: Query;
};

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
