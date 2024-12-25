import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mock-data/mock-component';
import Login from './login';
import { AuthorizationStatus, Setting } from '../../consts';

describe('Page: Login', () => {
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
    const { withStoreComponent } = withStore(<Login />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const headlineText = 'Вход';
    const loginText = 'E-mail';
    const passwordText = 'Пароль';
    const buttontext = 'Продолжить'

    render(preparedComponent);

    expect(screen.getByText(headlineText)).toBeInTheDocument();
    expect(screen.getByText(loginText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
    expect(screen.getByText(buttontext)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'SJ';
    const expectedPasswordValue = '123456';    

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});