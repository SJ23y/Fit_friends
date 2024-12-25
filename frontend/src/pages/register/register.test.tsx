import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, LOCATIONS, Setting } from '../../consts';
import Register from './register';

describe('Page: Register', () => {
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
    const { withStoreComponent } = withStore(<Register />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const headlineText = /Регистрация/i;
    const avatarLabelText = /Загрузите фото профиля/i;
    const nameLabelText = /Имя/i;
    const emailLabelText = /E-mail/i;
    const birthdayLabelText = /Дата рождения/i;
    const locationLabelText = /Ваша локация/i;
    const passwordLabelText = /Пароль/i;
    const roleLabelText = /Выберите роль/i;
    const confidentialCheckboxText = /Я соглашаюсь с/i;
    const buttontext = 'Продолжить'

    render(preparedComponent);

    expect(screen.getByText(headlineText)).toBeInTheDocument();
    expect(screen.getByText(avatarLabelText)).toBeInTheDocument();
    expect(screen.getByText(nameLabelText)).toBeInTheDocument();
    expect(screen.getByText(emailLabelText)).toBeInTheDocument();
    expect(screen.getByText(birthdayLabelText)).toBeInTheDocument();
    expect(screen.getByText(locationLabelText)).toBeInTheDocument();
    expect(screen.getByText(passwordLabelText)).toBeInTheDocument();
    expect(screen.getByText(roleLabelText)).toBeInTheDocument();
    expect(screen.getByText(confidentialCheckboxText)).toBeInTheDocument();
    expect(screen.getByText(buttontext)).toBeInTheDocument();
  });

  it('should render correctly when user enter information in the input fields', async () => {
    const avatarTestId = 'avatarElement';    
    const avatarExpectedValue = new File(['hello'], 'hello.png', {type: 'image/png'})
    const nameTestId = 'nameElement';
    const nameExpectedValue = 'Pedro';
    const emailTestId = 'emailElement';
    const emailExpectedValue = 'example@mail.com';
    const birthdayTestId = 'birthdayElement';
    const birthdayExpectedValue = '19.02.2023';
    const locationTestId = 'locationElement';
    const passwordTestId = 'passwordElement';
    const passwordExpectedValue = '111111';
    const genderTestId = 'genderElement';
    const roleTestId = 'roleElement';   

    render(preparedComponent);
    const avatarElement = screen.getByTestId(avatarTestId) as HTMLInputElement;
    await userEvent.upload(
      avatarElement,
      avatarExpectedValue,
    );
    await userEvent.type(
      screen.getByTestId(nameTestId),
      nameExpectedValue,
    );
    await userEvent.type(
        screen.getByTestId(emailTestId),
        emailExpectedValue,
    );
    await userEvent.type(
      screen.getByTestId(birthdayTestId),
      birthdayExpectedValue,
    );
    await userEvent.selectOptions(
        screen.getByText('Удельная'),
        'Удельная'
    );
    await userEvent.deselectOptions(
        screen.getByText('Удельная'),
        'Удельная'
    );
    await userEvent.selectOptions(
        screen.getByText('Пионерская'),
        'Пионерская'
    );
    await userEvent.type(
        screen.getByTestId(passwordTestId),
        passwordExpectedValue,
      );    

    expect(avatarElement.files?.[0]).toBe(avatarExpectedValue)
    expect(avatarElement.files).toHaveLength(1)
    expect(screen.getByDisplayValue(nameExpectedValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(emailExpectedValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(birthdayExpectedValue)).toBeInTheDocument();
    expect(screen.getByText<HTMLOptionElement>('Пионерская').selected).toBe(true)
    expect(screen.getByText<HTMLOptionElement>('Удельная').selected).toBe(false)
    expect(screen.getByDisplayValue(passwordExpectedValue)).toBeInTheDocument();
  });
});