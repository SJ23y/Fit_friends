import { AuthorizationStatus, NameSpace, Setting } from '../../consts';
import { generateMockUser } from '../../mock-data/mock-users';
import { checkAuthentication, getUserCardInfo, getUserError, getUserInfo, getUserLoadingStatus } from './selectors';

describe('User-process selectors', () => {
  const state = {
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: generateMockUser(),
      error: null,
      loadingStatus: false,
      currentlyViewedUser: generateMockUser(),
      users: null,
      query: {
              count: Setting.MaxUserCatalogCount,
              sortBy: Setting.DefaultSortBy,
              sortDirection: Setting.DefaultSortDirection,
              page: Setting.DefaultStartPage
            }
      }
  };

  it('Should return authentication status from the State', () => {
    const { authorizationStatus } = state[NameSpace.USER];

    const result = checkAuthentication(state);

    expect(result).toEqual(authorizationStatus === AuthorizationStatus.Auth);
  });

  it('Should return user from the State', () => {
    const { user } = state[NameSpace.USER];

    const result = getUserInfo(state);

    expect(result).toEqual(user);
  });

  it('Should return loadingStatus from the State', () => {
    const { loadingStatus } = state[NameSpace.USER];

    const result = getUserLoadingStatus(state);

    expect(result).toEqual(loadingStatus);
  });

  it('Should return currentlyViewedUser from the State', () => {
    const { currentlyViewedUser } = state[NameSpace.USER];

    const result = getUserCardInfo(state);

    expect(result).toEqual(currentlyViewedUser);
  });

  it('Should return error from the State', () => {
    const { error } = state[NameSpace.USER];

    const result = getUserError(state);

    expect(result).toEqual(error);
  });
});
