import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { AuthorizationStatus } from '../../consts';
import { generateMockUser } from '../../mock-data/mock-users';
import { userProcess } from './user-process';
import { checkAuthorization, getUserById, loginUser, logoutUser, registerUser, updateUser } from './thunk-actions';

describe('User-process slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
    error: null,
    loadingStatus: false,
    currentlyViewedUser: null
  };

  const state = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: generateMockUser(),
    error: {message: 'Error'},
    loadingStatus: false,
    currentlyViewedUser: generateMockUser()
  }

  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('Should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('Should set loadingStatus to true with checkAuthorization.pending', () => {
    const result = userProcess.reducer(state, checkAuthorization.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set user to mockUser and loadingStatus to false and AuthorizationStatus to Auth with checkAuthorization.fulfilled', () => {
    const mockUser = generateMockUser();

    const result = userProcess.reducer(
      state,
      checkAuthorization.fulfilled(
        mockUser,
        '',
        undefined
      ));

    expect(result.loadingStatus).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('Should set user to null and set loadingStatus to false and AuthorizationStatus to NoAuth with checkAuthorization.rejected', () => {
    const result = userProcess.reducer(
      state,
      checkAuthorization.rejected);

    expect(result.loadingStatus).toBe(false);
    expect(result.user).toEqual(null);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set loadingStatus to true with loginUser.pending', () => {
    const result = userProcess.reducer(state, loginUser.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set user to mockUser and loadingStatus to false and AuthorizationStatus to Auth and error to null with loginUser.fulfilled', () => {
    const mockUser = generateMockUser();

    const result = userProcess.reducer(
      state,
      loginUser.fulfilled(
        {
          ...mockUser,
          accessToken: faker.internet.jwt(),
          refreshToken: faker.internet.jwt()
        },
        '',
        {email: faker.internet.email(), password: faker.internet.password()}
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('Should set error to loginError and set loadingStatus to false and AuthorizationStatus to NoAuth with loginUser.rejected', () => {
    const loginError = {name: 'loginError', message: 'User not found'}

    const result = userProcess.reducer(
      state,
      loginUser.rejected(
        loginError,
        ' ',
        {email: faker.internet.email(), password: faker.internet.password()}
      ));

    expect(result.loadingStatus).toBe(false);
    expect(result.error).toEqual(loginError);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set loadingStatus to true with registerUser.pending', () => {
    const result = userProcess.reducer(state, registerUser.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set user to mockUser and loadingStatus to false and AuthorizationStatus to Auth and error to null with registerUser.fulfilled', () => {
    const mockUser = generateMockUser();
    const data = new FormData()

    const result = userProcess.reducer(
      state,
      registerUser.fulfilled(
        mockUser,
        '',
        data
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('Should set error to registerError and set loadingStatus to false and AuthorizationStatus to NoAuth with registerUser.rejected', () => {
    const registerError = {name: 'registerError', message: 'User with this email elready exist'}
    const data = new FormData();

    const result = userProcess.reducer(
      state,
      registerUser.rejected(registerError, '', data));

    expect(result.loadingStatus).toBe(false);
    expect(result.error).toEqual(registerError);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set AuthorizationStatus to NoAuth and user to null with logoutUser.fulfilled', () => {
    const result = userProcess.reducer(
      state,
      logoutUser.fulfilled);

    expect(result.user).toEqual(null);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('Should set loadingStatus to true with updateUser.pending', () => {
    const result = userProcess.reducer(state, updateUser.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set user to mockUser and loadingStatus to false and error to null with updateUser.fulfilled', () => {
    const mockUser = generateMockUser();

    const result = userProcess.reducer(
      state,
      updateUser.fulfilled(
        mockUser,
        '',
        {user: mockUser, cb: () => 'Updated user'}
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.user).toEqual(mockUser);
  });

  it('Should set loadingStatus to false with updateUser.rejected', () => {
    const result = userProcess.reducer(
      state,
      updateUser.rejected);

    expect(result.loadingStatus).toBe(false);
  });

  it('Should set loadingStatus to true with getUserById.pending', () => {
    const result = userProcess.reducer(state, getUserById.pending);

    expect(result.loadingStatus).toBe(true);
  });

  it('Should set currentlyViewedUser to mockUser and loadingStatus to false and error to null with getUserById.fulfilled', () => {
    const mockUser = generateMockUser();

    const result = userProcess.reducer(
      state,
      getUserById.fulfilled(
        mockUser,
        '',
        faker.string.uuid()
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.currentlyViewedUser).toEqual(mockUser);
  });

  it('Should set loadingStatus to false with getUserById.rejected', () => {
    const result = userProcess.reducer(
      state,
      getUserById.rejected);

    expect(result.loadingStatus).toBe(false);
  });

});
