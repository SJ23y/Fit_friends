import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Gender, Role, Setting } from '../../consts';
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

  it('should render correctly when user enter information in the text input fields', async () => {
    //const avatarTestId = 'avatarElement';    
    //const avatarExpectedValue = new File(['hello'], 'hello.png', {type: 'image/png'})
    const nameTestId = 'nameElement';
    const nameExpectedValue = 'Pedro';
    const emailTestId = 'emailElement';
    const emailExpectedValue = 'example@mail.com';  
    const passwordTestId = 'passwordElement';
    const passwordExpectedValue = '111111'; 

    render(preparedComponent);
    
    await userEvent.type(
      screen.getByTestId(nameTestId),
      nameExpectedValue,
    );
    await userEvent.type(
        screen.getByTestId(emailTestId),
        emailExpectedValue,
    );
    await userEvent.type(
        screen.getByTestId(passwordTestId),
        passwordExpectedValue,
      );
    
      
    /*expect(avatarElement.files?.[0]).toBe(avatarExpectedValue)
    expect(avatarElement.files).toHaveLength(1)*/
    expect(screen.getByDisplayValue(nameExpectedValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(emailExpectedValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(passwordExpectedValue)).toBeInTheDocument();
  });  

  it('should render correctly when user select gender', async () => {  
    render(preparedComponent);

    await userEvent.click(screen.getByDisplayValue(Gender.FEMALE));    
    expect(screen.getByDisplayValue(Gender.FEMALE)).toBeChecked();

    await userEvent.click(screen.getByDisplayValue(Gender.MALE));    
    expect(screen.getByDisplayValue(Gender.MALE)).toBeChecked();

    await userEvent.click(screen.getByDisplayValue(Gender.NONE));    
    expect(screen.getByDisplayValue(Gender.NONE)).toBeChecked();
  });

  it('should render correctly when user select role', async () => {  
    render(preparedComponent);
    

    await userEvent.click(screen.getByDisplayValue(Role.COACH));    
    expect(screen.getByDisplayValue(Role.COACH)).toBeChecked();

    await userEvent.click(screen.getByDisplayValue(Role.USER));    
    expect(screen.getByDisplayValue(Role.USER)).toBeChecked();
  });

  it('should render correctly when user checked user-agreement', async () => {
    const expectedValue = 'user-agreement';
    
    render(preparedComponent);

    await userEvent.click(screen.getByDisplayValue(expectedValue));    
    expect(screen.getByDisplayValue(expectedValue)).toBeChecked();

    await userEvent.click(screen.getByDisplayValue(expectedValue));    
    expect(screen.getByDisplayValue(expectedValue)).not.toBeChecked();
  });
});