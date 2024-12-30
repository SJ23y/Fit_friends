import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { AuthorizationStatus, RequestStatus, Setting } from '../../consts';
import { generateMockUser } from '../../mock-data/mock-users';
import { addFriendToUser, addNewRequest, changeUserQuery, deleteFriendFromUser, setCurrentlyViewedUser, userProcess } from './user-process';
import { addNewSertificate, addSubscription, checkAuthorization, deleteSertificate, deleteSubscription, getUserById, loginUser, logoutUser, registerUser, updateSertificate, updateUser, uploadUsers } from './thunk-actions';

describe('User-process slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      error: null,
      loadingStatus: false,
      currentlyViewedUser: null,
      users: null,
      query: {
        count: Setting.MaxUserCatalogCount,
        sortBy: Setting.DefaultSortBy,
        sortDirection: Setting.DefaultSortDirection,
        page: Setting.DefaultStartPage
      }
  };

  const newFriend = {
    userId: faker.string.uuid(),
    friendId: faker.string.uuid()
  }

  const newSubscription = {
    subscribeById: faker.string.uuid(),
    subscribeByName: faker.person.fullName(),
    subscribeByEmail: faker.internet.email(),
    subscribeToId: faker.string.uuid(),
    subscribeToName: faker.person.fullName()
  }

  const state = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: {...generateMockUser()},
    error: {message: 'Error'},
    loadingStatus: false,
    currentlyViewedUser: {...generateMockUser()},
    users: {
      entities: Array.from({length: 5}, () => generateMockUser()),
      totalPages: 2,
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 6
    },
    query: {
      count: Setting.MaxUserCatalogCount,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection,
      page: Setting.DefaultStartPage
    }
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

  it('Should set currentlyViewedUser to newUser with setCurrentlyViewedUser', () => {
    const newUser = generateMockUser();

    const result = userProcess.reducer(state, setCurrentlyViewedUser(newUser));

    expect(result.currentlyViewedUser).toEqual(newUser);
  });

  it('Should add requestData to state.user.requests with addNewRequest', () => {
    const requestData = {
      senderId: state.user.id,
      recieverId: faker.string.uuid(),
      status: RequestStatus.PENDING
    }
    const result = userProcess.reducer(state, addNewRequest(requestData));

    expect(result.user?.requests).toContain(requestData);
  });

  it('Should add requestData to state.user.receivedRequests with addNewRequest', () => {
    const requestData = {
      recieverId: state.user.id,
      senderId: faker.string.uuid(),
      status: RequestStatus.PENDING
    }
    const result = userProcess.reducer(state, addNewRequest(requestData));

    expect(result.user?.recievedRequests).toContain(requestData);
  });

  it('Should set query.page to state.query.page with changeUserQuery', () => {
    const query = {
      page: faker.number.int()
    }
    const result = userProcess.reducer(state, changeUserQuery(query));

    expect(result.query.page).toBe(query.page);
  });

  it('Should set newFriend to state.currentlyViewedUser.friends  with addFriendToUser', () => {

    const result = userProcess.reducer(state, addFriendToUser(newFriend));

    expect(result.currentlyViewedUser?.friends).toContainEqual(newFriend);
  });

  it('Should delete newFriend from state.currentlyViewedUser.friends with deleteFriendFromUser', () => {
    userProcess.reducer(state, addFriendToUser(newFriend));
    const result = userProcess.reducer(state, deleteFriendFromUser(newFriend.friendId));

    expect(result.currentlyViewedUser?.friends).not.toContainEqual(newFriend);
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
    const data = new FormData()

    const result = userProcess.reducer(
      state,
      updateUser.fulfilled(
        mockUser,
        '',
        {user: data, cb: () => 'Updated user'}
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

  it('Should set mockUsers to state.users and loadingStatus to false and error to null with uploadUsers.fulfilled', () => {
    const mockUsers = {
      entities: Array.from({length: 5}, () => generateMockUser()),
        totalPages: 2,
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 6
      }

    const query = {
      count: Setting.FriendsPerPageCount,
      page: Setting.DefaultStartPage,
      sortBy: Setting.DefaultSortBy,
      sortDirection: Setting.DefaultSortDirection
    };

    const result = userProcess.reducer(
      state,
      uploadUsers.fulfilled(
        mockUsers,
        '',
        query
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.users).toEqual(mockUsers);
  });

  it('Should set newSubscription to state.user.subscriptions and loadingStatus to false and error to null with addSubscription.fulfilled', () => {
        const result = userProcess.reducer(
      state,
      addSubscription.fulfilled(
        newSubscription,
        '',
        newSubscription
      ));

    expect(result.error).toBe(null);
    expect(result.loadingStatus).toBe(false);
    expect(result.user?.subscriptions).toContain(newSubscription);
  });

  it('Should delete newSubscription from state.user.subscriptions and set loadingStatus to false and error to null with deleteSubscription.fulfilled', () => {
    userProcess.reducer(
      state,
      addSubscription.fulfilled(
        newSubscription,
        '',
        newSubscription
      ));

    const result = userProcess.reducer(
    state,
    deleteSubscription.fulfilled(
      newSubscription.subscribeToId,
      '',
      newSubscription.subscribeToId
    ));

  expect(result.error).toBe(null);
  expect(result.loadingStatus).toBe(false);
  expect(result.user?.subscriptions).not.toContain(newSubscription);
  });

  it('Should add newSertificate to state.user.sertificates with addNewSertificate.fulfilled', () => {
    const newSertificate = faker.system.filePath();
    const formData = new FormData();

    const result = userProcess.reducer(
      state,
      addNewSertificate.fulfilled(
        newSertificate,
        '',
        formData
      ));

    expect(result.user?.sertificates).toContain(newSertificate);
  });

  it('Should delete newSertificate from state.user.sertificates with deleteSertificate.fulfilled', () => {
    const newSertificate = faker.system.filePath();
    const formData = new FormData();

    userProcess.reducer(
      state,
      addNewSertificate.fulfilled(
        newSertificate,
        '',
        formData
      ));

    const result = userProcess.reducer(
      state,
      deleteSertificate.fulfilled(
        newSertificate,
        '',
        newSertificate
    ));

    expect(result.user?.sertificates).not.toContain(newSertificate);
  });

  it('Should delete oldSertificate and add newSertificate from state.user.sertificates with updateSertificate.fulfilled', () => {
    const setrificates = {
      oldSertificate: faker.system.filePath(),
      newSertificate: faker.system.filePath()
    };
    const formData = new FormData();

    userProcess.reducer(
      state,
      addNewSertificate.fulfilled(
        setrificates.oldSertificate,
        '',
        formData
      ));

    const result = userProcess.reducer(
      state,
      updateSertificate.fulfilled(
        setrificates,
        '',
        formData
    ));

    expect(result.user?.sertificates).toContain(setrificates.newSertificate);
    expect(result.user?.sertificates).not.toContain(setrificates.oldSertificate);
  });

});
