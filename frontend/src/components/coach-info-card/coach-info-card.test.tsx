import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mock-data/mock-component';
import { AuthorizationStatus, Gender, Role, Setting } from '../../consts';
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

});