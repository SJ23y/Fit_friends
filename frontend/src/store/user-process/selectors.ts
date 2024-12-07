import { SerializedError } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
import { UserData } from '../../types/auth';
import { State } from '../../types/state';
import { PaginatedResult } from '../../types/paginatedResult';
import { Query } from '../../types/query';

const checkAuthentication = (state: Pick<State, NameSpace.USER>): boolean => state[NameSpace.USER].authorizationStatus === AuthorizationStatus.Auth;

const getUserInfo = (state: Pick<State, NameSpace.USER>): UserData | null =>
  state[NameSpace.USER].user;

const getUserError = (state: Pick<State, NameSpace.USER>): SerializedError | null =>
  state[NameSpace.USER].error;

const getUserLoadingStatus = (state: Pick<State, NameSpace.USER>): boolean =>
  state[NameSpace.USER].loadingStatus;

const getUserCardInfo = (state: Pick<State, NameSpace.USER>): UserData | null =>
  state[NameSpace.USER].currentlyViewedUser;

const getUsers = (state: Pick<State, NameSpace.USER>): PaginatedResult<UserData> | null =>
  state[NameSpace.USER].users;

const getUsersQuery = (state: Pick<State, NameSpace.USER>): Query =>
  state[NameSpace.USER].query;

export { getUserLoadingStatus, getUserError, checkAuthentication, getUserInfo, getUserCardInfo, getUsers,getUsersQuery };
