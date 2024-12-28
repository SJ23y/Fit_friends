import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../mock-data/mock-component';
import { Gender, LOCATIONS, Role } from '../../consts';
import CustomSelect from './custom-select';

describe('Component: CustomSelect', () => {
    const componentProps = {
      title: 'title',
      items: [...LOCATIONS],
      disableStatus: false,
      defaultValue: LOCATIONS[0],
      cb: () => 'void',
      additionalClassName: ''
    }
    
    const preparedComponent = withHistory(<CustomSelect {...componentProps} />);

  it('should render correctly default value props', () => {    

    render(preparedComponent);

    expect(screen.getByText(componentProps.defaultValue)).toBeInTheDocument();
  });

  it('should render correctly title', () => {    

    render(preparedComponent);

    expect(screen.getByText(componentProps.title)).toBeInTheDocument();
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