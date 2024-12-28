import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Setting } from '../../consts';
import CoachInfoCard from './coach-info-card';
import { generateMockUser } from '../../mock-data/mock-users';
import { generateMockCoachQuestionnaire } from '../../mock-data/mock-questionnaire';

describe('Component: CoachInfoCard', () => {
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
    const componentProps = {
      user: generateMockUser(),
      onAddFriend: () => '',
      onDeleteFriend: () => '',
      isFriend: true,
      isReadyForTraining: true,
      loggedUserId: 'string',
      hasSubscription: true,
      onSubscriptionChange: (coachId: string, coachName: string) => 'void'
    }

    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);

  it('check for keywords', () => {
    const headlineText = /Карточка пользователя роль тренер/i;
    const notificationLabelText = /Получать уведомление на почту о новой тренировке/i
   
    render(preparedComponent);

    expect(screen.getByText(headlineText)).toBeInTheDocument();
    expect(screen.getByText(notificationLabelText)).toBeInTheDocument();
  });

  it('should render correct text information about user', async () => {
    
    render(preparedComponent);

    expect(screen.getByText(componentProps.user.name)).toBeInTheDocument();
    expect(screen.getByText(componentProps.user.location)).toBeInTheDocument();
    expect(screen.getByText(componentProps.user.description)).toBeInTheDocument();
    componentProps.user.questionnaire.trainType.forEach((type) => {
        expect(screen.getByText(`#${type}`)).toBeInTheDocument();
    })
  });
  
  it('should render correct with individualTrainings false', async () => {
    componentProps.user.questionnaire = generateMockCoachQuestionnaire();
    componentProps.user.questionnaire.individualTraining = false;
    const expectedText = 'Не готов тренировать';

    render(preparedComponent);
    
    expect(screen.getByText(expectedText)).toBeInTheDocument();    
  });
  
  it('should render correct with two sertificates', async () => {
    componentProps.user.sertificates = ['sertificate1', 'sertificate2'];    
    const expectedText = 'Посмотреть сертификаты';

    render(preparedComponent);
    
    expect(screen.getByText(expectedText)).toBeInTheDocument();    
  });

  it('should render correct with empty sertificates', async () => {
    componentProps.user.sertificates = [];    
    const expectedText = 'Посмотреть сертификаты';

    render(preparedComponent);
    
    await waitFor(() => {
      expect(screen.queryByText(expectedText)).toBeNull()
    })   
  });

  it('should render correct with isFriend prop true', async () => {
    componentProps.isFriend = true;   
    const expectedText = 'Удалить из друзей';
    const notExpectedText = 'Добавить в друзья';

    render(preparedComponent);
    
    expect(screen.getByText(expectedText)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText(notExpectedText)).toBeNull()
    })    
  });

  it('should render correct with isFriend prop false', async () => {
    componentProps.isFriend = false;   
    const notExpectedText = 'Удалить из друзей';
    const expectedText = 'Добавить в друзья';
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    expect(screen.getByText(expectedText)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText(notExpectedText)).toBeNull()
    })    
  });

  it('should render correct with isFriend prop false and individualTrainings true', async () => {
    componentProps.isFriend = false;
    componentProps.user.questionnaire = generateMockCoachQuestionnaire();
    componentProps.user.questionnaire.individualTraining = true;   
    const notExpectedText = 'Хочу персональную тренировку';
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    await waitFor(() => {
      expect(screen.queryByText(notExpectedText)).toBeNull()
    })    
  });

  it('should render correct with isFriend prop true and individualTrainings true', async () => {
    componentProps.isFriend = true;
    componentProps.user.questionnaire = generateMockCoachQuestionnaire();
    componentProps.user.questionnaire.individualTraining = true;   
    const expectedText = 'Хочу персональную тренировку';
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    expect(screen.getByText(expectedText)).toBeInTheDocument()   
  });

  it('should render correct with isFriend prop true and individualTrainings false', async () => {
    componentProps.isFriend = true;
    componentProps.user.questionnaire = generateMockCoachQuestionnaire();
    componentProps.user.questionnaire.individualTraining = false;   
    const notExpectedText = 'Хочу персональную тренировку';
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    await waitFor(() => {
      expect(screen.queryByText(notExpectedText)).toBeNull()
    })  
  });

  it('should render correct with hasSubscription true', async () => {
    const individualTrainingsTestId = 'personalTrainingCheckbox';
    componentProps.hasSubscription = true;
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    expect(screen.getByTestId(individualTrainingsTestId)).toBeChecked()
  });

  it('should render correct with hasSubscription false', async () => {
    const individualTrainingsTestId = 'personalTrainingCheckbox';
    componentProps.hasSubscription = false;
    const { withStoreComponent } = withStore(<CoachInfoCard {...componentProps}  />, {USER: {...initialState}});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    
    expect(screen.getByTestId(individualTrainingsTestId)).not.toBeChecked()
  });
});