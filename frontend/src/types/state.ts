import { SerializedError, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortBy, SortDirection } from '../consts';
import { store } from '../store';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { UserData } from './auth';
import { Guitar, Guitars } from './guitars';
import { GuitarQuery } from './query';

export type MainProcess = {
  initialGuitars: null | Guitars;
  errorStatus: boolean;
  query: GuitarQuery;
};

export type GuitarProcess = {
  currentGuitar: null | Guitar;
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
