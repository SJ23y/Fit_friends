import { SerializedError, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts';
import { store } from '../store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { UserData } from './auth';
import { Training, Trainings } from './trainings';
import { PaginatedResult } from './paginatedResult';
import { Query } from './query';

export type MainProcess = {
  trainings: null | PaginatedResult<Training>;
  featuredTrainings: null | Trainings;
  specialTrainings: null | Trainings;
  popularTrainings: null | Trainings;
  errorStatus: boolean;
  query: Query;
};

export type TrainingProcess = {
  currentTraining: null | Training;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: SerializedError | null;
};

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
