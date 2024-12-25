import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Setting } from '../../consts';
import IntroPage from './intro.page';

describe('Page: Intro', () => {
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
    const { withStoreComponent } = withStore(<IntroPage />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {    
    const loginButtontext = /Вход/i
    const registerButtontext = /Регистрация/i

    render(preparedComponent);

    expect(screen.getByText(loginButtontext)).toBeInTheDocument();
    expect(screen.getByText(registerButtontext)).toBeInTheDocument();
  });
});